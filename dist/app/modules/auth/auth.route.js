"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
// import { validateRequest } from "../../middlewares/validateRequest";
// import { AuthValidation } from "./auth.validations";
const auth_controller_1 = require("./auth.controller");
// import { ENUM_USER_ROLE } from "../../../enums/user";
// import auth from "../../middlewares/auth";
const router = express_1.default.Router();
router.post("/login", auth_controller_1.AuthController.loginUser);
router.post("/refresh-token", auth_controller_1.AuthController.refreshToken);
router.post("/change-password", 
// auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
auth_controller_1.AuthController.changePassword);
exports.AuthRoutes = router;
