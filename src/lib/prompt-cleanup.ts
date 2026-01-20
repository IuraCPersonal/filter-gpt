import { scanner } from "@/services/scanner";

export interface CleanupResult {
  anonymizedText: string;
  foundIssues: string[];
}

/**
 * Cleans a text for sensitive data and returns the anonymized text and found issues.
 *
 * This function scans the text using the scanner service,
 * and returns the anonymized text and found issues.
 *
 * @param text - The text to clean.
 * @param dismissedIssues - The issues to ignore.
 * @returns The anonymized text and found issues.
 */
export const promptCleanup = (
  text: string,
  dismissedIssues: string[] = []
): CleanupResult => {
  const scanResult = scanner.scan(text, {
    ignoredValues: dismissedIssues,
  });

  return {
    anonymizedText: scanResult.anonymizedText,
    foundIssues: scanResult.matches.map((m) => m.value),
  };
};
