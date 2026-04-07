import { inject, injectable } from 'inversify';
import { OfferService } from './offer-service.interface.js';
import { City, Component, SortType } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { types } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import { CreateOfferDTO } from './dto/create-offer.dto.js';
import { UpdateOfferDTO } from './dto/update-offer.dto.js';
import {
  DEFAULT_OFFER_COUNT,
  DEFAULT_PREMIUM_OFFER_COUNT,
} from './offer.constants.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel)
    private readonly offerModel: types.ModelType<OfferEntity>,
  ) {}

  public async create(
    dto: CreateOfferDTO,
  ): Promise<types.DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async findById(
    offerId: string,
  ): Promise<types.DocumentType<OfferEntity> | null> {
    return this.offerModel.findById(offerId).populate(['userId']).exec();
  }

  public async find(count: number): Promise<types.DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find()
      .sort({ createdAt: SortType.Down })
      .limit(count ?? DEFAULT_OFFER_COUNT)
      .populate(['userId'])
      .exec();
  }

  public async deleteById(
    offerId: string,
  ): Promise<types.DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndDelete(offerId).exec();
  }

  public async updateById(
    offerId: string,
    dto: UpdateOfferDTO,
  ): Promise<types.DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, { new: true })
      .exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel.exists({ _id: documentId })) !== null;
  }

  public async incCommentCount(
    offerId: string,
  ): Promise<types.DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {
        $inc: {
          commentCount: 1,
        },
      })
      .exec();
  }

  public async recalcRating(
    offerId: string,
  ): Promise<types.DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndUpdate(offerId);
  }

  public async findPremiumByCity(
    city: City,
    count: number,
  ): Promise<types.DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find({ city, isPremium: true })
      .sort({ createdAt: SortType.Down })
      .limit(count ?? DEFAULT_PREMIUM_OFFER_COUNT)
      .populate(['userId'])
      .exec();
  }

  public async findByFavorite(): Promise<types.DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find({ isFavorite: true })
      .populate(['userId'])
      .exec();
  }
}
