import type { Issue } from "@/services/issues";

export const ISSUES_STORAGE_KEY = "issues";

export type StorageData = {
  activeIssues: Issue[];
  historyIssues: Issue[];
};

export const DEFAULT_STORAGE_DATA: StorageData = {
  activeIssues: [],
  historyIssues: [],
};

export const EMAIL_REGEX = new RegExp(
  "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}",
  "g"
);
