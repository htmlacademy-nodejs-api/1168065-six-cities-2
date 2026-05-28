import { CommentValidation } from '../comment.constant.js';

export const CreateCommentMessages = {
  text: {
    invalidFormat: 'text is required',
    lengthField: `min length is ${CommentValidation.Text.MinLength}, max is ${CommentValidation.Text.MaxLength}`,
  },
  offerId: {
    invalidFormat: 'offerId field must be a valid id',
  },
  userId: {
    invalidFormat: 'userId field must be a valid id',
  },
  rating: {
    invalidFormat: 'rating must be an integer',
    minValue: `Minimum rating is ${CommentValidation.Rating.Min}`,
    maxValue: `Maximum rating is ${CommentValidation.Rating.Max}`,
  },
} as const;
