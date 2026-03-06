import dayjs from 'dayjs';
import {
  generateRandomBoolean,
  generateRandomValue,
  getRandomItem,
  getRandomItems,
} from '../../helpers/index.js';
import { MockServerData } from '../../types/mock-server-data.type.js';
import { OfferGenerator } from './offer-generator.interface.js';

const PRICE = { min: 100, max: 100000 };
const GUESTS = { min: 1, max: 10 };
const ROOMS = { min: 1, max: 8 };
const RATING = { min: 0, max: 5 };
const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;
const LONGITUDE = { min: 2, max: 11 };
const LATITUDE = { min: 48, max: 54 };

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const publishDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();
    const city = getRandomItem<string>(this.mockData.cities);
    const previewImage = getRandomItem<string>(this.mockData.previewImages);
    const images = getRandomItems<string>(this.mockData.offerImages).join(';');
    const isPremium = generateRandomBoolean();
    const isFavorite = generateRandomBoolean();
    const rating = generateRandomValue(RATING.min, RATING.max, 1).toString();
    const type = getRandomItem(this.mockData.housingTypes);
    const rooms = generateRandomValue(ROOMS.min, ROOMS.max, 1).toString();
    const guests = generateRandomValue(GUESTS.min, GUESTS.max, 1).toString();
    const price = generateRandomValue(PRICE.min, PRICE.max).toString();
    const facilities = getRandomItems<string>(this.mockData.facilities).join(
      ';',
    );
    const name = getRandomItem(this.mockData.users);
    const email = getRandomItem(this.mockData.emails);
    const location = [
      generateRandomValue(LATITUDE.min, LATITUDE.max, 6),
      generateRandomValue(LONGITUDE.min, LONGITUDE.max, 6),
    ].join(';');

    return [
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
    ].join('\t');
  }
}
