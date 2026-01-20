import { ISSUES_STORAGE_KEY } from "@/config";
import type { Issue } from "@/services/issues";

/**
 * Storage - Chrome storage wrapper for issues.
 *
 * This class provides methods to get and set issues from Chrome's storage.
 * It uses the ISSUES_STORAGE_KEY to store and retrieve the issues.
 */
class Storage {
  private static instance: Storage;

  /**
   * Gets issues from storage.
   *
   * @returns The issues.
   */
  async getIssues(): Promise<Issue[]> {
    try {
      const issues = await chrome.storage.local.get(ISSUES_STORAGE_KEY);
      return (issues[ISSUES_STORAGE_KEY] as Issue[] | null) || [];
    } catch (error) {
      console.error("Error getting issues from storage", error);
      return [];
    }
  }

  /**
   * Sets issues to storage.
   *
   * @param issues - The issues to set.
   */
  async setIssues(issues: Issue[]) {
    try {
      await chrome.storage.local.set({ [ISSUES_STORAGE_KEY]: issues });
    } catch (error) {
      console.error("Error setting issues to storage", error);
    }
  }

  /**
   * Adds an issue to storage.
   *
   * @param value - The value of the issue.
   * @param context - The context of the issue.
   */
  async addIssue(value: string, context?: string) {
    const issues = await this.getIssues();

    const existingIssue = issues.find(
      (i) => i.value.toLowerCase() === value.toLowerCase()
    );

    if (existingIssue) return;

    const id = Math.random().toString(36).substring(2, 15);
    const detectedAt = Date.now();

    const newIssue: Issue = {
      id,
      value,
      context,
      isActive: true,
      detectedAt,
    };

    // issues.push(newIssue);
    issues.unshift(newIssue);

    await this.setIssues(issues);
  }

  /* static utilities */

  private constructor() {}

  static getInstance() {
    if (!Storage.instance) {
      Storage.instance = new Storage();
    }
    return Storage.instance;
  }
}

export const storage = Storage.getInstance();
