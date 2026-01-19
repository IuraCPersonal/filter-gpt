console.info("content script is running");

injectInterceptor();

async function injectInterceptor() {
  const scriptUrl = chrome.runtime.getURL("./interceptor.js");
  console.log("scriptUrl", scriptUrl);

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
