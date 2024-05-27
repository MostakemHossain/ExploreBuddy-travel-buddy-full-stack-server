import { z } from "zod";

const createUserLoginValidationSchema = z.object({
  body: z.object({
    email: z.string().email({
      message: "Email must be a valid email address.",
    }),
    password: z
      .string({
        required_error: "Password is required.",
      })
      .min(1, {
        message: "Password is Required",
      }),
  }),
});

export const authValidation = {
  createUserLoginValidationSchema,
};
