import { MessageType } from "@/config";
import { verifyMessage } from "./verify-message";

/**
 * Listens for messages from the content script and processes them.
 *
 * This event listener handles the verify message request,
 * verifies the message using the background service,
 * and sends the response back to the content script.
 */
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === MessageType.VerifyMessage) {
    verifyMessage(message.message).then(sendResponse);
    return true; // Keep message channel open for async response
  }
});
