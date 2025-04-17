import { z } from "zod";

export const EmailMarketingSchema = z.object({
  name: z
    .string()
    .min(3, { message: "The campaign name must be atleast 3 characters" }),
});

export const EmailMarketingBodySchema = z.object({
  description: z
    .string()
    .min(30, { message: "The body must have atleast 30 characters" }),
});
