import dayjs from 'dayjs';
import {
  generateRandomBoolean,
  generateRandomValue,
  getRandomItem,
  getRandomItems,
} from '../../helpers/index.js';
import { MockServerData } from '../../types/mock-server-data.type.js';
import { OfferGenerator } from './offer-generator.interface.js';

const OfferGenerationRange = {
  Price: {
    min: 100,
    max: 100000,
  },
  Guests: {
    min: 1,
    max: 10,
  },
  Rooms: {
    min: 1,
    max: 8,
  },
  Longitude: {
    min: 2,
    max: 11,
  },
  Latitude: {
    min: 48,
    max: 54,
  },
  PublishDays: {
    min: 1,
    max: 7,
  },
} as const;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const publishDate = dayjs()
      .subtract(
        generateRandomValue(
          OfferGenerationRange.PublishDays.min,
          OfferGenerationRange.PublishDays.max,
        ),
        'day',
      )
      .toISOString();
    const city = getRandomItem<string>(this.mockData.cities);
    const previewImage = getRandomItem<string>(this.mockData.previewImages);
    const images = getRandomItems<string>(this.mockData.offerImages).join(';');
    const isPremium = generateRandomBoolean();
    const type = getRandomItem(this.mockData.housingTypes);
    const rooms = generateRandomValue(
      OfferGenerationRange.Rooms.min,
      OfferGenerationRange.Rooms.max,
    ).toString();
    const guests = generateRandomValue(
      OfferGenerationRange.Guests.min,
      OfferGenerationRange.Rooms.max,
    ).toString();
    const price = generateRandomValue(
      OfferGenerationRange.Price.min,
      OfferGenerationRange.Price.max,
    ).toString();
    const facilities = getRandomItems<string>(this.mockData.facilities).join(
      ';',
    );
    const [firstname, lastname] = getRandomItem(this.mockData.users).split(' ');
    const email = getRandomItem(this.mockData.emails);
    const avatarPath = getRandomItem(this.mockData.avatars);
    const userType = generateRandomBoolean() ? 'pro' : 'base';
    const coordinates = [
      generateRandomValue(
        OfferGenerationRange.Latitude.min,
        OfferGenerationRange.Latitude.max,
        6,
      ),
      generateRandomValue(
        OfferGenerationRange.Longitude.min,
        OfferGenerationRange.Longitude.max,
        6,
      ),
    ].join(';');

    return [
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
      coordinates,
    ].join('\t');
  }
}
