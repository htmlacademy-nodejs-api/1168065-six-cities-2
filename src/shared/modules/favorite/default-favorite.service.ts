import { inject, injectable } from 'inversify';
import { FavoriteService } from './favorite-service.interface.js';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { types } from '@typegoose/typegoose';
import { OfferEntity } from '../offer/index.js';
import { FavoriteEntity } from './favorite.entity.js';

@injectable()
export class DefaultFavoriteService implements FavoriteService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.FavoriteModel)
    private readonly favoriteModel: types.ModelType<FavoriteEntity>,
    @inject(Component.OfferModel)
    private readonly offerModel: types.ModelType<OfferEntity>,
  ) {}

  public async add(userId: string, offerId: string): Promise<void> {
    const exists = await this.favoriteModel.findOne({ userId, offerId }).exec();

    if (!exists) {
      await this.favoriteModel.create({ userId, offerId });
      this.logger.info(
        `Offer ${offerId} added to favorites for user ${userId}`,
      );
    }
  }

  public async remove(userId: string, offerId: string): Promise<void> {
    await this.favoriteModel.findOneAndDelete({ userId, offerId }).exec();
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
    const isFavorite = await this.favoriteModel
      .findOne({ userId, offerId })
      .exec();
    return !!isFavorite;
  }

  public async findByUserId(
    userId: string,
  ): Promise<types.DocumentType<OfferEntity>[]> {
    const favorites = await this.favoriteModel.find({ userId }).exec();
    const offerIds = favorites.map((item) => item.offerId);

    return this.offerModel
      .find({ _id: { $in: offerIds } })
      .populate('userId')
      .exec();
  }
}
