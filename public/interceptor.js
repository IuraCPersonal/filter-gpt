// This is a script that will be injected into the page to intercept the requests and responses

(function () {
  console.log("[Interceptor] Script is running");
  if (window.interceptor) return;
  window.interceptor = true;

  const originalFetch = window.fetch;
  const pendingRequests = new Map();

  // Listen for approval/denial from content script
  window.addEventListener("message", (event) => {
    if (event.source !== window || event.data?.type !== "USER_RESPONSE") return;

    const resolver = pendingRequests.get(event.data.id);
    if (resolver) {
      resolver(event.data.approved);
      pendingRequests.delete(event.data.id);
    }
  });

  window.fetch = async (...args) => {
    const [url, options] = args;

    if (
      typeof url === "string" &&
      url.includes("/conversation") &&
      options?.method === "POST" &&
      options?.body
    ) {
      const body = JSON.parse(options.body);
      const userMessage = body.messages?.[0]?.content?.parts?.[0];

      if (userMessage) {
        const requestId = Math.random().toString(36).substr(2, 9);

        window.postMessage({
          type: "USER_MESSAGE",
          id: requestId,
          text: userMessage,
        });

        // Block until content script responds
        const approved = await new Promise((resolve) => {
          pendingRequests.set(requestId, resolve);
        });

        if (!approved) {
          return new Response(JSON.stringify({ blocked: true }), {
            status: 403,
            headers: { "Content-Type": "application/json" },
          });
        }
      }
    }

    return originalFetch.apply(this, args);
  };

  console.log("fetch is now intercepted");
})();
