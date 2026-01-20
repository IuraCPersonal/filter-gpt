import { EMAIL_REGEX } from "@/config";

export const promptCleanup = (
  text: string,
  dismissedIssues: string[]
): { anonymizedText: string; foundIssues: string[] } => {
  let anonymizedText = text;
  const foundIssues = new Set<string>();
  const matches = text.match(EMAIL_REGEX);

  if (matches) {
    matches.forEach((match) => {
      if (!dismissedIssues.includes(match.toLowerCase())) {
        foundIssues.add(match);
      }
    });

    foundIssues.forEach((issue) => {
      anonymizedText = anonymizedText.replace(issue, "[email]");
    });
  }

  return {
    anonymizedText,
    foundIssues: Array.from(foundIssues),
  };
};
