import { CreateOfferDTO } from './dto/create-offer.dto.js';
import { DocumentType } from '@typegoose/typegoose';
import { OfferEntity, OfferWithFavorite } from './offer.entity.js';
import { UpdateOfferDTO } from './dto/update-offer.dto.js';
import { City, DocumentExists } from '../../types/index.js';

export interface OfferService extends DocumentExists {
  create(dto: CreateOfferDTO): Promise<DocumentType<OfferEntity>>;
  findById(
    offerId: string,
    userId?: string,
  ): Promise<DocumentType<OfferEntity> | null>;
  find(count?: number, userId?: string): Promise<OfferWithFavorite[]>;
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  updateById(
    offerId: string,
    dto: UpdateOfferDTO,
  ): Promise<DocumentType<OfferEntity> | null>;
  incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  findPremiumByCity(
    city: City,
    userId?: string,
    count?: number,
  ): Promise<OfferWithFavorite[]>;
  calcRating(offerId: string): Promise<void>;
  exists(documentId: string): Promise<boolean>;
}
