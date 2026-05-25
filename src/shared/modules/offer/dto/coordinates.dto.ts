/* eslint-disable indent */
import { IsNumber, Max, Min } from 'class-validator';
import { CreateOfferValidationMessage } from './create-offer.messages.js';
import { OfferValidation } from '../offer.constant.js';

export class CoordinatesDto {
  @IsNumber(
    {},
    { message: CreateOfferValidationMessage.latitude.invalidFormat },
  )
  @Min(OfferValidation.Location.Latitude.Min, {
    message: CreateOfferValidationMessage.latitude.minValue,
  })
  @Max(OfferValidation.Location.Latitude.Max, {
    message: CreateOfferValidationMessage.latitude.maxValue,
  })
  latitude: number;

  @IsNumber(
    {},
    { message: CreateOfferValidationMessage.longitude.invalidFormat },
  )
  @Min(OfferValidation.Location.Longitude.Min, {
    message: CreateOfferValidationMessage.longitude.minValue,
  })
  @Max(OfferValidation.Location.Longitude.Max, {
    message: CreateOfferValidationMessage.longitude.maxValue,
  })
  longitude: number;
}
