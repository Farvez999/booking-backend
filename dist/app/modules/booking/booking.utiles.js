"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
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
exports.generateBookingId = exports.findLastBookingId = void 0;
const booking_model_1 = __importDefault(require("./booking.model"));
const findLastBookingId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastBooking = yield booking_model_1.default.findOne({
        forCheck: "booking",
    }, { _id: 0 })
        .sort({
        createdAt: -1,
    })
        .lean();
    return (lastBooking === null || lastBooking === void 0 ? void 0 : lastBooking.bookingNo)
        ? lastBooking.bookingNo.substring(4)
        : undefined;
});
exports.findLastBookingId = findLastBookingId;
const generateBookingId = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentCode = (yield (0, exports.findLastBookingId)()) || (0).toString().padStart(5, "0"); //00000
    //increment by 1
    let incrementCode = (parseInt(currentCode) + 1).toString().padStart(5, "0");
    //20 25
    incrementCode = `BOOKING-${incrementCode}`;
    return incrementCode;
});
exports.generateBookingId = generateBookingId;
