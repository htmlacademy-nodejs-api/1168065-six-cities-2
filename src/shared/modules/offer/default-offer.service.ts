import { inject, injectable } from 'inversify';
import { OfferService } from './offer-service.interface.js';
import { City, Component, SortType } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { types } from '@typegoose/typegoose';
import { OfferEntity, OfferWithFavorite } from './offer.entity.js';
import { CreateOfferDTO } from './dto/create-offer.dto.js';
import { UpdateOfferDTO } from './dto/update-offer.dto.js';
import {
  DEFAULT_OFFER_COUNT,
  DEFAULT_PREMIUM_OFFER_COUNT,
} from './offer.constants.js';
import { CommentEntity } from '../comment/index.js';
import { Types } from 'mongoose';
import { FavoriteEntity } from '../favorite/index.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel)
    private readonly offerModel: types.ModelType<OfferEntity>,
    @inject(Component.CommentModel)
    private readonly commentModel: types.ModelType<CommentEntity>,
    @inject(Component.FavoriteModel)
    private readonly favoriteModel: types.ModelType<FavoriteEntity>,
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
    userId?: string,
  ): Promise<OfferWithFavorite | null> {
    const offer = await this.offerModel
      .findById(offerId)
      .populate(['userId'])
      .lean()
      .exec();

    if (!offer) {
      return null;
    }

    if (!userId) {
      return { ...offer, isFavorite: false };
    }

    const isFavorite = await this.favoriteModel.exists({
      userId,
      offerId,
    });

    return {
      ...offer,
      isFavorite: isFavorite !== null,
    };
  }

  public async find(
    count?: number,
    userId?: string,
  ): Promise<OfferWithFavorite[]> {
    const offers = await this.offerModel
      .find()
      .limit(count ?? DEFAULT_OFFER_COUNT)
      .populate(['userId'])
      .lean();

    if (!userId) {
      return offers.map((offer) => ({ ...offer, isFavorite: false }));
    }

    const favoriteIds = await this.favoriteModel.distinct('offerId', {
      userId,
    });

    const set = new Set(favoriteIds.map(String));

    return offers.map((offer) => ({
      ...offer,
      isFavorite: set.has(offer._id.toString()),
    }));
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

  public async calcRating(offerId: string): Promise<void> {
    const ratings = await this.commentModel.aggregate([
      { $match: { offerId: new Types.ObjectId(offerId) } },
      { $group: { _id: '$offerId', avgRating: { $avg: '$rating' } } },
      {
        $project: {
          _id: 0,
          avgRating: { $round: ['$avgRating', 1] },
        },
      },
    ]);

    const rating = ratings?.length ? ratings[0]?.avgRating : 0;

    await this.offerModel
      .findByIdAndUpdate(
        offerId,
        {
          rating,
        },
        { returnDocument: 'after' },
      )
      .exec();
  }

  public async findPremiumByCity(
    city: City,
    userId?: string,
    count?: number,
  ): Promise<OfferWithFavorite[]> {
    if (!city) {
      return [];
    }

    const premiumOffers = await this.offerModel
      .find({ city, isPremium: true })
      .sort({ createdAt: SortType.Down })
      .limit(count ?? DEFAULT_PREMIUM_OFFER_COUNT)
      .populate(['userId'])
      .lean()
      .exec();

    if (!userId) {
      return premiumOffers.map((offer) => ({ ...offer, isFavorite: false }));
    }

    const favoriteIds = await this.favoriteModel.distinct('offerId', {
      userId,
    });

    const set = new Set(favoriteIds.map(String));

    return premiumOffers.map((offer) => ({
      ...offer,
      isFavorite: set.has(offer._id.toString()),
    }));
  }
}
