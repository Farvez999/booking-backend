"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const routes_1 = __importDefault(require("./app/routes"));
const NotFoundHandler_1 = require("./errors/NotFoundHandler");
exports.app = (0, express_1.default)();
//cors
exports.app.use((0, cors_1.default)({
    origin: ["http://localhost:3000"],
    credentials: true,
}));
//parser
exports.app.use((0, express_fileupload_1.default)());
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
//All Routes
exports.app.use("/api/v1", routes_1.default);
//Global Error Handler
exports.app.use(globalErrorHandler_1.default);
//handle not found
exports.app.use(NotFoundHandler_1.NotFoundHandler.handle);
