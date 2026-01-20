import { scanner, type ScanResult } from "@/services/scanner";

export interface CleanupResult {
  anonymizedText: string;
  foundIssues: string[];
}

export const promptCleanup = (
  text: string,
  dismissedIssues: string[] = []
): CleanupResult => {
  const result: ScanResult = scanner.scan(text, {
    ignoredValues: dismissedIssues,
  });

  return {
    anonymizedText: result.anonymizedText,
    foundIssues: result.matches.map((m) => m.value),
  };
};
