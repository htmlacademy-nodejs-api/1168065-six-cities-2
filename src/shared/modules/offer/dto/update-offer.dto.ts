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

export class UpdateOfferDTO {
  @IsOptional()
  @MinLength(10, { message: CreateUpdateOfferMessage.title.minLength })
  @MaxLength(100, { message: CreateUpdateOfferMessage.title.maxLength })
  public title?: string;

  @IsOptional()
  @MinLength(20, {
    message: CreateUpdateOfferMessage.description.minLength,
  })
  @MaxLength(1024, {
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
  @ArrayMinSize(6, {
    message: CreateUpdateOfferMessage.images.invalidLength,
  })
  @ArrayMaxSize(6, {
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
  @Min(1, { message: CreateUpdateOfferMessage.rooms.minValue })
  @Max(8, { message: CreateUpdateOfferMessage.rooms.maxValue })
  public rooms?: number;

  @IsOptional()
  @IsInt({ message: CreateUpdateOfferMessage.guests.invalidFormat })
  @Min(1, { message: CreateUpdateOfferMessage.guests.minValue })
  @Max(10, { message: CreateUpdateOfferMessage.guests.maxValue })
  public guests?: number;

  @IsOptional()
  @IsInt({ message: CreateUpdateOfferMessage.price.invalidFormat })
  @Min(100, { message: CreateUpdateOfferMessage.price.minValue })
  @Max(100000, { message: CreateUpdateOfferMessage.price.maxValue })
  public price?: number;

  @IsOptional()
  @IsArray({ message: CreateUpdateOfferMessage.facilities.invalidFormat })
  @ArrayMinSize(1, {
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
