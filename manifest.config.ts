import { defineManifest } from "@crxjs/vite-plugin";

import packageJson from "./package.json";

const { version } = packageJson;

export default defineManifest({
  version,
  manifest_version: 3,
  name: "Filter GPT",
  permissions: ["storage"],

  action: {
    default_title: "Filter GPT",
    default_popup: "index.html",
  },

  background: {
    service_worker: "src/background/index.ts",
    type: "module",
  },

  content_scripts: [
    {
      js: ["src/content/index.ts"],
      matches: ["*://*.openai.com/*", "*://*.chatgpt.com/*"],
    },
  ],

  web_accessible_resources: [
    {
      resources: ["interceptor.js"],
      matches: ["*://*.openai.com/*", "*://*.chatgpt.com/*"],
    },
    {
      resources: ["index.html"],
      matches: ["*://*.openai.com/*", "*://*.chatgpt.com/*"],
    },
  ],
});
