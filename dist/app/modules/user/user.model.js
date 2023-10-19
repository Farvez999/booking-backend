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
/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../../config"));
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
    },
    dob: {
        type: String,
    },
    profileImg: {
        url: {
            type: String,
        },
        public_id: {
            type: String,
        },
    },
    gender: {
        type: String,
        enum: ["male", "female", "others"],
    },
    cart: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "room",
        },
    ],
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
    },
    phoneNumber: {
        type: Number,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ["user", "admin", "super_admin"],
        default: "user",
    },
    nationality: {
        type: String,
    },
    language: {
        type: String,
    },
    address: {
        type: String,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: function (_doc, ret) {
            delete ret.password;
            return ret;
        },
    },
});
// Create a unique index for phoneNumber field
// Check if User exists
UserSchema.methods.isUserExist = function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield User.findOne({ email }, {
            _id: 1,
            email: 1,
            password: 1,
            role: 1,
            phoneNumber: 1,
        });
    });
};
// Check password match
UserSchema.methods.isPasswordMatched = function (givenPassword, savedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(givenPassword, savedPassword);
    });
};
// Hash the password
UserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password")) {
            return next();
        }
        this.password = yield bcrypt_1.default.hash(this.password, Number(config_1.default.bcrypt_salt_rounds));
        next();
    });
});
// Statics
const User = (0, mongoose_1.model)("User", UserSchema);
exports.default = User;
