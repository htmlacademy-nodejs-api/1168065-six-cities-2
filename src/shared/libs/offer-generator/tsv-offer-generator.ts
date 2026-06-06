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
    Min: 100,
    Max: 100000,
  },
  Guests: {
    Min: 1,
    Max: 10,
  },
  Rooms: {
    Min: 1,
    Max: 8,
  },
  Longitude: {
    Min: 2,
    Max: 11,
  },
  Latitude: {
    Min: 48,
    Max: 54,
  },
  PublishDays: {
    Min: 1,
    Max: 7,
  },
} as const;

const IMAGES_LENGTH = 6;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const publishDate = dayjs()
      .subtract(
        generateRandomValue(
          OfferGenerationRange.PublishDays.Min,
          OfferGenerationRange.PublishDays.Max,
        ),
        'day',
      )
      .toISOString();
    const city = getRandomItem<string>(this.mockData.cities);
    const previewImage = getRandomItem<string>(this.mockData.previewImages);
    const images = getRandomItems<string>(
      this.mockData.offerImages,
      IMAGES_LENGTH,
    ).join(';');
    const isPremium = generateRandomBoolean();
    const type = getRandomItem(this.mockData.housingTypes);
    const rooms = generateRandomValue(
      OfferGenerationRange.Rooms.Min,
      OfferGenerationRange.Rooms.Max,
    ).toString();
    const guests = generateRandomValue(
      OfferGenerationRange.Guests.Min,
      OfferGenerationRange.Rooms.Max,
    ).toString();
    const price = generateRandomValue(
      OfferGenerationRange.Price.Min,
      OfferGenerationRange.Price.Max,
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
        OfferGenerationRange.Latitude.Min,
        OfferGenerationRange.Latitude.Max,
        6,
      ),
      generateRandomValue(
        OfferGenerationRange.Longitude.Min,
        OfferGenerationRange.Longitude.Max,
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
