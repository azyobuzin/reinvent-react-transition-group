import { resolve } from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        transition: resolve(__dirname, "transition.html"),
        "css-transition": resolve(__dirname, "css-transition.html"),
        "transition-group": resolve(__dirname, "transition-group.html"),
      },
    },
  },
});
