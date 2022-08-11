import { resolve } from "path";
import react from "@vitejs/plugin-react";
import glob from "glob";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: [
        ...glob.sync(resolve(__dirname, "original", "*.html")),
        ...glob.sync(resolve(__dirname, "reinvent", "*.html")),
      ],
    },
  },
});
