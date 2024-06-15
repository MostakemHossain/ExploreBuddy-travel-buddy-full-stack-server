import { z } from "zod";

const createTeamValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    designation: z.string({
      required_error: "Designation is required",
    }),
  }),
});

export const teamValidation = {
  createTeamValidationSchema,
};
