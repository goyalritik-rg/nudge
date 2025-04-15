import GLOBAL_CONSTANTS from "@/constants";
import { z } from "zod";

export const AddDomainSchema = z.object({
  domain: z
    .string()
    .min(4, { message: "A domain must have atleast 3 characters" })
    .refine(
      (value) =>
        /^((?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,3}$/.test(value ?? ""),
      "This is not a valid domain"
    ),
  image: z
    .any()
    .refine(
      (files) => files?.[0]?.size <= GLOBAL_CONSTANTS.uploader.max_upload_size,
      {
        message: "Your file size must be less then 2MB",
      }
    )
    .refine(
      (files) =>
        GLOBAL_CONSTANTS.uploader.accepted_file_types.includes(
          files?.[0]?.type
        ),
      {
        message: "Only JPG, JPEG & PNG are accepted file formats",
      }
    ),
});
