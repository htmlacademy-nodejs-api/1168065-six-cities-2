import { OfferPreview } from '../offer/index.js';

export interface FavoriteService {
  add(userId: string, offerId: string): Promise<void>;
  delete(userId: string, offerId: string): Promise<void>;
  deleteByOfferId(offerId: string): Promise<void>;
  getOffers(userId: string): Promise<OfferPreview[]>;
  exists(documentId: string): Promise<boolean>;
}
