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
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedbackservices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const feedback_model_1 = require("./feedback.model");
const postAFeedBack = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield feedback_model_1.Feedback.create(payload);
    return result;
});
const getallfeedBack = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield feedback_model_1.Feedback.find({});
    return result;
});
const getsingleFeedBack = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield feedback_model_1.Feedback.findById(id);
    return result;
});
const updatefeedback = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield feedback_model_1.Feedback.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteFeedback = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield feedback_model_1.Feedback.findByIdAndDelete(id);
    return result;
});
exports.feedbackservices = {
    postAFeedBack,
    getallfeedBack,
    getsingleFeedBack,
    updatefeedback,
    deleteFeedback,
};
