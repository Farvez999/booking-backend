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
exports.ServiceController = void 0;
const catchasync_1 = __importDefault(require("../../../shared/catchasync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const service_service_1 = require("./service.service");
const pick_1 = __importDefault(require("../../../shared/pick"));
const service_constant_1 = require("./service.constant");
const pagination_1 = __importDefault(require("../../../constants/pagination"));
const createAbuilding = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_service_1.serviceServices.createBuilding(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "service created  successfully",
        data: result,
    });
}));
const getAllBuildings = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, service_constant_1.ServiceFilterableFields);
    console.log("query", req.query);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.default);
    const result = yield service_service_1.serviceServices.getAllBuildings(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "service retrive  successfully",
        meta: result.meta,
        data: result.data,
    });
}));
const getSingleBuilding = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_service_1.serviceServices.getSingleBuilding(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "service retrive  successfully",
        data: result,
    });
}));
const updateBuilding = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_service_1.serviceServices.updateBuilding(req.body, req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "service updated  successfully",
        data: result,
    });
}));
const deleteBuilding = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_service_1.serviceServices.deleteBuilding(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "service deleted  successfully",
        data: result,
    });
}));
exports.ServiceController = {
    createAbuilding,
    getAllBuildings,
    getSingleBuilding,
    deleteBuilding,
    updateBuilding,
};
