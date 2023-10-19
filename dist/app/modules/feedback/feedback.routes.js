"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedbackRoutes = void 0;
const express_1 = __importDefault(require("express"));
const feedback_controller_1 = require("./feedback.controller");
exports.feedbackRoutes = express_1.default.Router();
exports.feedbackRoutes.post("/", feedback_controller_1.feedbackController.postAFeedBack);
exports.feedbackRoutes.get("/", feedback_controller_1.feedbackController.getallfeedBack);
exports.feedbackRoutes.get("/:id", feedback_controller_1.feedbackController.getsingleFeedBack);
exports.feedbackRoutes.patch("/:id", feedback_controller_1.feedbackController.updatefeedback);
exports.feedbackRoutes.delete("/:id", feedback_controller_1.feedbackController.deleteFeedback);
