export const PUBLIC_ROUTES = ["/", "/error"];
export const AUTH_ROUTES = [
  "/login",
  "/register",
  "/verify-email",
  "/forgot-password",
  "/reset-password",
];
export const PROTECTED_ROUTES = ["/settings", "/profile", "/dashboard"];
export const API_AUTH_PREFIX = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
