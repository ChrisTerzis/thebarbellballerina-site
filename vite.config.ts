import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
    proxy: {
      "/api": {
        // Match `npm run server` (127.0.0.1:3001); `localhost` can resolve to IPv6 and miss the PHP listener on Windows.
        target: "http://127.0.0.1:3001",
        changeOrigin: true,
        configure: (proxy) => {
          proxy.on("proxyRes", (proxyRes) => {
            const raw = proxyRes.headers["set-cookie"];
            if (!raw) return;
            const stripForDev = (cookie: string) =>
              cookie
                .split(";")
                .map((p) => p.trim())
                .filter((p) => !/^secure$/i.test(p) && !/^domain=/i.test(p))
                .join("; ");
            proxyRes.headers["set-cookie"] = Array.isArray(raw) ? raw.map(stripForDev) : stripForDev(raw);
          });
        },
      },
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  preview: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3001",
        changeOrigin: true,
        configure: (proxy) => {
          proxy.on("proxyRes", (proxyRes) => {
            const raw = proxyRes.headers["set-cookie"];
            if (!raw) return;
            const stripForDev = (cookie: string) =>
              cookie
                .split(";")
                .map((p) => p.trim())
                .filter((p) => !/^secure$/i.test(p) && !/^domain=/i.test(p))
                .join("; ");
            proxyRes.headers["set-cookie"] = Array.isArray(raw) ? raw.map(stripForDev) : stripForDev(raw);
          });
        },
      },
    },
  },
}));
