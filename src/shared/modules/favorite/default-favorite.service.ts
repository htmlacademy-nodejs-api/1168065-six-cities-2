import { inject, injectable } from 'inversify';
import { FavoriteService } from './favorite-service.interface.js';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { types } from '@typegoose/typegoose';
import { FavoriteEntity } from './favorite.entity.js';
import { OfferEntity, OfferWithFavorite } from '../offer/index.js';

@injectable()
export class DefaultFavoriteService implements FavoriteService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.FavoriteModel)
    private readonly favoriteModel: types.ModelType<FavoriteEntity>,
  ) {}

  public async add(userId: string, offerId: string): Promise<void> {
    await this.favoriteModel.updateOne(
      { userId, offerId },
      { $setOnInsert: { userId, offerId } },
      { upsert: true },
    );

    this.logger.info(`Offer ${offerId} added to favorites for user ${userId}`);
  }

  public async remove(userId: string, offerId: string): Promise<void> {
    await this.favoriteModel.deleteOne({ userId, offerId }).exec();
    this.logger.info(
      `Offer ${offerId} removed from favorites for user ${userId}`,
    );
  }

  public async removeByOfferId(offerId: string): Promise<void> {
    await this.favoriteModel.deleteMany({ offerId }).exec();
    this.logger.info(`All favorites removed for offer ${offerId}`);
  }

  public async getFavoriteStatus(
    userId: string,
    offerId: string,
  ): Promise<boolean> {
    const result = await this.favoriteModel.exists({ userId, offerId }).exec();

    return result !== null;
  }

  public async getOfferIdsByUser(userId: string): Promise<string[]> {
    const favorites = await this.favoriteModel
      .find({ userId })
      .select('offerId')
      .lean();

    return favorites.map((item) => item.offerId.toString());
  }

  public async getFavoriteOffers(userId: string): Promise<OfferWithFavorite[]> {
    const favorites = await this.favoriteModel
      .find({ userId })
      .populate({
        path: 'offerId',
        populate: { path: 'userId' },
      })
      .lean();

    return favorites.map((fav) => ({
      ...(fav.offerId as OfferEntity),
      isFavorite: true,
    }));
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.favoriteModel.exists({ _id: documentId })) !== null;
  }
}
