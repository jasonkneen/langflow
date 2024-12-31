import react from "@vitejs/plugin-react-swc";
import { defineConfig, loadEnv } from "vite";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";
import {
  API_ROUTES,
  BASENAME,
  PORT,
  PROXY_TARGET,
} from "./src/customization/config-constants";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const apiRoutes = API_ROUTES || ["^/api/v1/", "/health"];

  const target =
    env.VITE_PROXY_TARGET || PROXY_TARGET || "http://127.0.0.1:8000";

  const port = Number(env.VITE_PORT) || PORT || 5173;
  const host = "0.0.0.0";

  const proxyTargets = apiRoutes.reduce((proxyObj, route) => {
    proxyObj[route] = {
      target: target,
      changeOrigin: true,
      secure: false,
      ws: true,
    };
    return proxyObj;
  }, {});

  return {
    base: BASENAME || "",
    build: {
      outDir: "build",
    },
    define: {
      "process.env.BACKEND_URL": JSON.stringify(import.meta.env.VITE_BACKEND_URL ?? ""),
      "process.env.ACCESS_TOKEN_EXPIRE_SECONDS": JSON.stringify(
        import.meta.env.VITE_ACCESS_TOKEN_EXPIRE_SECONDS ?? 3600
      ),
      "process.env.CI": JSON.stringify(import.meta.env.VITE_CI ?? false),
    },
    plugins: [react(), svgr(), tsconfigPaths()],
    server: {
      host: host,
      port: port,
      proxy: {
        ...proxyTargets,
      },
    },
  };
});
