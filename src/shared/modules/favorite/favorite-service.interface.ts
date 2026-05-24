import { OfferWithFavorite } from '../offer/index.js';

export interface FavoriteService {
  add(userId: string, offerId: string): Promise<void>;
  remove(userId: string, offerId: string): Promise<void>;
  removeByOfferId(offerId: string): Promise<void>;
  getStatus(userId: string, offerId: string): Promise<boolean>;
  getOfferIdsByUser(userId: string): Promise<string[]>;
  getOffers(userId: string): Promise<OfferWithFavorite[]>;
  exists(documentId: string): Promise<boolean>;
}
