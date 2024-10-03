import { auth } from "./auth";
import {
  API_AUTH_PREFIX,
  AUTH_ROUTES,
  DEFAULT_LOGIN_REDIRECT,
  PUBLIC_ROUTES,
  PROTECTED_ROUTES,
} from "./routes";

export async function middleware(req) {
  const session = await auth();
  const { nextUrl } = req;
  const isLoggedIn = !!session?.user;
  const isapiauthprefix = nextUrl.pathname.startsWith(API_AUTH_PREFIX);
  const ispublicroutes = PUBLIC_ROUTES.includes(nextUrl.pathname);
  const isauthroutes = AUTH_ROUTES.includes(nextUrl.pathname);
  const isProtectedroute = PROTECTED_ROUTES.includes(nextUrl.pathname);
  if (!isauthroutes && !ispublicroutes && !isProtectedroute) {
    return null; // Allow the request to proceed normally
  }
  // If it's an API auth request, allow it
  if (isapiauthprefix) {
    return null;
  }

  // For auth routes (login, signup, etc.)
  if (isauthroutes) {
    if (isLoggedIn) {
      // Avoid redirect loop by ensuring we're not redirecting to the same route
      if (nextUrl.pathname !== DEFAULT_LOGIN_REDIRECT) {
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
      }
      return null;
    }

    // Handle /verify-email route with token validation
    if (
      nextUrl.pathname === "/verify-email" ||
      nextUrl.pathname === "/reset-password"
    ) {
      const token = nextUrl.searchParams.get("token");
      if (!token) {
        return Response.redirect(new URL("/error", nextUrl));
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/check-verify-token?token=${token}&path=${nextUrl.pathname}`
      );
      const data = await response.json();
      if (data.error) {
        return Response.redirect(new URL("/error", nextUrl));
      }
      return null;
    }

    return null;
  }

  // If not logged in and trying to access a protected route, redirect to login
  if (!isLoggedIn && !ispublicroutes) {
    if (nextUrl.pathname !== "/login") {
      return Response.redirect(new URL("/login", nextUrl));
    }
    return null;
  }

  return null;
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
