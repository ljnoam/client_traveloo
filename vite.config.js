// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  server: {
    proxy: {
      "/auth": {
        target: "https://backend-traveloo.onrender.com",
        changeOrigin: true,
        secure: true,
      },
      "/favorites": {         // ← on ajoute cette ligne
        target: "https://backend-traveloo.onrender.com",
        changeOrigin: true,
        secure: true,
      },
      "/api": {
        target: "https://backend-traveloo.onrender.com",
        changeOrigin: true,
        secure: true,
      },
      // … autres proxies si besoin
    },
  },
});