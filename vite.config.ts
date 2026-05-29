import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

function apiProxyTarget(mode: string): string {
  const env = loadEnv(mode, process.cwd(), "");
  // VITE_API_PROXY=worker → Cloudflare Worker (npm run worker:dev on :8787)
  // default / php → PHP API (npm run server on :3001)
  return env.VITE_API_PROXY === "worker" ? "http://127.0.0.1:8787" : "http://127.0.0.1:3001";
}

function apiProxyConfigure(mode: string) {
  return {
    target: apiProxyTarget(mode),
    changeOrigin: true,
    configure: (proxy: { on: (event: string, handler: (proxyRes: { headers: Record<string, string | string[] | undefined> }) => void) => void }) => {
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
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
    proxy: {
      "/api": apiProxyConfigure(mode),
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
      "/api": apiProxyConfigure(mode),
    },
  },
}));
