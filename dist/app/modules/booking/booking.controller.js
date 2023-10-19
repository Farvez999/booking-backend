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
exports.bookingControllers = void 0;
const catchasync_1 = __importDefault(require("../../../shared/catchasync"));
const booking_service_1 = require("./booking.service");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const pagination_1 = __importDefault(require("../../../constants/pagination"));
const createAbooking = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("booking", req.body);
    const result = yield booking_service_1.bookingServices.createAbooking(req.body, req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "booking created   successfully",
        data: result,
    });
}));
const getallBooking = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.default);
    const result = yield booking_service_1.bookingServices.getallBooking(req.query, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "booking retrive  successfully",
        meta: result.meta,
        data: result.data,
    });
}));
const getSingleBooking = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_service_1.bookingServices.getSingleBooking(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "booking retrive  successfully",
        data: result,
    });
}));
const updateBooking = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_service_1.bookingServices.updateBooking(req.body, req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "booking updated  successfully",
        data: result,
    });
}));
const deleteBooking = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_service_1.bookingServices.deleteBooking(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "booking deleted  successfully",
        data: result,
    });
}));
const cancelBooking = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_service_1.bookingServices.cancelBooking(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "booking cancelled  successfully",
        data: result,
    });
}));
const updatebookingStatusByAdmin = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_service_1.bookingServices.updatebookingStatusByAdmin(req.body, req.params.id);
    console.log(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "booking status updated  successfully",
        data: result,
    });
}));
const updateRoomBookingSchedulling = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_service_1.bookingServices.updateRoomBookingStatusSchedulling(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "room booking status reset  successfully",
        data: result,
    });
}));
exports.bookingControllers = {
    createAbooking,
    getallBooking,
    getSingleBooking,
    deleteBooking,
    updateBooking,
    cancelBooking,
    updatebookingStatusByAdmin,
    updateRoomBookingSchedulling,
};
