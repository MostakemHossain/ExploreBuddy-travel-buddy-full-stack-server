import { z } from "zod";

const createTravelValidationSchema = z.object({
  body: z.object({
    userId: z
      .string({
        required_error: "userId is required",
      })
      .optional(),
  }),
});
export const travelValidation = {
  createTravelValidationSchema,
};
