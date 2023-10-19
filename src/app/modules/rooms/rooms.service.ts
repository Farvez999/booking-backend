/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import ApiError from "../../../errors/Apierror";
import Service from "../service/service.model";
import Room from "./rooms.model";
import { IPaginationOptions } from "../../../interfaces/paginations";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { SortOrder } from "mongoose";
import { generateRoomId } from "./rooms.utiels";
import User from "../user/user.model";

const createAroom = async (payload: any): Promise<any> => {
  const { building }: any = payload;
  const roomId = await generateRoomId(payload?.title);
  console.log(building);
  payload.roomId = roomId;
  const room = await Room.create(payload);
  if (!room) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "something went wrong. room not created"
    );
  }

  // Push the room's _id into the building's rooms array
  const updatedBuilding = await Service.findByIdAndUpdate(
    building,
    {
      $push: { rooms: room._id },
    },
    { new: true }
  );
  if (!updatedBuilding) {
    throw new ApiError(httpStatus.BAD_REQUEST, "rooms not insert in buiding");
  }

  return room;
};
const getallRooms = async (
  filters: any,
  paginationOptions: IPaginationOptions
): Promise<any> => {
  const { category, minPriceRange, maxPriceRange } = filters;
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  const query: any = {};
  if (category) query.category = category;
  if (minPriceRange || maxPriceRange) {
    query.pricing = {};
    minPriceRange ? (query.pricing.$gte = Number(minPriceRange)) : null;
    maxPriceRange ? (query.pricing.$lte = Number(maxPriceRange)) : null;
  }
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await Room.find(query)
    .sort({ _id: 1 })
    .skip(skip)
    .limit(limit)
    .populate("building");

  return {
    meta: {
      page,
      limit,
      total: result.length,
    },
    data: result,
  };
};
const getsingleRooms = async (id: string): Promise<any> => {
  const result = await Room.findOne({ _id: id }).populate(
    "reviewAndRatings.user"
  );
  return result;
};
const updateRoom = async (payload: any, id: string): Promise<any> => {
  const result = await Room.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
const deleteRoom = async (id: string): Promise<any> => {
  const result = await Room.findOneAndDelete({ _id: id });
  return result;
};

const reviewAndRatings = async (roomId: string, payload: any) => {
  console.log(payload);
  const result = await Room.findOneAndUpdate(
    { _id: roomId },
    {
      $push: {
        reviewAndRatings: payload,
      },
    },
    {
      new: true,
    }
  );
  return result;
};
const getreviews = async (userId: any) => {
  let result;
  if (userId) {
    result = await Room.find({
      reviewAndRatings: {
        $elemMatch: { userId },
      },
    });
  } else {
    result = await Room.find({});
  }
  return result;
};

const addToCart = async (roomId: any, userId: string) => {
  // console.log(roomId);
  console.log("userId", userId);
  const user: any = await User.findOne({ _id: userId });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  if (user.cart.includes(roomId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Room already in the cart");
  }
  const result = await User.findOneAndUpdate(
    { _id: userId },
    {
      $push: {
        cart: roomId,
      },
    },
    {
      new: true,
    }
  );
  return result;
};
const removeFromCart = async (roomId: string, userId: string) => {
  console.log(roomId, userId);
  const result = await User.findOneAndUpdate(
    { _id: userId },
    {
      $pull: {
        cart: roomId,
      },
    },
    {
      new: true,
    }
  );

  console.log("result", result);
  return result;
};

export const roomservices = {
  createAroom,
  getallRooms,
  getsingleRooms,
  updateRoom,
  deleteRoom,
  reviewAndRatings,
  getreviews,
  addToCart,
  removeFromCart,
};
