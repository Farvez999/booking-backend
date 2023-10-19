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
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../../config"));
const user_model_1 = __importDefault(require("../user/user.model"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const Apierror_1 = __importDefault(require("../../../errors/Apierror"));
const http_status_1 = __importDefault(require("http-status"));
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isUserExist = yield user_model_1.default.findOne({ email });
    if (!isUserExist) {
        throw new Apierror_1.default(http_status_1.default.NOT_FOUND, "user not found");
    }
    const matchedpassword = yield bcrypt_1.default.compare(password, isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password);
    if (!matchedpassword) {
        throw new Apierror_1.default(http_status_1.default.BAD_GATEWAY, "password is incorrect");
    }
    //create access token & refresh token
    const { _id: userId, role: role } = isUserExist;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ userId, role, email }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    //Create refresh token
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ userId, role, email }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        data: isUserExist,
        accessToken,
        refreshToken,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    //verify token
    // invalid token - synchronous
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_secret);
    }
    catch (err) {
        throw new Apierror_1.default(402, "Invalid Refresh Token");
    }
    const { userId } = verifiedToken;
    // checking deleted user's refresh token
    const isUserExist = yield user_model_1.default.isUserExist(userId);
    if (!isUserExist) {
        throw new Apierror_1.default(403, "User does not exist");
    }
    //generate new token
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken({
        id: isUserExist._id,
        role: isUserExist.role,
    }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken: newAccessToken,
        refreshToken: token,
    };
});
const changePassword = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword } = payload;
    const isUserExist = yield user_model_1.default.findOne({ id: user === null || user === void 0 ? void 0 : user.userId }).select("+password");
    if (!isUserExist) {
        throw new Apierror_1.default(404, "User does not exist");
    }
    if (isUserExist.password &&
        !(yield user_model_1.default.isPasswordMatched(oldPassword, isUserExist.password))) {
        throw new Apierror_1.default(402, "Old password is incorrect");
    }
    isUserExist.save();
});
exports.AuthService = {
    loginUser,
    refreshToken,
    changePassword,
};
