"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidation = void 0;
const zod_1 = require("zod");
const createUserLoginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
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
    }),
});
exports.authValidation = {
    createUserLoginValidationSchema,
};
