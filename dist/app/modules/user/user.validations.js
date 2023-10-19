"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const cartSchema = zod_1.z.string();
const create = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "name is required",
        }),
        email: zod_1.z.string({
            required_error: "email is required",
        }),
        phone: zod_1.z
            .string({
            required_error: "phone is required",
        })
            .min(11),
        dob: zod_1.z.string().optional(),
        profileImg: zod_1.z
            .object({
            url: zod_1.z.string(),
            public_id: zod_1.z.string(),
        })
            .optional(),
    }),
    gender: zod_1.z.enum(["male", "female", "others"]).optional(),
    cart: zod_1.z.array(cartSchema).optional(),
    password: zod_1.z.string({
        required_error: "password is required",
    }),
    role: zod_1.z.enum(["user", "admin", "super_admin"]).optional(),
    preferences: zod_1.z.object({
        nationality: zod_1.z.string().optional(),
        language: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        email: zod_1.z.string().optional(),
        phone: zod_1.z.string().optional(),
        dob: zod_1.z.string().optional(),
        profileImg: zod_1.z
            .object({
            url: zod_1.z.string().optional(),
            public_id: zod_1.z.string().optional(),
        })
            .optional(),
    }),
    gender: zod_1.z.enum(["male", "female", "others"]).optional(),
    cart: zod_1.z.array(cartSchema).optional(),
    password: zod_1.z.string().optional(),
    role: zod_1.z.enum(["user", "admin", "super_admin"]).optional(),
    preferences: zod_1.z.object({
        nationality: zod_1.z.string().optional(),
        language: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
    }),
});
const loginZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: "Email is required",
        }),
        password: zod_1.z.string({
            required_error: "Password is required",
        }),
    }),
});
const refreshTokenZodSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: "Refresh Token is required",
        }),
    }),
});
exports.UserValidation = {
    create,
    update,
    loginZodSchema,
    refreshTokenZodSchema,
};
