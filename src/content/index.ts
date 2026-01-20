import { MessageType } from "@/config";

// Listen for messages from the background script
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

      console.log("res", res);
    } catch (error) {
      console.error("Error verifying message", error);
    }

    window.postMessage({
      type: MessageType.ScanResponse,
      id,
      result: res,
    });

    if (res.foundIssues.length > 0) {
      // TODO: Open modal here
    }
  }
});

injectInterceptor();

async function injectInterceptor() {
  const scriptUrl = chrome.runtime.getURL("./interceptor.js");
  const script = document.createElement("script");
  script.src = scriptUrl;

  script.onload = () => {
    script.remove();
  };

  script.onerror = (error) => {
    console.error("Error loading interceptor script", error);
  };

  (document.head || document.documentElement).appendChild(script);
}
