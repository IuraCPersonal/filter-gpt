// Log the content script is running
console.info("[Filter GPT] Content script is running");

// Listen for messages from the background script
window.addEventListener("message", async (event) => {
  if (event.source !== window) return;

  if (event.data.type === "USER_MESSAGE") {
    const { id, text } = event.data;
    showApprovalModal(id, text);
  }

  if (event.data.type === "USER_MESSAGE") {
    console.log("[Filter GPT] User message received", event.data);

    const { text } = event.data;

    try {
      await chrome.runtime.sendMessage({
        type: "VERIFY_MSG",
        message: text,
      });
    } catch (error) {
      console.error("[Filter GPT] Error verifying message", error);
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

function showApprovalModal(requestId: string, messageText: string) {
  // Create container for shadow DOM
  const container = document.createElement("div");
  container.id = `lasso-modal-${requestId}`;
  document.body.appendChild(container);

  const shadow = container.attachShadow({ mode: "closed" });

  const handleResponse = (approved: boolean) => {
    window.postMessage({
      type: "USER_RESPONSE",
      id: requestId,
      approved,
    });
    container.remove();
  };

  shadow.innerHTML = `
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      .overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(4px);
        z-index: 2147483647;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        animation: fadeIn 0.15s ease-out;
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(20px) scale(0.95);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      .modal {
        background: #1a1a1a;
        border: 1px solid #333;
        border-radius: 16px;
        width: 90%;
        max-width: 520px;
        max-height: 80vh;
        display: flex;
        flex-direction: column;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        animation: slideUp 0.2s ease-out;
      }

      .header {
        padding: 20px 24px;
        border-bottom: 1px solid #333;
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .icon {
        width: 40px;
        height: 40px;
        background: linear-gradient(135deg, #f59e0b, #d97706);
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .icon svg {
        width: 22px;
        height: 22px;
        color: white;
      }

      .header-text h2 {
        font-size: 16px;
        font-weight: 600;
        color: #fff;
        margin-bottom: 2px;
      }

      .header-text p {
        font-size: 13px;
        color: #888;
      }

      .content {
        padding: 20px 24px;
        overflow-y: auto;
        flex: 1;
      }

      .label {
        font-size: 12px;
        font-weight: 500;
        color: #888;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 10px;
      }

      .message-box {
        background: #0d0d0d;
        border: 1px solid #2a2a2a;
        border-radius: 10px;
        padding: 16px;
        font-size: 14px;
        line-height: 1.6;
        color: #e5e5e5;
        max-height: 200px;
        overflow-y: auto;
        white-space: pre-wrap;
        word-break: break-word;
      }

      .actions {
        padding: 16px 24px 20px;
        display: flex;
        gap: 12px;
        justify-content: flex-end;
      }

      button {
        padding: 10px 20px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.15s ease;
        border: none;
        outline: none;
      }

      button:focus-visible {
        box-shadow: 0 0 0 2px #1a1a1a, 0 0 0 4px #3b82f6;
      }

      .btn-deny {
        background: #2a2a2a;
        color: #fff;
        border: 1px solid #404040;
      }

      .btn-deny:hover {
        background: #333;
        border-color: #505050;
      }

      .btn-approve {
        background: linear-gradient(135deg, #22c55e, #16a34a);
        color: white;
      }

      .btn-approve:hover {
        background: linear-gradient(135deg, #16a34a, #15803d);
      }
    </style>

    <div class="overlay">
      <div class="modal" role="dialog" aria-labelledby="modal-title" aria-describedby="modal-desc">
        <div class="header">
          <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div class="header-text">
            <h2 id="modal-title">Request Intercepted</h2>
            <p>Review the message before sending</p>
          </div>
        </div>

        <div class="content">
          <div class="label">Message Content</div>
          <div class="message-box" id="modal-desc">${escapeHtml(
            messageText
          )}</div>
        </div>

        <div class="actions">
          <button class="btn-deny" type="button">Block</button>
          <button class="btn-approve" type="button">Approve</button>
        </div>
      </div>
    </div>
  `;

  // Add event listeners
  const denyBtn = shadow.querySelector(".btn-deny");
  const approveBtn = shadow.querySelector(".btn-approve");
  const overlay = shadow.querySelector(".overlay");

  denyBtn?.addEventListener("click", () => handleResponse(false));
  approveBtn?.addEventListener("click", () => handleResponse(true));

  // Close on overlay click (outside modal)
  overlay?.addEventListener("click", (e) => {
    if (e.target === overlay) {
      handleResponse(false);
    }
  });

  // Close on Escape key
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      handleResponse(false);
      document.removeEventListener("keydown", handleKeyDown);
    }
  };
  document.addEventListener("keydown", handleKeyDown);

  // Focus the approve button for accessibility
  (approveBtn as HTMLButtonElement)?.focus();
}

function escapeHtml(text: string): string {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}
