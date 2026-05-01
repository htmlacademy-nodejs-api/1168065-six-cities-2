export const CreateCommentMessages = {
  text: {
    invalidFormat: 'text is required',
    lengthField: 'min length is 5, max is 2024',
  },
  offerId: {
    invalidFormat: 'offerId field must be a valid id',
  },
  userId: {
    invalidFormat: 'userId field must be a valid id',
  },
  rating: {
    invalidFormat: 'rating must be an integer',
    minValue: 'Minimum rating is 0',
    maxValue: 'Maximum rating is 5',
  },
} as const;
