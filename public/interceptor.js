// This is a script that will be injected into the page to intercept the requests and responses
(function () {
  if (window.interceptor) return;
  window.interceptor = true;

  const originalFetch = window.fetch;

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
        const requestId = Math.random().toString(36).substring(2, 15);

        // Send scan request to content script
        window.postMessage({
          id: requestId,
          type: "scan-request",
          text: userMessage,
        });

        const response = await Promise.race([
          new Promise((resolve) => {
            const handler = (e) => {
              if (
                e.source === window &&
                e.data.type === "scan-response" &&
                e.data.id === requestId
              ) {
                window.removeEventListener("message", handler);
                resolve(e.data.result);
              }
            };
            window.addEventListener("message", handler);
          }),

          new Promise((resolve) => setTimeout(() => resolve(null), 2500)),
        ]);

        if (response.anonymizedText) {
          body.messages[0].content.parts[0] = response.anonymizedText;
          options.body = JSON.stringify(body);
        }
      }
    }

    return originalFetch.apply(this, args);
  };
})();
