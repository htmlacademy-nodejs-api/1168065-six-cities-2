import { City, Coordinates, Facility, Housing } from '../../../types/index.js';

export class UpdateOfferDTO {
  title: string;
  description: string;
  city: City;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  type: Housing;
  rooms: number;
  guests: number;
  price: number;
  facilities: Facility[];
  location: Coordinates;
}
