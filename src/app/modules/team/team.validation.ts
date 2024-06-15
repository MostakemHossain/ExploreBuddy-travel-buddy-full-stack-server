import { z } from "zod";

const createTeamValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    designation: z.string({
      required_error: "Designation is required",
    }),
    message: z.string({
      required_error: "Message is required",
    }),
  }),
});

export const teamValidation = {
  createTeamValidationSchema,
};
