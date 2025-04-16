import GLOBAL_CONSTANTS from "@/constants";
import { z } from "zod";

export const ConversationSearchSchema = z.object({
  query: z.string().min(1, { message: "You must entery a search query" }),
  domain: z.string().min(1, { message: "You must select a domain" }),
});

export const ChatBotMessageSchema = z
  .object({
    content: z
      .string()
      .min(1)
      .optional()
      .or(z.literal("").transform(() => undefined)),
    image: z.any().optional(),
  })
  .refine((schema) => {
    if (schema.image?.length) {
      if (
        GLOBAL_CONSTANTS.uploader.accepted_file_types.includes(
          schema.image?.[0]?.name?.split(".")?.pop()
        ) &&
        schema.image?.[0].size <= GLOBAL_CONSTANTS.uploader.max_upload_size
      ) {
        return true;
      }
    }
    if (!schema.image?.length) {
      return true;
    }
  });
