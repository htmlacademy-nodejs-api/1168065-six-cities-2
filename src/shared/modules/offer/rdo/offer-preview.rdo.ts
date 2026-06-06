import { Expose, Transform } from 'class-transformer';
import { City, Housing } from '../../../types/index.js';

export class OfferPreviewRdo {
  @Expose()
  @Transform(({ obj }) => obj.id ?? obj._id?.toString())
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  @Transform(({ value }) =>
    value instanceof Date ? value.toISOString() : value,
  )
  public publishDate: string;

  @Expose()
  public city: City;

  @Expose()
  public previewImage: string;

  @Expose()
  public isPremium: boolean;

  @Expose()
  public isFavorite: boolean;

  @Expose()
  public rating: number;

  @Expose()
  public commentsCount: number;

  @Expose()
  public type: Housing;

  @Expose()
  public price: number;
}
