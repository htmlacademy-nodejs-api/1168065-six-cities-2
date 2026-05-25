import { IsInt, IsMongoId, IsString, Length, Max, Min } from 'class-validator';
import { CreateCommentMessages } from './create-comment.messages.js';
import { CommentValidation } from '../comment.constant.js';

export class CreateCommentDTO {
  @IsString({ message: CreateCommentMessages.text.invalidFormat })
  @Length(CommentValidation.Text.MinLength, CommentValidation.Text.MaxLength, {
    message: CreateCommentMessages.text.lengthField,
  })
  public text: string;

  @IsInt({ message: CreateCommentMessages.rating.invalidFormat })
  @Min(0, { message: CreateCommentMessages.rating.minValue })
  @Max(5, { message: CreateCommentMessages.rating.maxValue })
  public rating: number;

  @IsMongoId({ message: CreateCommentMessages.offerId.invalidFormat })
  public offerId: string;

  public userId: string;
}
