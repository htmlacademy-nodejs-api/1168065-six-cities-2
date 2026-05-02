import { OfferWithFavorite } from '../offer/index.js';

export interface FavoriteService {
  add(userId: string, offerId: string): Promise<void>;
  remove(userId: string, offerId: string): Promise<void>;
  removeByOfferId(offerId: string): Promise<void>;
  getFavoriteStatus(userId: string, offerId: string): Promise<boolean>;
  getOfferIdsByUser(userId: string): Promise<string[]>;
  getFavoriteOffers(userId: string): Promise<OfferWithFavorite[]>;
  exists(documentId: string): Promise<boolean>;
}
