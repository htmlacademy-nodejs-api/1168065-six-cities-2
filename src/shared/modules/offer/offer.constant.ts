export const DEFAULT_OFFER_COUNT = 60;
export const DEFAULT_PREMIUM_OFFER_COUNT = 3;
export const OFFER_IMAGES_LENGTH = 6;

export const OfferValidation = {
  Title: {
    MinLength: 10,
    MaxLength: 100,
  },
  Description: {
    MinLength: 20,
    MaxLength: 1024,
  },
  Rooms: {
    Min: 1,
    Max: 8,
  },
  Guests: {
    Min: 1,
    Max: 10,
  },
  Price: {
    Min: 100,
    Max: 100000,
  },
  Facilities: {
    MinLength: 1,
  },
  Location: {
    Latitude: {
      Min: -90,
      Max: 90,
    },
    Longitude: {
      Min: -180,
      Max: 180,
    },
  },
} as const;
