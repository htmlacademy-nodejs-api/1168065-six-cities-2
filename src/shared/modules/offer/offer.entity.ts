import {
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from '@typegoose/typegoose';
import {
  City,
  Coordinates,
  Facility,
  FacilityValues,
  Housing,
  HousingValues,
} from '../../types/index.js';
import { UserEntity } from '../user/index.js';
import { OfferValidation } from './offer.constant.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}
export type OfferWithFavorite = OfferEntity & {
  isFavorite: boolean;
};
export type OfferPreview = Omit<
  OfferWithFavorite,
  | 'description'
  | 'images'
  | 'facilities'
  | 'rooms'
  | 'guests'
  | 'location'
  | 'userId'
>;
export type OfferPreviewBase = Omit<OfferPreview, 'isFavorite'>;

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  },
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true, minlength: 10, maxlength: 100 })
  public title!: string;

  @prop({ trim: true, required: true, minlength: 20, maxlength: 1024 })
  public description!: string;

  @prop()
  public publishDate!: Date;

  @prop({ required: true, type: () => String, enum: City })
  public city!: City;

  @prop()
  public previewImage!: string;

  @prop({ required: true, type: () => [String] })
  public images!: string[];

  @prop({ required: true })
  public isPremium!: boolean;

  @prop({ default: 0 })
  public rating!: number;

  @prop({ default: 0 })
  public commentsCount!: number;

  @prop({ required: true, type: () => String, enum: HousingValues })
  public type!: Housing;

  @prop({
    required: true,
    min: OfferValidation.Rooms.Min,
    max: OfferValidation.Rooms.Max,
  })
  public rooms!: number;

  @prop({
    required: true,
    min: OfferValidation.Guests.Min,
    max: OfferValidation.Guests.Max,
  })
  public guests!: number;

  @prop({
    required: true,
    min: OfferValidation.Price.Min,
    max: OfferValidation.Price.Max,
  })
  public price!: number;

  @prop({ required: true, type: () => [String], enum: FacilityValues })
  public facilities!: Facility[];

  @prop({
    ref: UserEntity,
    required: true,
  })
  public userId!: Ref<UserEntity>;

  @prop({
    required: true,
    type: Coordinates,
  })
  public location!: Coordinates;
}

export const OfferModel = getModelForClass(OfferEntity);
