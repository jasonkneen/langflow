export const BASENAME = "";
export const PORT = 5173;
export const PROXY_TARGET = import.meta.env.VITE_PROXY_TARGET || "http://localhost:8000";
export const API_ROUTES = ["^/api/v1/", "/health"];
export const BASE_URL_API = `${PROXY_TARGET}/api/v1`;
export const HEALTH_CHECK_URL = "/health_check";
export const DOCS_LINK = "https://docs.langflow.org";

export default {
  DOCS_LINK,
  BASENAME,
  PORT,
  PROXY_TARGET,
  API_ROUTES,
  BASE_URL_API,
  HEALTH_CHECK_URL,
};
