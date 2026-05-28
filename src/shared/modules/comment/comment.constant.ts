export const CommentValidation = {
  Text: {
    MinLength: 5,
    MaxLength: 1024,
  },
  Rating: {
    Min: 1,
    Max: 5,
  },
} as const;
