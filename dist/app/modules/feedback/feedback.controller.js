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
exports.feedbackController = void 0;
const catchasync_1 = __importDefault(require("../../../shared/catchasync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const feedback_service_1 = require("./feedback.service");
const postAFeedBack = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield feedback_service_1.feedbackservices.postAFeedBack(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "feedback posted  successfully",
        data: result,
    });
}));
const getallfeedBack = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield feedback_service_1.feedbackservices.getallfeedBack();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "feedback retrive   successfully",
        data: result,
    });
}));
const getsingleFeedBack = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield feedback_service_1.feedbackservices.getsingleFeedBack(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "feedback retrive  successfully",
        data: result,
    });
}));
const updatefeedback = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield feedback_service_1.feedbackservices.updatefeedback(req.body, req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "feedback update  successfully",
        data: result,
    });
}));
const deleteFeedback = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield feedback_service_1.feedbackservices.deleteFeedback(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "feedback deleted  successfully",
        data: result,
    });
}));
exports.feedbackController = {
    postAFeedBack,
    getallfeedBack,
    getsingleFeedBack,
    updatefeedback,
    deleteFeedback,
};
