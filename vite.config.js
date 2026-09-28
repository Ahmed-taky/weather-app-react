import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      "beadlike-luculently-kandra.ngrok-free.dev",
      ".ngrok-free.dev",
    ],
  },
});
