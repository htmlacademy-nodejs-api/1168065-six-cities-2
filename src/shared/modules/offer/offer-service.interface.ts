import { CreateOfferDTO } from './dto/create-offer.dto.js';
import { DocumentType } from '@typegoose/typegoose';
import {
  OfferEntity,
  OfferPreview,
  OfferWithFavorite,
} from './offer.entity.js';
import { UpdateOfferDTO } from './dto/update-offer.dto.js';
import { City, DocumentExists } from '../../types/index.js';

export interface OfferService extends DocumentExists {
  create(dto: CreateOfferDTO): Promise<DocumentType<OfferEntity>>;
  findById(offerId: string, userId?: string): Promise<OfferWithFavorite | null>;
  find(count?: number, userId?: string): Promise<OfferPreview[]>;
  deleteById(
    offerId: string,
    userId: string,
  ): Promise<DocumentType<OfferEntity> | null>;
  updateById(
    offerId: string,
    userId: string,
    dto: UpdateOfferDTO,
  ): Promise<DocumentType<OfferEntity> | null>;
  findPremiumByCity(
    city: City,
    userId?: string,
    count?: number,
  ): Promise<OfferPreview[]>;
  exists(documentId: string): Promise<boolean>;
  updateAfterCommentCreated(offerId: string): Promise<void>;
}
