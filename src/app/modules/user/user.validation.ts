import { z } from "zod";

const createUserValidationSchema = z.object({
  name: z.string({
    required_error: "Name field is required.",
  }),
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
});
const updateUserValidationSchema = z.object({
  name: z.string({}).optional(),
  email: z.string().email({}).optional(),
  
});

export const userValidation = {
  createUserValidationSchema,
  updateUserValidationSchema,
};
