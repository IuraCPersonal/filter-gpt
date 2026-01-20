/**
 * Injects the interceptor script into the page.
 *
 * This function dynamically creates a <script> element,
 * sets its source to the extension's bundled interceptor.js,
 * and injects it into the document. Once loaded, the script is removed from the DOM.
 * If any error occurs during loading, it logs the error to the console.
 *
 * This allows the extension to run privileged code in the webpage context.
 */
export async function injectInterceptor() {
  const scriptUrl = chrome.runtime.getURL("./interceptor.js");
  const script = document.createElement("script");

  script.src = scriptUrl;

  script.onload = () => {
    script.remove();
  };

  script.onerror = (error) => {
    console.error("Error loading interceptor script", error);
  };

  /**
   * Appends the script to the document head or document element.
   *
   * This ensures the script is loaded and executed in the correct context.
   */
  (document.head || document.documentElement).appendChild(script);
}
