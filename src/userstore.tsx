import React, { Dispatch, SetStateAction } from 'react';

export type UserType = string | undefined;

export const UserContext = React.createContext<
  [UserType, Dispatch<SetStateAction<UserType>> | undefined]
>([undefined, undefined]);
