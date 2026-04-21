import { Expose, Transform, Type } from 'class-transformer';
import { City, Coordinates, Facility, Housing } from '../../../types/index.js';
import { UserRdo } from '../../user/rdo/user.rdo.js';

export class OfferRdo {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  @Transform(({ value }) => value.toISOString())
  public publishDate: string;

  @Expose()
  public city: City;

  @Expose()
  public previewImage: string;

  @Expose()
  public images: string[];

  @Expose()
  public isPremium: boolean;

  @Expose()
  public isFavorite: boolean;

  @Expose()
  public rating: number;

  @Expose()
  public type: Housing;

  @Expose()
  public rooms: number;

  @Expose()
  public guests: number;

  @Expose()
  public price: number;

  @Expose()
  public facilities: Facility[];

  @Expose({ name: 'userId' })
  @Type(() => UserRdo)
  public host: UserRdo;

  @Expose()
  @Type(() => Coordinates)
  public location: Coordinates;
}
