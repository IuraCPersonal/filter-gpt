/**
 * Injects an iframe modal into the page.
 *
 * This function creates a centered overlay with an iframe,
 * and a close button. The iframe is styled to match the extension's UI.
 *
 * @returns {void}
 */
export function injectIframeModal() {
  const src = chrome.runtime.getURL("../../index.html");
  // Create a centered overlay
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100vw";
  overlay.style.height = "100vh";
  overlay.style.display = "flex";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";
  overlay.style.zIndex = "999999";
  overlay.style.background = "rgba(0,0,0,0.20)";

  // Create the iframe
  const iframe = document.createElement("iframe");
  iframe.className = "crx";
  iframe.src = src;
  iframe.style.width = "420px";
  iframe.style.height = "650px";
  iframe.style.border = "none";
  iframe.style.borderRadius = "16px";
  iframe.style.boxShadow = "0 8px 32px rgba(0,0,0,0.12)";
  iframe.style.background = "#f8fafc";

  // Add close button
  const closeBtn = document.createElement("button");
  closeBtn.innerText = "×";
  closeBtn.setAttribute("aria-label", "Close");
  closeBtn.style.position = "absolute";
  closeBtn.style.top = "22px";
  closeBtn.style.right = "28px";
  closeBtn.style.fontSize = "2rem";
  closeBtn.style.color = "#555";
  closeBtn.style.background = "transparent";
  closeBtn.style.border = "none";
  closeBtn.style.cursor = "pointer";
  closeBtn.style.zIndex = "1000001";
  closeBtn.addEventListener("click", () => {
    overlay.remove();
  });

  overlay.appendChild(iframe);
  overlay.appendChild(closeBtn);

  document.body.appendChild(overlay);
}
