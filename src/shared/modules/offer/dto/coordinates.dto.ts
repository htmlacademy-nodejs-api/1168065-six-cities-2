/* eslint-disable indent */
import { IsNumber, Max, Min } from 'class-validator';
import { CreateOfferValidationMessage } from './create-offer.messages.js';

export class CoordinatesDto {
  @IsNumber(
    {},
    { message: CreateOfferValidationMessage.latitude.invalidFormat },
  )
  @Min(-90, { message: CreateOfferValidationMessage.latitude.minValue })
  @Max(90, { message: CreateOfferValidationMessage.latitude.maxValue })
  latitude: number;

  @IsNumber(
    {},
    { message: CreateOfferValidationMessage.longitude.invalidFormat },
  )
  @Min(-180, { message: CreateOfferValidationMessage.longitude.minValue })
  @Max(180, { message: CreateOfferValidationMessage.longitude.maxValue })
  longitude: number;
}
