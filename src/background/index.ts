import { extractEmail } from "@/lib/extract-email";
import { issues } from "@/services/issues";

console.log("background is running");

chrome.runtime.onMessage.addListener((request) => {
  if (request.type === "VERIFY_MSG") {
    verifyMessage(request.message);
  }
});

async function verifyMessage(message: string) {
  try {
    if (!message) return false;

    const email = extractEmail(message);
    if (!email) return false;

    await issues.addIssue(email, message);
  } catch (error) {
    console.error("Error verifying message", error);
    return false;
  }
}
