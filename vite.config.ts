import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/currency-radar-by/",
  plugins: [react()],
  server: {
    port: 1234,
  },
});
