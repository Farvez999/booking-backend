"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.faqRoutes = void 0;
const express_1 = __importDefault(require("express"));
const content_controller_1 = require("./content.controller");
exports.faqRoutes = express_1.default.Router();
exports.faqRoutes.post("/", content_controller_1.faqController.createfaq);
exports.faqRoutes.get("/", content_controller_1.faqController.getgallfaqs);
exports.faqRoutes.get("/:id", content_controller_1.faqController.getsinglefaqs);
exports.faqRoutes.patch("/:id", content_controller_1.faqController.updatefaqs);
exports.faqRoutes.delete("/:id", content_controller_1.faqController.deletefaq);
