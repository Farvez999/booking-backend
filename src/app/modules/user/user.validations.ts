import { z } from "zod";
const cartSchema = z.string();
const create = z.object({
  body: z.object({
    name: z.string({
      required_error: "name is required",
    }),
    email: z.string({
      required_error: "email is required",
    }),
    phone: z
      .string({
        required_error: "phone is required",
      })
      .min(11),
    dob: z.string().optional(),
    profileImg: z
      .object({
        url: z.string(),
        public_id: z.string(),
      })
      .optional(),
  }),
  gender: z.enum(["male", "female", "others"]).optional(),
  cart: z.array(cartSchema).optional(),
  password: z.string({
    required_error: "password is required",
  }),
  role: z.enum(["user", "admin", "super_admin"]).optional(),
  preferences: z.object({
    nationality: z.string().optional(),
    language: z.string().optional(),
    address: z.string().optional(),
  }),
});
const update = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    dob: z.string().optional(),
    profileImg: z
      .object({
        url: z.string().optional(),
        public_id: z.string().optional(),
      })
      .optional(),
  }),
  gender: z.enum(["male", "female", "others"]).optional(),
  cart: z.array(cartSchema).optional(),
  password: z.string().optional(),
  role: z.enum(["user", "admin", "super_admin"]).optional(),
  preferences: z.object({
    nationality: z.string().optional(),
    language: z.string().optional(),
    address: z.string().optional(),
  }),
});
const loginZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: "Email is required",
    }),
    password: z.string({
      required_error: "Password is required",
    }),
  }),
});
const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: "Refresh Token is required",
    }),
  }),
});
export const UserValidation = {
  create,
  update,
  loginZodSchema,
  refreshTokenZodSchema,
};
