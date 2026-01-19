import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.config";

// https://vite.dev/config/
export default defineConfig({
  build: {
    emptyOutDir: true,
    outDir: "dist",
    rollupOptions: {
      output: {
        chunkFileNames: "assets/chunk-[hash].js",
      },
    },
  },
  plugins: [crx({ manifest }), react(), tailwindcss()],
  server: {
    cors: {
      origin: [/chrome-extension:\/\//],
    },
  },
  legacy: {
    skipWebSocketTokenCheck: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
