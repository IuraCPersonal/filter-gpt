import { ISSUES_STORAGE_KEY } from "@/config";
import type { Issue } from "@/services/issues";

class Storage {
  private static instance: Storage;

  // get issues from storage
  async getIssues(): Promise<Issue[]> {
    try {
      const result = await chrome.storage.local.get(ISSUES_STORAGE_KEY);
      return (result[ISSUES_STORAGE_KEY] as Issue[] | null) || [];
    } catch (error) {
      console.error("Error getting issues from storage", error);
      return [];
    }
  }

  // set issues to storage
  async setIssues(issues: Issue[]) {
    try {
      await chrome.storage.local.set({ [ISSUES_STORAGE_KEY]: issues });
    } catch (error) {
      console.error("Error setting issues to storage", error);
    }
  }

  // add issue to storage
  async addIssue(value: string, context?: string) {
    const issues = await this.getIssues();

    const existingIssue = issues.find(
      (i) => i.value.toLowerCase() === value.toLowerCase()
    );
    if (existingIssue) return;

    const newIssue: Issue = {
      id: Math.random().toString(36).substring(2, 15),
      value,
      context,
      isActive: true,
      detectedAt: Date.now(),
    };

    issues.push(newIssue);

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
