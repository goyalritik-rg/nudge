import { clsx } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const copyToClipboard = async ({ text, successMessage = "" }) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success(successMessage || "Copied to clipboard!");
  } catch (error) {
    toast.error(error?.message || "Cannot copy!");
  }
};
