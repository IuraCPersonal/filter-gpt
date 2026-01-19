import { defineManifest } from "@crxjs/vite-plugin";

import packageJson from "./package.json";

const { version } = packageJson;

export default defineManifest({
  version,
  manifest_version: 3,
  name: "Filter GPT",
  permissions: ["storage", "unlimitedStorage"],
  action: {
    default_title: "Filter GPT",
    default_popup: "index.html",
  },
});
