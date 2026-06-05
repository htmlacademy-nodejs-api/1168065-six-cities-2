import { Command } from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import {
  createOffer,
  getErrorMessage,
  getMongoURI,
  ParsedOffer,
} from '../../shared/helpers/index.js';
import chalk from 'chalk';
import {
  DefaultUserService,
  UserModel,
  UserService,
} from '../../shared/modules/user/index.js';
import {
  CreateOfferDTO,
  DefaultOfferService,
  OfferModel,
  OfferService,
} from '../../shared/modules/offer/index.js';
import {
  DatabaseClient,
  MongoDatabaseClient,
} from '../../shared/libs/database-client/index.js';
import { ConsoleLogger, Logger } from '../../shared/libs/logger/index.js';
import { CommentModel } from '../../shared/modules/comment/index.js';
import { FavoriteModel } from '../../shared/modules/favorite/index.js';
import {
  Config,
  RestConfig,
  RestSchema,
} from '../../shared/libs/config/index.js';
import { plainToInstance } from 'class-transformer';
import { validateOrReject, ValidationError } from 'class-validator';

export class ImportCommand implements Command {
  private userService: UserService;
  private offerService: OfferService;
  private databaseClient: DatabaseClient;
  private logger: Logger;
  private salt!: string;
  private config!: Config<RestSchema>;

  constructor() {
    this.onImportedLine = this.onImportedLine.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new ConsoleLogger();
    this.offerService = new DefaultOfferService(
      this.logger,
      OfferModel,
      CommentModel,
      FavoriteModel,
    );
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  public getName(): string {
    return '--import';
  }

  private async saveOffer(offer: ParsedOffer) {
    const user = await this.userService.findOrCreate(
      { ...offer.host, password: this.config.get('DEFAULT_USER_PASSWORD') },
      this.salt,
    );

    const dto = plainToInstance(CreateOfferDTO, {
      userId: user.id,
      title: offer.title,
      description: offer.description,
      publishDate: offer.publishDate,
      city: offer.city,
      location: offer.location,
      previewImage: offer.previewImage,
      images: offer.images,
      isPremium: offer.isPremium,
      type: offer.type,
      rooms: offer.rooms,
      guests: offer.guests,
      price: offer.price,
      facilities: offer.facilities,
    });

    await validateOrReject(dto);

    await this.offerService.create(dto);
  }

  private async onImportedLine(
    line: string,
    resolve: (value: boolean) => void,
  ) {
    try {
      const offer = createOffer(line);

      await this.saveOffer(offer);

      resolve(true);
    } catch (error) {
      if (Array.isArray(error)) {
        console.error(chalk.redBright('Validation failed'));

        error.forEach((item: ValidationError) => {
          Object.values(item.constraints ?? {}).forEach((message) => {
            console.error(message);
          });
        });
      }

      resolve(false);
    }
  }

  private onCompleteImport(count: number) {
    console.info(chalk.bgBlueBright(`${count} rows imported`));
    this.databaseClient.disconnect();
  }

  public async execute(filename: string): Promise<void> {
    this.logger.info('Starting import...');
    this.config = new RestConfig(this.logger);

    const uri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );
    this.salt = this.config.get('SALT');

    await this.databaseClient.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (error) {
      console.error(
        chalk.redBright(`Failed to import data from file: ${filename}`),
      );
      console.error(getErrorMessage(error));
    }
  }
}
