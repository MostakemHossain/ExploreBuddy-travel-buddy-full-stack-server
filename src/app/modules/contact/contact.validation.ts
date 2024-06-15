import { z } from "zod";

const createContactValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email(),

    phoneNumber: z.string({
      required_error: "Phone Number is required",
    }),
    message: z.string({
      required_error: "Message is required",
    }),
  }),
});

export const contactValidation = {
  createContactValidationSchema,
};
