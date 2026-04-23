/* eslint-disable indent */
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsMongoId,
  IsNumber,
  IsUrl,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import {
  City,
  Facility,
  FacilityValues,
  Housing,
  HousingValues,
} from '../../../types/index.js';
import { CreateOfferValidationMessage } from './create-offer.messages.js';
import { Type } from 'class-transformer';
import { CoordinatesDto } from './coordinates.dto.js';

export class CreateOfferDTO {
  @MinLength(10, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: CreateOfferValidationMessage.title.maxLength })
  title: string;

  @MinLength(20, {
    message: CreateOfferValidationMessage.description.minLength,
  })
  @MaxLength(1024, {
    message: CreateOfferValidationMessage.description.maxLength,
  })
  description: string;

  @IsDateString(
    {},
    { message: CreateOfferValidationMessage.publishDate.invalidFormat },
  )
  publishDate: Date;

  @IsEnum(City, { message: CreateOfferValidationMessage.city.invalid })
  city: City;

  @IsUrl(
    {},
    { message: CreateOfferValidationMessage.previewImage.invalidFormat },
  )
  previewImage: string;

  @IsArray({ message: CreateOfferValidationMessage.images.invalidFormat })
  @ArrayMinSize(6, {
    message: CreateOfferValidationMessage.images.invalidLength,
  })
  @ArrayMaxSize(6, {
    message: CreateOfferValidationMessage.images.invalidLength,
  })
  images: string[];

  @IsBoolean({ message: CreateOfferValidationMessage.isPremium.invalidFormat })
  isPremium: boolean;

  @IsBoolean({ message: CreateOfferValidationMessage.isFavorite.invalidFormat })
  isFavorite: boolean;

  @IsNumber(
    { maxDecimalPlaces: 1 },
    { message: CreateOfferValidationMessage.rating.invalidFormat },
  )
  @Min(0, { message: CreateOfferValidationMessage.rating.minValue })
  @Max(5, { message: CreateOfferValidationMessage.rating.maxValue })
  rating: number;

  @IsEnum(HousingValues, { message: CreateOfferValidationMessage.type.invalid })
  type: Housing;

  @IsInt({ message: CreateOfferValidationMessage.rooms.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.rooms.minValue })
  @Max(8, { message: CreateOfferValidationMessage.rooms.maxValue })
  rooms: number;

  @IsInt({ message: CreateOfferValidationMessage.guests.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.guests.minValue })
  @Max(10, { message: CreateOfferValidationMessage.guests.maxValue })
  guests: number;

  @IsInt({ message: CreateOfferValidationMessage.price.invalidFormat })
  @Min(100, { message: CreateOfferValidationMessage.price.minValue })
  @Max(100000, { message: CreateOfferValidationMessage.price.maxValue })
  price: number;

  @IsArray({ message: CreateOfferValidationMessage.facilities.invalidFormat })
  @ArrayMinSize(1, {
    message: CreateOfferValidationMessage.facilities.invalidLength,
  })
  @IsEnum(FacilityValues, {
    each: true,
    message: CreateOfferValidationMessage.facilities.invalidValue,
  })
  facilities: Facility[];

  @IsMongoId({ message: CreateOfferValidationMessage.userId.invalidId })
  userId: string;

  @ValidateNested({ message: CreateOfferValidationMessage.location.invalid })
  @Type(() => CoordinatesDto)
  location: CoordinatesDto;
}
