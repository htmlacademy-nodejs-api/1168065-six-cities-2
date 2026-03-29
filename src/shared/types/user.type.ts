import { UserType } from './user-type.type.js';

export type User = {
  firstname: string;
  lastname: string;
  email: string;
  avatarPath: string;
  type: UserType;
};
