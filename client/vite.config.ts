import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      // use a proxy to replace all fetch request urls to the backend target url
      // This helps solve CORS issues where backend doens't think we are sending with same-site
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""), // remove /api prefix
      },
    },
  },
  build: {
    outDir: "dist",
  },
});
