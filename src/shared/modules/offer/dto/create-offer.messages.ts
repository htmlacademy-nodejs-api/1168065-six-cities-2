export const CreateOfferValidationMessage = {
  title: {
    minLength: 'Minimum title length must be 10',
    maxLength: 'Maximum title length must be 100',
  },
  description: {
    minLength: 'Minimum description length must be 20',
    maxLength: 'Maximum description length must be 1024',
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
    invalidLength: 'Exactly 6 images are required',
  },
  isPremium: {
    invalidFormat: 'isPremium must be a boolean',
  },
  isFavorite: {
    invalidFormat: 'isFavorite must be a boolean',
  },
  rating: {
    invalidFormat: 'rating must be a number with max 1 decimal place',
    minValue: 'Minimum rating is 0',
    maxValue: 'Maximum rating is 5',
  },
  type: {
    invalid: 'type must be one of Housing',
  },
  rooms: {
    invalidFormat: 'Rooms must be an integer',
    minValue: 'Minimum rooms is 1',
    maxValue: 'Maximum rooms is 8',
  },
  guests: {
    invalidFormat: 'Guests must be an integer',
    minValue: 'Minimum guests is 1',
    maxValue: 'Maximum guests is 10',
  },
  price: {
    invalidFormat: 'Price must be an integer',
    minValue: 'Minimum price is 100',
    maxValue: 'Maximum price is 100000',
  },
  facilities: {
    invalidLength: 'At least 1 item required',
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
    minValue: 'Minimum latitude is -90',
    maxValue: 'Maximum latitude is 90',
  },
  longitude: {
    invalidFormat: 'longitude must be a number',
    minValue: 'Minimum longitude is -180',
    maxValue: 'Maximum longitude is 180',
  },
} as const;
