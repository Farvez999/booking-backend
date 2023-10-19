// import bcrypt from "bcrypt";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { SortOrder } from "mongoose";
import ApiError from "../../../errors/Apierror";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IPaginationOptions } from "../../../interfaces/paginations";
import { IUser } from "./user.interface";
import User from "./user.model";
import httpStatus from "http-status";
// import config from "../../../config";

const createUser = async (userData: IUser): Promise<IUser | null> => {
  const { email, phoneNumber } = userData;
  console.log("phone number", phoneNumber);
  const findDuplicateEmail = await User.findOne({ email: email });
  if (findDuplicateEmail) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "user already exist with this email  try different one !"
    );
  }
  const findDuplicatePhone = await User.findOne({
    phoneNumber: phoneNumber,
  });
  console.log("find", findDuplicatePhone);
  if (findDuplicatePhone) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "user already exist with this phone try different One!"
    );
  }
  // userData.password = await bcrypt.hash(
  //   userData?.password,
  //   Number(config.bcrypt_salt_rounds)
  // );
  const newUser = await User.create(userData);

  return newUser;
};

const getAllUsers = async (
  payload: any,
  paginationOptions: IPaginationOptions
): Promise<any> => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  const query: any = {};

  if (payload.email) query.email = { $regex: payload.email, $options: "i" };
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await User.find(query)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .populate("cart");
  return {
    meta: {
      page,
      limit,
      total: result.length,
    },
    data: result,
  };
};
const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findOne({ _id: id }).populate("cart");
  console.log(result);
  return result;
};

const updateUser = async (
  id: string,
  payload: Partial<any>
): Promise<any | null> => {
  const isExist = await User.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(404, "User not found !");
  }

  const { role, ...UserData } = payload;
  console.log(payload);
  if (role) {
    throw new ApiError(
      500,
      "something went wrong. you cannot update your role"
    );
  }

  const result = await User.findOneAndUpdate({ _id: id }, UserData, {
    new: true,
  });
  console.log("result", result);
  return result;
};
const deleteUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findOneAndDelete({ _id: id });

  return result;
};

const manageRole = async (payload: any, id: string) => {
  const { role }: any = payload;
  console.log(role);
  const result = await User.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        role:
          (role === "admin" && "admin") ||
          (role === "super_admin" && "super_admin") ||
          (role === "user" && "user"),
      },
    },
    {
      new: true,
    }
  );
  return result;
};
export const UserService = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  manageRole,
};
