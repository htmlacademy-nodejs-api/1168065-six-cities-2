import { CreateOfferDTO } from './dto/create-offer.dto.js';
import { DocumentType } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import { UpdateOfferDTO } from './dto/update-offer.dto.js';
import { City } from '../../types/index.js';

export interface OfferService {
  create(dto: CreateOfferDTO): Promise<DocumentType<OfferEntity>>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  find(count: number): Promise<DocumentType<OfferEntity>[]>;
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  updateById(
    offerId: string,
    dto: UpdateOfferDTO,
  ): Promise<DocumentType<OfferEntity> | null>;
  incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  findPremiumByCity(
    city: City,
    count: number,
  ): Promise<DocumentType<OfferEntity>[]>;
  findByFavorite(): Promise<DocumentType<OfferEntity>[]>;
  calcRating(offerId: string): Promise<void>;
  exists(documentId: string): Promise<boolean>;
}
