import { MessageType } from "@/config";
import { injectIframeModal } from "@/lib/inject-iframe-modal";
import { injectInterceptor } from "@/lib/inject-interceptor";

/**
 * Listens for messages from the background script and processes them.
 *
 * This event listener handles the scan request message,
 * verifies the message using the background service,
 * and injects the iframe modal if issues are found.
 */
window.addEventListener("message", async (event) => {
  if (event.source !== window) return;

  if (event.data.type === MessageType.ScanRequest) {
    const { id, text } = event.data;

    let res = {
      anonymizedText: text,
      foundIssues: [],
    };

    try {
      res = await chrome.runtime.sendMessage({
        type: MessageType.VerifyMessage,
        message: text,
      });
    } catch (error) {
      console.error("Error verifying message", error);
    }

    window.postMessage({
      type: MessageType.ScanResponse,
      id,
      result: res,
    });

    if (res?.foundIssues?.length > 0) {
      injectIframeModal();
    }
  }
});

/**
 * Injects the interceptor script into the page.
 */
injectInterceptor();
