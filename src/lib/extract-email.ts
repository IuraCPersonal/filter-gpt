import { EMAIL_REGEX } from "@/config/constants";

export const extractEmails = (text: string): string => {
  const matches = text.match(EMAIL_REGEX);
  return [...new Set(matches ?? [])].join(", ");
};
