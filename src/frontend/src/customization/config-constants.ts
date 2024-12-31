export const BASENAME = "";
export const PORT = 3000;
export const PROXY_TARGET = "http://127.0.0.1:7860";
export const API_ROUTES = ["^/api/v1/", "/health"];
export const BASE_URL_API = "https://langflow-node-backend-tunnel-48v9yly3.devinapps.com/api/v1/";
export const API_AUTH = {
  username: 'user',
  password: '3064ed8d024bb7bc435bae77835ef526'
};
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
