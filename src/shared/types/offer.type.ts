import { City } from './city.enum.js';
import { Coordinates } from './coordinates.type.js';
import { Facility } from './facility.type.js';
import { Housing } from './housing.type.js';
import { User } from './user.type.js';

export type Offer = {
  title: string; // 10–100
  description: string; // 20–1024
  publishDate: Date;
  city: City;
  previewImage: string;
  images: string[]; // всегда 6
  isPremium: boolean;
  isFavorite: boolean;
  rating: number; // 0–5 (1 знак после запятой)
  type: Housing;
  rooms: number; // 1–8
  guests: number; // 1–10
  price: number; // 100–100000
  facilities: Facility[];
  host: User;
  location: Coordinates;
};
