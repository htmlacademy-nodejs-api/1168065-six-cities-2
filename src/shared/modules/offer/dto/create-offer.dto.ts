import { City, Coordinates, Facility, Housing } from '../../../types/index.js';

export class CreateOfferDTO {
  title: string;
  description: string;
  publishDate: Date;
  city: City;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: Housing;
  rooms: number;
  guests: number;
  price: number;
  facilities: Facility[];
  userId: string;
  location: Coordinates;
}
