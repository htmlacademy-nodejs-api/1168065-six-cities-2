export const UserTypeValues = ['pro', 'base'] as const;
export type UserType = (typeof UserTypeValues)[number];
