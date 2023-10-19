/* eslint-disable @typescript-eslint/no-explicit-any */
import { ENUM_USER_ROLE } from "../../../enums/user";

export type ILoginUser = {
  email: string;
  password: string;
};
export type IChangePassword = {
  oldPassword: string;
  newPassword: string;
};
export type ILoginUserResponse = {
  data: any;
  accessToken: string;
  refreshToken?: string;
};

export type IRefreshTokenResponse = {
  accessToken: string;
  refreshToken: string;
};

export type IVerifiedLoginUser = {
  userId: string;
  role: ENUM_USER_ROLE;
};
