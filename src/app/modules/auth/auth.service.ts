import bcrypt from "bcrypt";
import { JwtPayload, Secret } from "jsonwebtoken";
import config from "../../../config";

import {
  IChangePassword,
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from "./auth.interface";
import User from "../user/user.model";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import ApiError from "../../../errors/Apierror";
import httpStatus from "http-status";

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isUserExist: any = await User.findOne({ email });
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "user not found");
  }
  const matchedpassword = await bcrypt.compare(password, isUserExist?.password);
  if (!matchedpassword) {
    throw new ApiError(httpStatus.BAD_GATEWAY, "password is incorrect");
  }

  //create access token & refresh token

  const { _id: userId, role: role } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { userId, role, email },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  //Create refresh token
  const refreshToken = jwtHelpers.createToken(
    { userId, role, email },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    data: isUserExist,
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  //verify token
  // invalid token - synchronous
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(402, "Invalid Refresh Token");
  }

  const { userId } = verifiedToken;

  // checking deleted user's refresh token

  const isUserExist = await User.isUserExist(userId);
  if (!isUserExist) {
    throw new ApiError(403, "User does not exist");
  }
  //generate new token

  const newAccessToken = jwtHelpers.createToken(
    {
      id: isUserExist._id,
      role: isUserExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
    refreshToken: token,
  };
};

const changePassword = async (
  user: JwtPayload | null,
  payload: IChangePassword
): Promise<void> => {
  const { oldPassword } = payload;
  const isUserExist = await User.findOne({ id: user?.userId }).select(
    "+password"
  );
  if (!isUserExist) {
    throw new ApiError(404, "User does not exist");
  }
  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(oldPassword, isUserExist.password))
  ) {
    throw new ApiError(402, "Old password is incorrect");
  }

  isUserExist.save();
};
export const AuthService = {
  loginUser,
  refreshToken,
  changePassword,
};
