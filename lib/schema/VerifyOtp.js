import { z } from "zod";

export const VerifyOtpFormSchema = z.object({
  otp: z
    .string()
    .min(6, { message: "Email must be at least 6 characters." }),
});
