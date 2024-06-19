"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const createUserValidationSchema = zod_1.z.object({
    name: zod_1.z.string({
        required_error: "Name field is required.",
    }),
    email: zod_1.z.string().email({
        message: "Email must be a valid email address.",
    }),
    password: zod_1.z
        .string({
        required_error: "Password is required.",
    })
        .min(1, {
        message: "Password is Required",
    }),
});
const updateUserValidationSchema = zod_1.z.object({
    name: zod_1.z.string({}).optional(),
    email: zod_1.z.string().email({}).optional(),
});
exports.userValidation = {
    createUserValidationSchema,
    updateUserValidationSchema,
};
