"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.travelValidation = void 0;
const zod_1 = require("zod");
const createTravelValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({
            required_error: "userId is required",
        }),
    }),
});
exports.travelValidation = {
    createTravelValidationSchema,
};
