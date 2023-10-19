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
exports.bookingServices = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const booking_model_1 = __importDefault(require("./booking.model"));
// import { generateBookingId } from "./booking.utiles";
const rooms_model_1 = __importDefault(require("../rooms/rooms.model"));
const Apierror_1 = __importDefault(require("../../../errors/Apierror"));
const http_status_1 = __importDefault(require("http-status"));
// import { bookingSearchableFields } from "./booking.constant";
// import { bookingSearchableFields } from "./booking.constant";
/* eslint-disable @typescript-eslint/no-explicit-any */
const createAbooking = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const bookingNo = `BOOKING-${(_a = payload === null || payload === void 0 ? void 0 : payload.user) === null || _a === void 0 ? void 0 : _a.phone}`;
    const { checkInDate, checkOutDate } = payload;
    const inDate = new Date(checkInDate).toISOString().split("T")[0];
    const outDate = new Date(checkOutDate).toISOString().split("T")[0];
    (payload.checkInDate = inDate), (payload.checkOutDate = outDate);
    payload.room = id;
    payload.bookingNo = bookingNo;
    const result = yield booking_model_1.default.create(payload);
    return result;
});
const getallBooking = (payload, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const sortConditions = {};
    const query = {};
    if (payload.phone) {
        query["user.phone"] = { $regex: new RegExp(payload.phone), $options: "i" };
    }
    if (payload.email) {
        query["user.email"] = { $regex: new RegExp(payload.email), $options: "i" };
    }
    if (payload.bookingNo) {
        query.bookingNo = { $regex: new RegExp(payload.bookingNo), $options: "i" };
    }
    if (payload.userId) {
        query.userId = payload.userId;
    }
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const result = yield booking_model_1.default.find(query)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    return {
        meta: {
            page,
            limit,
            total: result.length,
        },
        data: result,
    };
});
const getSingleBooking = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.default.findById(id);
    return result;
});
const updateBooking = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.default.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteBooking = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.default.findByIdAndDelete(id);
    return result;
});
const cancelBooking = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.default.findByIdAndUpdate(id, {
        $set: {
            status: "cancelled",
        },
    });
    return result;
});
const updatebookingStatusByAdmin = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload);
    const result = yield booking_model_1.default.findByIdAndUpdate(id, {
        $set: {
            status: (payload.status === "confirmed" && "confirmed") ||
                (payload.status === "cancelled" && "cancelled"),
            payStatus: payload.status === "confirmed" && "paid",
        },
    }, {
        new: true,
    });
    // eslint-disable-next-line no-cond-assign
    if (payload.status === "confirmed" && result) {
        const findRoom = yield booking_model_1.default.findOne({
            $and: [{ _id: id }, { status: "confirmed" }],
        });
        if (findRoom) {
            const updateHere = yield rooms_model_1.default.findByIdAndUpdate(findRoom === null || findRoom === void 0 ? void 0 : findRoom.room, {
                $set: {
                    isBooked: true,
                },
            }, {
                new: true,
            });
            console.log(updateHere);
        }
    }
    return result;
});
// scheduling handler
const updateRoomBookingStatusSchedulling = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const findbooking = yield booking_model_1.default.findOne({
        _id: id,
    });
    if (!findbooking) {
        throw new Apierror_1.default(http_status_1.default.NOT_FOUND, "booking not found for closed");
    }
    const findRoomANDUpdate = yield rooms_model_1.default.findOneAndUpdate({
        _id: findbooking === null || findbooking === void 0 ? void 0 : findbooking.room,
    }, {
        $set: {
            isBooked: false,
        },
    }, { new: true });
    if (!findRoomANDUpdate) {
        throw new Apierror_1.default(http_status_1.default.NOT_FOUND, "rooms status not found for update");
    }
    const result = yield booking_model_1.default.findOneAndUpdate({ _id: id }, {
        $set: {
            status: "closed",
        },
    }, {
        new: true,
    });
    return result;
});
exports.bookingServices = {
    createAbooking,
    getallBooking,
    getSingleBooking,
    updateBooking,
    deleteBooking,
    cancelBooking,
    updatebookingStatusByAdmin,
    updateRoomBookingStatusSchedulling,
};
