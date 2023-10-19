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
exports.roomController = void 0;
const catchasync_1 = __importDefault(require("../../../shared/catchasync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const rooms_service_1 = require("./rooms.service");
const pick_1 = __importDefault(require("../../../shared/pick"));
const rooms_constant_1 = require("./rooms.constant");
const pagination_1 = __importDefault(require("../../../constants/pagination"));
const createAroom = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield rooms_service_1.roomservices.createAroom(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "room created  successfully",
        data: result,
    });
}));
const getallRooms = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, rooms_constant_1.roomFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.default);
    const result = yield rooms_service_1.roomservices.getallRooms(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "rooms retrive  successfully",
        meta: result.meta,
        data: result.data,
    });
}));
const getsingleRooms = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield rooms_service_1.roomservices.getsingleRooms(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "room retrive  successfully",
        data: result,
    });
}));
const updateRoom = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield rooms_service_1.roomservices.updateRoom(req.body, req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "room updated  successfully",
        data: result,
    });
}));
const deleteRoom = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield rooms_service_1.roomservices.deleteRoom(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "room deleted  successfully",
        data: result,
    });
}));
const reviewAndRatings = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield rooms_service_1.roomservices.reviewAndRatings(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "review added",
        data: result,
    });
}));
const getreviews = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield rooms_service_1.roomservices.getreviews(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "review retrived",
        data: result,
    });
}));
const addTocart = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("body", req.body);
    const result = yield rooms_service_1.roomservices.addToCart(req.params.id, req.body.userId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "added to cart",
        data: result,
    });
}));
const removeFromCart = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield rooms_service_1.roomservices.removeFromCart(req.params.id, req.body.userId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "remove from cart",
        data: result,
    });
}));
exports.roomController = {
    createAroom,
    getallRooms,
    getsingleRooms,
    deleteRoom,
    updateRoom,
    reviewAndRatings,
    getreviews,
    addTocart,
    removeFromCart,
};
