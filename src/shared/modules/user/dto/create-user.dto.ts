import { UserType } from '../../../types/index.js';

export class CreateUserDto {
  public email: string;
  public avatarPath: string;
  public firstname: string;
  public lastname: string;
  public password: string;
  public type: UserType;
}
