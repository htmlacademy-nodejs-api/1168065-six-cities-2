import { City, Offer, parseFacility, parseHousing } from '../types/index.js';
import { booleanFromString } from './types-helpers.js';

export function createOffer(offerData: string): Offer {
  const [
    title,
    description,
    publishDate,
    city,
    previewImage,
    images,
    isPremium,
    isFavorite,
    rating,
    type,
    rooms,
    guests,
    price,
    facilities,
    name,
    email,
    location,
  ] = offerData.replace('\n', '').split('\t');

  return {
    title,
    description,
    publishDate: new Date(publishDate),
    city: City[city as keyof typeof City],
    previewImage,
    images: images.split(';'),
    isPremium: booleanFromString(isPremium),
    isFavorite: booleanFromString(isFavorite),
    rating: parseFloat(rating),
    type: parseHousing(type),
    rooms: parseInt(rooms, 10),
    guests: parseInt(guests, 10),
    price: parseInt(price, 10),
    facilities: facilities
      .split(';')
      .map((facility) => parseFacility(facility)),
    host: {
      name,
      email,
    },
    location: (() => {
      const [latitude, longitude] = location.split(';');
      return {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      };
    })(),
  };
}
