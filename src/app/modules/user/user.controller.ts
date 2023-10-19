/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, RequestHandler, Response } from "express";
import { UserService } from "./user.service";

import sendResponse from "../../../shared/sendResponse";
import { IUser } from "./user.interface";
import catchAsync from "../../../shared/catchasync";
import pick from "../../../shared/pick";
import paginationFields from "../../../constants/pagination";

const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...userData } = req.body;
    console.log(userData);
    const result = await UserService.createUser(userData);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User created successfully",
      data: result,
    });
  }
);

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  const result = await UserService.getAllUsers(req.query, paginationOptions);
  sendResponse<any>(res, {
    statusCode: 200,
    success: true,
    message: "service retrive  successfully",
    meta: result.meta,
    data: result.data,
  });
});
const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await UserService.getSingleUser(id);
  sendResponse<IUser>(res, {
    statusCode: 200,
    success: true,
    message: "User retrieved successfully",
    data: result,
  });
});
const updateUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  console.log(updatedData);
  console.log("body", req.body);
  const result = await UserService.updateUser(id, updatedData);
  sendResponse<IUser>(res, {
    statusCode: 200,
    success: true,
    message: "User updated successfully",
    data: result,
  });
});
const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UserService.deleteUser(id);
  sendResponse<IUser>(res, {
    statusCode: 200,
    success: true,
    message: "User deleted successfully",
    data: result,
  });
});

const manageRole = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.manageRole(req.body, req.params.id);
  sendResponse<IUser>(res, {
    statusCode: 200,
    success: true,
    message: "role updated successfully successfully",
    data: result,
  });
});

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  manageRole,
  deleteUser,
};
