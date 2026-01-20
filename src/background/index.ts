import { MessageType } from "@/config";
import { verifyMessage } from "./verify-message";

chrome.runtime.onMessage.addListener(async (message, _sender, sendResponse) => {
  if (message.type === MessageType.VerifyMessage) {
    await verifyMessage(message.message).then(sendResponse);
  }
});
