import { OFFER_IMAGES_LENGTH, OfferValidation } from '../offer.constant.js';

export const CreateOfferValidationMessage = {
  title: {
    minLength: `Minimum title length must be ${OfferValidation.Title.MinLength}`,
    maxLength: `Maximum title length must be ${OfferValidation.Title.MinLength}`,
  },
  description: {
    minLength: `Minimum description length must be ${OfferValidation.Description.MinLength}`,
    maxLength: `Maximum description length must be ${OfferValidation.Description.MinLength}`,
  },
  publishDate: {
    invalidFormat: 'publishDate must be a valid ISO date',
  },
  city: {
    invalid: 'city must be one of City',
  },
  previewImage: {
    invalidFormat: 'previewImage must be a valid URL',
  },
  images: {
    invalidFormat: 'images must be an array of strings',
    invalidLength: `Exactly ${OFFER_IMAGES_LENGTH} images are required`,
  },
  isPremium: {
    invalidFormat: 'isPremium must be a boolean',
  },
  type: {
    invalid: 'type must be one of Housing',
  },
  rooms: {
    invalidFormat: 'Rooms must be an integer',
    minValue: `Minimum rooms is ${OfferValidation.Rooms.Min}`,
    maxValue: `Maximum rooms is ${OfferValidation.Rooms.Max}`,
  },
  guests: {
    invalidFormat: 'Guests must be an integer',
    minValue: `Minimum guests is ${OfferValidation.Guests.Min}`,
    maxValue: `Maximum guests is ${OfferValidation.Guests.Min}`,
  },
  price: {
    invalidFormat: 'Price must be an integer',
    minValue: `Minimum price is ${OfferValidation.Price.Min}`,
    maxValue: `Maximum price is ${OfferValidation.Guests.Max}`,
  },
  facilities: {
    invalidLength: `At least ${OfferValidation.Facilities.MinLength} item required`,
    invalidFormat: 'facilities must be an array',
    invalidValue: 'facilities must contain valid Facility values',
  },
  userId: {
    invalidId: 'userId field must be a valid id',
  },
  location: {
    invalid: 'location must be an object with latitude and longitude',
  },
  latitude: {
    invalidFormat: 'latitude must be a number',
    minValue: `Minimum latitude is ${OfferValidation.Location.Latitude.Min}`,
    maxValue: `Maximum latitude is ${OfferValidation.Location.Latitude.Max}`,
  },
  longitude: {
    invalidFormat: 'longitude must be a number',
    minValue: `Minimum longitude is ${OfferValidation.Location.Longitude.Min}`,
    maxValue: `Maximum longitude is ${OfferValidation.Location.Longitude.Max}`,
  },
} as const;
