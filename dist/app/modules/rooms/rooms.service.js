"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomservices = void 0;
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const Apierror_1 = __importDefault(require("../../../errors/Apierror"));
const service_model_1 = __importDefault(require("../service/service.model"));
const rooms_model_1 = __importDefault(require("./rooms.model"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const rooms_utiels_1 = require("./rooms.utiels");
const user_model_1 = __importDefault(require("../user/user.model"));
const createAroom = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { building } = payload;
    const roomId = yield (0, rooms_utiels_1.generateRoomId)(payload === null || payload === void 0 ? void 0 : payload.title);
    console.log(building);
    payload.roomId = roomId;
    const room = yield rooms_model_1.default.create(payload);
    if (!room) {
        throw new Apierror_1.default(http_status_1.default.BAD_REQUEST, "something went wrong. room not created");
    }
    // Push the room's _id into the building's rooms array
    const updatedBuilding = yield service_model_1.default.findByIdAndUpdate(building, {
        $push: { rooms: room._id },
    }, { new: true });
    if (!updatedBuilding) {
        throw new Apierror_1.default(http_status_1.default.BAD_REQUEST, "rooms not insert in buiding");
    }
    return room;
});
const getallRooms = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { category, minPriceRange, maxPriceRange } = filters;
    const { limit, page, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const query = {};
    if (category)
        query.category = category;
    if (minPriceRange || maxPriceRange) {
        query.pricing = {};
        minPriceRange ? (query.pricing.$gte = Number(minPriceRange)) : null;
        maxPriceRange ? (query.pricing.$lte = Number(maxPriceRange)) : null;
    }
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const result = yield rooms_model_1.default.find(query)
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
});
const getsingleRooms = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield rooms_model_1.default.findOne({ _id: id }).populate("reviewAndRatings.user");
    return result;
});
const updateRoom = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield rooms_model_1.default.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteRoom = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield rooms_model_1.default.findOneAndDelete({ _id: id });
    return result;
});
const reviewAndRatings = (roomId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload);
    const result = yield rooms_model_1.default.findOneAndUpdate({ _id: roomId }, {
        $push: {
            reviewAndRatings: payload,
        },
    }, {
        new: true,
    });
    return result;
});
const getreviews = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    let result;
    if (userId) {
        result = yield rooms_model_1.default.find({
            reviewAndRatings: {
                $elemMatch: { userId },
            },
        });
    }
    else {
        result = yield rooms_model_1.default.find({});
    }
    return result;
});
const addToCart = (roomId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(roomId);
    console.log("userId", userId);
    const user = yield user_model_1.default.findOne({ _id: userId });
    if (!user) {
        throw new Apierror_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    if (user.cart.includes(roomId)) {
        throw new Apierror_1.default(http_status_1.default.BAD_REQUEST, "Room already in the cart");
    }
    const result = yield user_model_1.default.findOneAndUpdate({ _id: userId }, {
        $push: {
            cart: roomId,
        },
    }, {
        new: true,
    });
    return result;
});
const removeFromCart = (roomId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(roomId, userId);
    const result = yield user_model_1.default.findOneAndUpdate({ _id: userId }, {
        $pull: {
            cart: roomId,
        },
    }, {
        new: true,
    });
    console.log("result", result);
    return result;
});
exports.roomservices = {
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
