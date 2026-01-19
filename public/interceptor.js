// This is a script that will be injected into the page to intercept the requests and responses

(function () {
  console.log("interceptor.js is running");

  // Check if the interceptor is already running
  if (window.interceptor) return;
  window.interceptor = true;

  const originalFetch = window.fetch;

  window.fetch = async (...args) => {
    const [url, options] = args;

    console.log("fetching", url, options);

    // return originalFetch(...args);
    return originalFetch.apply(this, args);
  };

  console.log("fetch is now intercepted");
})();
