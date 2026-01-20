import { MessageType } from "@/config";
import { verifyMessage } from "./verify-message";

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === MessageType.VerifyMessage) {
    verifyMessage(message.message).then(sendResponse);
    return true; // Keep message channel open for async response
  }
});
