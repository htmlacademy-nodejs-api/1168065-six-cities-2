import { createStringUnionParser } from '../helpers/index.js';

export const FacilityValues = [
  'Breakfast',
  'Air conditioning',
  'Laptop friendly workspace',
  'Baby seat',
  'Washer',
  'Towels',
  'Fridge',
] as const;

export type Facility = (typeof FacilityValues)[number];

export const parseFacility = createStringUnionParser(FacilityValues);
