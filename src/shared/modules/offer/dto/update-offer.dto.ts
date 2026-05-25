/* eslint-disable indent */
import { Type } from 'class-transformer';
import {
  MinLength,
  MaxLength,
  IsDateString,
  IsEnum,
  IsUrl,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
  IsBoolean,
  Min,
  Max,
  IsIn,
  IsInt,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import {
  City,
  Facility,
  FacilityValues,
  Housing,
  HousingValues,
} from '../../../types/index.js';
import { CoordinatesDto } from './coordinates.dto.js';
import { CreateUpdateOfferMessage } from './update-offer.messages.js';
import { OFFER_IMAGES_LENGTH, OfferValidation } from '../offer.constant.js';

export class UpdateOfferDTO {
  @IsOptional()
  @MinLength(OfferValidation.Title.MinLength, {
    message: CreateUpdateOfferMessage.title.minLength,
  })
  @MaxLength(OfferValidation.Title.MaxLength, {
    message: CreateUpdateOfferMessage.title.maxLength,
  })
  public title?: string;

  @IsOptional()
  @MinLength(OfferValidation.Description.MinLength, {
    message: CreateUpdateOfferMessage.description.minLength,
  })
  @MaxLength(OfferValidation.Description.MaxLength, {
    message: CreateUpdateOfferMessage.description.maxLength,
  })
  public description?: string;

  @IsOptional()
  @IsDateString(
    {},
    { message: CreateUpdateOfferMessage.publishDate.invalidFormat },
  )
  public publishDate?: Date;

  @IsOptional()
  @IsEnum(City, { message: CreateUpdateOfferMessage.city.invalid })
  public city?: City;

  @IsOptional()
  @IsUrl({}, { message: CreateUpdateOfferMessage.previewImage.invalidFormat })
  public previewImage?: string;

  @IsOptional()
  @IsArray({ message: CreateUpdateOfferMessage.images.invalidFormat })
  @ArrayMinSize(OFFER_IMAGES_LENGTH, {
    message: CreateUpdateOfferMessage.images.invalidLength,
  })
  @ArrayMaxSize(OFFER_IMAGES_LENGTH, {
    message: CreateUpdateOfferMessage.images.invalidLength,
  })
  public images?: string[];

  @IsOptional()
  @IsBoolean({ message: CreateUpdateOfferMessage.isPremium.invalidFormat })
  public isPremium?: boolean;

  @IsOptional()
  @IsIn(HousingValues, { message: CreateUpdateOfferMessage.type.invalid })
  public type?: Housing;

  @IsOptional()
  @IsInt({ message: CreateUpdateOfferMessage.rooms.invalidFormat })
  @Min(OfferValidation.Rooms.Min, {
    message: CreateUpdateOfferMessage.rooms.minValue,
  })
  @Max(OfferValidation.Rooms.Max, {
    message: CreateUpdateOfferMessage.rooms.maxValue,
  })
  public rooms?: number;

  @IsOptional()
  @IsInt({ message: CreateUpdateOfferMessage.guests.invalidFormat })
  @Min(OfferValidation.Guests.Min, {
    message: CreateUpdateOfferMessage.guests.minValue,
  })
  @Max(OfferValidation.Guests.Max, {
    message: CreateUpdateOfferMessage.guests.maxValue,
  })
  public guests?: number;

  @IsOptional()
  @IsInt({ message: CreateUpdateOfferMessage.price.invalidFormat })
  @Min(OfferValidation.Price.Min, {
    message: CreateUpdateOfferMessage.price.minValue,
  })
  @Max(OfferValidation.Price.Max, {
    message: CreateUpdateOfferMessage.price.maxValue,
  })
  public price?: number;

  @IsOptional()
  @IsArray({ message: CreateUpdateOfferMessage.facilities.invalidFormat })
  @ArrayMinSize(OfferValidation.Facilities.MinLength, {
    message: CreateUpdateOfferMessage.facilities.invalidLength,
  })
  @IsIn(FacilityValues, {
    each: true,
    message: CreateUpdateOfferMessage.facilities.invalidValue,
  })
  public facilities?: Facility[];

  @IsOptional()
  @ValidateNested({ message: CreateUpdateOfferMessage.location.invalid })
  @Type(() => CoordinatesDto)
  public location?: CoordinatesDto;
}
