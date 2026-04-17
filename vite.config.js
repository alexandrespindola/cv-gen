import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      "/gotenberg": {
        target: "http://localhost:7777",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/gotenberg/, ""),
      },
    },
  },
});
