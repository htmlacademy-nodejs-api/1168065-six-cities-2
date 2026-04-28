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
  IsNumber,
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
  title: string;

  @IsOptional()
  @MinLength(20, {
    message: CreateUpdateOfferMessage.description.minLength,
  })
  @MaxLength(1024, {
    message: CreateUpdateOfferMessage.description.maxLength,
  })
  description: string;

  @IsOptional()
  @IsDateString(
    {},
    { message: CreateUpdateOfferMessage.publishDate.invalidFormat },
  )
  publishDate: Date;

  @IsOptional()
  @IsEnum(City, { message: CreateUpdateOfferMessage.city.invalid })
  city: City;

  @IsOptional()
  @IsUrl({}, { message: CreateUpdateOfferMessage.previewImage.invalidFormat })
  previewImage: string;

  @IsOptional()
  @IsArray({ message: CreateUpdateOfferMessage.images.invalidFormat })
  @ArrayMinSize(6, {
    message: CreateUpdateOfferMessage.images.invalidLength,
  })
  @ArrayMaxSize(6, {
    message: CreateUpdateOfferMessage.images.invalidLength,
  })
  images: string[];

  @IsOptional()
  @IsBoolean({ message: CreateUpdateOfferMessage.isPremium.invalidFormat })
  isPremium: boolean;

  @IsOptional()
  @IsBoolean({ message: CreateUpdateOfferMessage.isFavorite.invalidFormat })
  isFavorite: boolean;

  @IsOptional()
  @IsNumber(
    { maxDecimalPlaces: 1 },
    { message: CreateUpdateOfferMessage.rating.invalidFormat },
  )
  @Min(0, { message: CreateUpdateOfferMessage.rating.minValue })
  @Max(5, { message: CreateUpdateOfferMessage.rating.maxValue })
  rating: number;

  @IsOptional()
  @IsIn(HousingValues, { message: CreateUpdateOfferMessage.type.invalid })
  type: Housing;

  @IsOptional()
  @IsInt({ message: CreateUpdateOfferMessage.rooms.invalidFormat })
  @Min(1, { message: CreateUpdateOfferMessage.rooms.minValue })
  @Max(8, { message: CreateUpdateOfferMessage.rooms.maxValue })
  rooms: number;

  @IsOptional()
  @IsInt({ message: CreateUpdateOfferMessage.guests.invalidFormat })
  @Min(1, { message: CreateUpdateOfferMessage.guests.minValue })
  @Max(10, { message: CreateUpdateOfferMessage.guests.maxValue })
  guests: number;

  @IsOptional()
  @IsInt({ message: CreateUpdateOfferMessage.price.invalidFormat })
  @Min(100, { message: CreateUpdateOfferMessage.price.minValue })
  @Max(100000, { message: CreateUpdateOfferMessage.price.maxValue })
  price: number;

  @IsOptional()
  @IsArray({ message: CreateUpdateOfferMessage.facilities.invalidFormat })
  @ArrayMinSize(1, {
    message: CreateUpdateOfferMessage.facilities.invalidLength,
  })
  @IsIn(FacilityValues, {
    each: true,
    message: CreateUpdateOfferMessage.facilities.invalidValue,
  })
  facilities: Facility[];

  @IsOptional()
  @ValidateNested({ message: CreateUpdateOfferMessage.location.invalid })
  @Type(() => CoordinatesDto)
  location: CoordinatesDto;
}
