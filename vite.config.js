import react from "@vitejs/plugin-react";
import path from "path";

import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "192.168.1.165", // Remplacez par l'adresse IP souhaitée
    port: 3000, // Vous pouvez changer le port si nécessaire
  },
});
