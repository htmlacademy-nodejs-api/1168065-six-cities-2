import { inject, injectable } from 'inversify';
import { FavoriteService } from './favorite-service.interface.js';
import { Component } from '../../types/index.js';
import { types } from '@typegoose/typegoose';
import { FavoriteEntity } from './favorite.entity.js';
import {
  OfferPreview,
  OFFER_PREVIEW_FIELDS,
  OfferPreviewBase,
} from '../offer/index.js';

@injectable()
export class DefaultFavoriteService implements FavoriteService {
  constructor(
    @inject(Component.FavoriteModel)
    private readonly favoriteModel: types.ModelType<FavoriteEntity>,
  ) {}

  public async add(userId: string, offerId: string): Promise<void> {
    await this.favoriteModel.updateOne(
      { userId, offerId },
      { $setOnInsert: { userId, offerId } },
      { upsert: true },
    );
  }

  public async delete(userId: string, offerId: string): Promise<void> {
    await this.favoriteModel.deleteOne({ userId, offerId }).exec();
  }

  public async deleteByOfferId(offerId: string): Promise<void> {
    await this.favoriteModel.deleteMany({ offerId }).exec();
  }

  public async getOffers(userId: string): Promise<OfferPreview[]> {
    const favorites = await this.favoriteModel
      .find({ userId })
      .populate({
        path: 'offerId',
        select: OFFER_PREVIEW_FIELDS,
      })
      .lean()
      .exec();

    return favorites.map((favorite) => ({
      ...(favorite.offerId as OfferPreviewBase),
      isFavorite: true,
    }));
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.favoriteModel.exists({ _id: documentId })) !== null;
  }
}
