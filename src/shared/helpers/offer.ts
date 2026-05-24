import {
  City,
  Offer,
  parseFacility,
  parseHousing,
  UserType,
} from '../types/index.js';

export function createOffer(offerData: string): Offer {
  const [
    title,
    description,
    publishDate,
    city,
    previewImage,
    images,
    isPremium,
    type,
    rooms,
    guests,
    price,
    facilities,
    firstname,
    lastname,
    email,
    avatarPath,
    userType,
    location,
  ] = offerData.replace('\n', '').split('\t');

  return {
    title,
    description,
    publishDate: new Date(publishDate),
    city: City[city as keyof typeof City],
    previewImage,
    images: images.split(';'),
    isPremium: isPremium.toLowerCase() === 'true',
    type: parseHousing(type),
    rooms: parseInt(rooms, 10),
    guests: parseInt(guests, 10),
    price: parseInt(price, 10),
    facilities: facilities
      .split(';')
      .map((facility) => parseFacility(facility)),
    host: {
      firstname,
      lastname,
      email,
      avatarPath,
      type: userType as UserType,
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
