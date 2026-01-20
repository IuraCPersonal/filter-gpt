import { promptCleanup } from "@/lib/prompt-cleanup";
import { storage } from "@/lib/storage";
import { issues, type Issue } from "@/services/issues";

export async function verifyMessage(message: string) {
  if (!message)
    return {
      anonymizedText: "",
      foundIssues: [],
    };

  const issuesData = issues.getIssues();
  const dismissedIssues = issuesData
    .filter((i: Issue) => i.dismissedUntil && i.dismissedUntil > Date.now())
    .map((i) => i.value.toLowerCase());

  const result = promptCleanup(message, dismissedIssues);

  if (result.foundIssues.length > 0) {
    for (const issue of result.foundIssues) {
      storage.addIssue(issue, message);
    }
  }

  return result;
}
