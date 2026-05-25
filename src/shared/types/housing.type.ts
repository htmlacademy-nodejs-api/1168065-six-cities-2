import { createStringUnionParser } from '../helpers/index.js';

export const HousingValues = ['apartment', 'house', 'room', 'hotel'] as const;

export type Housing = (typeof HousingValues)[number];

export const parseHousing = createStringUnionParser(HousingValues);
