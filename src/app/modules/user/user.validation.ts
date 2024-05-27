import { z } from "zod";

const createUserValidationSchema = z.object({
  body: z.object({
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
    profile: z.object({
      bio: z.string({
        required_error: "Bio is required.",
      }),
      age: z
        .number({
          required_error: "Age is Required",
        })
        .int()
        .positive({
          message: "Age must be a positive integer.",
        }),
    }),
  }),
});

export const userValidation = {
  createUserValidationSchema,
};
