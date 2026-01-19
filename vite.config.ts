import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.config";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), crx({ manifest }), tailwindcss()],
  server: {
    cors: {
      origin: [/chrome-extension:\/\//],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
