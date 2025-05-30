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
  if (!url) {
    return "";
  }

  return url.match(
    /^[0-9a-f]{8}-?[0-9a-f]{4}-?[1-5][0-9a-f]{3}-?[89ab][0-9a-f]{3}-?[0-9a-f]{12}$/i
  );
};

export const postToParent = (message) => {
  window.parent.postMessage(message, "*");
};

export const extractURLfromString = (text) => {
  const match = text.match(/https?:\/\/[^\s"<>]+/);

  if (!match) return null;

  // Trim trailing characters like ) or ]
  return [match[0].replace(/[)\]]+$/, "")];
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

export const getDomainName = (domain) => {
  if (!domain) {
    return "";
  }

  return domain.includes("www.")
    ? domain.split("www.")?.[1]?.split(".")?.[0]
    : domain.split(".")?.[0];
};

export function formatAMPM(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;

  return `${hours}:${minutes} ${ampm}`;
}
