import { UserValidation } from '../user.constant.js';

export const CreateUserMessages = {
  email: {
    invalidFormat: 'email must be a valid address',
  },
  firstname: {
    invalidFormat: 'firstname is required',
    lengthField: `min length is ${UserValidation.Firstname.MinLength}, max is ${UserValidation.Firstname.MaxLength}`,
  },
  lastname: {
    invalidFormat: 'lastname is required',
    lengthField: `min length is ${UserValidation.Lastname.MinLength}, max is ${UserValidation.Lastname.MaxLength}`,
  },
  password: {
    invalidFormat: 'password is required',
    lengthField: `min length for password is ${UserValidation.Password.MinLength}, max is ${UserValidation.Password.MaxLength}`,
  },
  type: {
    invalid: 'type must be one of UserType',
  },
} as const;
