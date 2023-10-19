import express from "express";
// import { validateRequest } from "../../middlewares/validateRequest";
// import { AuthValidation } from "./auth.validations";
import { AuthController } from "./auth.controller";
// import { ENUM_USER_ROLE } from "../../../enums/user";
// import auth from "../../middlewares/auth";

const router = express.Router();
router.post(
  "/login",

  AuthController.loginUser
);
router.post(
  "/refresh-token",

  AuthController.refreshToken
);
router.post(
  "/change-password",

  // auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  AuthController.changePassword
);

export const AuthRoutes = router;
