import { IsEmail, IsIn, IsString, Length } from 'class-validator';
import { UserType, UserTypeValues } from '../../../types/index.js';
import { CreateUserMessages } from './create-user.messages.js';
import { UserValidation } from '../user.constant.js';

export class CreateUserDto {
  @IsEmail({}, { message: CreateUserMessages.email.invalidFormat })
  public email: string;

  @IsString({ message: CreateUserMessages.firstname.invalidFormat })
  @Length(
    UserValidation.Firstname.MinLength,
    UserValidation.Firstname.MaxLength,
    { message: CreateUserMessages.firstname.lengthField },
  )
  public firstname: string;

  @IsString({ message: CreateUserMessages.lastname.invalidFormat })
  @Length(
    UserValidation.Lastname.MinLength,
    UserValidation.Lastname.MaxLength,
    { message: CreateUserMessages.lastname.lengthField },
  )
  public lastname: string;

  @IsString({ message: CreateUserMessages.password.invalidFormat })
  @Length(
    UserValidation.Password.MinLength,
    UserValidation.Password.MaxLength,
    { message: CreateUserMessages.password.lengthField },
  )
  public password: string;

  @IsIn(UserTypeValues, { message: CreateUserMessages.type.invalid })
  public type: UserType;
}
