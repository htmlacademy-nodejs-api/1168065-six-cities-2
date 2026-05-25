/* eslint-disable indent */
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsIn,
  IsInt,
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
import { OFFER_IMAGES_LENGTH, OfferValidation } from '../offer.constant.js';

export class CreateOfferDTO {
  @MinLength(OfferValidation.Title.MinLength, {
    message: CreateOfferValidationMessage.title.minLength,
  })
  @MaxLength(OfferValidation.Title.MaxLength, {
    message: CreateOfferValidationMessage.title.maxLength,
  })
  title: string;

  @MinLength(OfferValidation.Description.MinLength, {
    message: CreateOfferValidationMessage.description.minLength,
  })
  @MaxLength(OfferValidation.Description.MaxLength, {
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
  public previewImage?: string;

  @IsArray({ message: CreateOfferValidationMessage.images.invalidFormat })
  @ArrayMinSize(OFFER_IMAGES_LENGTH, {
    message: CreateOfferValidationMessage.images.invalidLength,
  })
  @ArrayMaxSize(OFFER_IMAGES_LENGTH, {
    message: CreateOfferValidationMessage.images.invalidLength,
  })
  public images?: string[];

  @IsBoolean({ message: CreateOfferValidationMessage.isPremium.invalidFormat })
  isPremium: boolean;

  @IsIn(HousingValues, { message: CreateOfferValidationMessage.type.invalid })
  type: Housing;

  @IsInt({ message: CreateOfferValidationMessage.rooms.invalidFormat })
  @Min(OfferValidation.Rooms.Min, {
    message: CreateOfferValidationMessage.rooms.minValue,
  })
  @Max(OfferValidation.Rooms.Max, {
    message: CreateOfferValidationMessage.rooms.maxValue,
  })
  rooms: number;

  @IsInt({ message: CreateOfferValidationMessage.guests.invalidFormat })
  @Min(OfferValidation.Guests.Min, {
    message: CreateOfferValidationMessage.guests.minValue,
  })
  @Max(OfferValidation.Guests.Max, {
    message: CreateOfferValidationMessage.guests.maxValue,
  })
  guests: number;

  @IsInt({ message: CreateOfferValidationMessage.price.invalidFormat })
  @Min(OfferValidation.Price.Min, {
    message: CreateOfferValidationMessage.price.minValue,
  })
  @Max(OfferValidation.Price.Max, {
    message: CreateOfferValidationMessage.price.maxValue,
  })
  price: number;

  @IsArray({ message: CreateOfferValidationMessage.facilities.invalidFormat })
  @ArrayMinSize(OfferValidation.Facilities.MinLength, {
    message: CreateOfferValidationMessage.facilities.invalidLength,
  })
  @IsIn(FacilityValues, {
    each: true,
    message: CreateOfferValidationMessage.facilities.invalidValue,
  })
  facilities: Facility[];

  userId: string;

  @ValidateNested({ message: CreateOfferValidationMessage.location.invalid })
  @Type(() => CoordinatesDto)
  location: CoordinatesDto;
}
