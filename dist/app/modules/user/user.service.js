"use strict";
// import bcrypt from "bcrypt";
/* eslint-disable @typescript-eslint/no-explicit-any */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const Apierror_1 = __importDefault(require("../../../errors/Apierror"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const user_model_1 = __importDefault(require("./user.model"));
const http_status_1 = __importDefault(require("http-status"));
// import config from "../../../config";
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, phoneNumber } = userData;
    console.log("phone number", phoneNumber);
    const findDuplicateEmail = yield user_model_1.default.findOne({ email: email });
    if (findDuplicateEmail) {
        throw new Apierror_1.default(http_status_1.default.BAD_REQUEST, "user already exist with this email  try different one !");
    }
    const findDuplicatePhone = yield user_model_1.default.findOne({
        phoneNumber: phoneNumber,
    });
    console.log("find", findDuplicatePhone);
    if (findDuplicatePhone) {
        throw new Apierror_1.default(http_status_1.default.BAD_REQUEST, "user already exist with this phone try different One!");
    }
    // userData.password = await bcrypt.hash(
    //   userData?.password,
    //   Number(config.bcrypt_salt_rounds)
    // );
    const newUser = yield user_model_1.default.create(userData);
    return newUser;
});
const getAllUsers = (payload, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const query = {};
    if (payload.email)
        query.email = { $regex: payload.email, $options: "i" };
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const result = yield user_model_1.default.find(query)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .populate("cart");
    return {
        meta: {
            page,
            limit,
            total: result.length,
        },
        data: result,
    };
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.findOne({ _id: id }).populate("cart");
    console.log(result);
    return result;
});
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield user_model_1.default.findOne({ _id: id });
    if (!isExist) {
        throw new Apierror_1.default(404, "User not found !");
    }
    const { role } = payload, UserData = __rest(payload, ["role"]);
    console.log(payload);
    if (role) {
        throw new Apierror_1.default(500, "something went wrong. you cannot update your role");
    }
    const result = yield user_model_1.default.findOneAndUpdate({ _id: id }, UserData, {
        new: true,
    });
    console.log("result", result);
    return result;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.findOneAndDelete({ _id: id });
    return result;
});
const manageRole = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    const { role } = payload;
    console.log(role);
    const result = yield user_model_1.default.findOneAndUpdate({ _id: id }, {
        $set: {
            role: (role === "admin" && "admin") ||
                (role === "super_admin" && "super_admin") ||
                (role === "user" && "user"),
        },
    }, {
        new: true,
    });
    return result;
});
exports.UserService = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    manageRole,
};
