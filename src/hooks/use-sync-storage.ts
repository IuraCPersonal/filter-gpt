import { ISSUES_STORAGE_KEY } from "@/config";
import { issues, type Issue } from "@/services/issues";
import { useEffect } from "react";

/**
 * React hook to synchronize the issues state in the app with Chrome's storage.
 *
 * This hook initializes the issues store from persisted storage and
 * subscribes to chrome.storage changes for the issues key.
 * When a change to ISSUES_STORAGE_KEY occurs, it updates the issues state accordingly.
 *
 * Should be called at the root of your app to ensure data stays in sync.
 *
 * @returns {null}
 */
export function useSyncStorage() {
  useEffect(() => {
    /**
     * Initializes the issues subject from persisted storage.
     */
    issues.init();

    /**
     * Handles changes in chrome.storage and updates the issues state
     * if ISSUES_STORAGE_KEY has changed.
     *
     * @param changes - The changes object from chrome.storage.onChanged event.
     */
    const handleStorageChange = (changes: {
      [key: string]: chrome.storage.StorageChange;
    }) => {
      if (changes[ISSUES_STORAGE_KEY]) {
        issues.setIssues(changes[ISSUES_STORAGE_KEY].newValue as Issue[]);
      }
    };

    chrome.storage.onChanged.addListener(handleStorageChange);
    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange);
    };
  }, []);

  return null;
}
