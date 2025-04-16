import GLOBAL_CONSTANTS from "@/constants";
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

export const extractUUIDFromString = (url) => {
  return url.match(
    /^[0-9a-f]{8}-?[0-9a-f]{4}-?[1-5][0-9a-f]{3}-?[89ab][0-9a-f]{3}-?[0-9a-f]{12}$/i
  );
};

export const postToParent = (message) => {
  window.parent.postMessage(message, "*");
};

export const extractURLfromString = (url) => {
  return url.match(/https?:\/\/[^\s"<>]+/);
};

export const extractEmailsFromString = (text) => {
  return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi);
};

export const getMonthName = (month) => {
  if (!month) {
    return "";
  }

  return GLOBAL_CONSTANTS.constants.months[month];
};
