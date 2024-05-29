import { z } from "zod";

const createTravelValidationSchema = z.object({
  body: z.object({
    userId: z.string({
      required_error: "userId is required",
    }),
  }),
});
export const travelValidation = {
  createTravelValidationSchema,
};
