import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { CredentialsSignin } from "next-auth";
import { jwtDecode } from "jwt-decode";
class InvalidLoginError extends CredentialsSignin {
  constructor(msg) {
    super();
    this.code = msg;
    this.stack = undefined;
  }
  //code = "Invalid identifier or password";
}
async function refreshAccessToken(token) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/generate-refresh-tokens`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.refreshToken}`, // Use refreshToken to get new tokens
        },
      }
    );

    const refreshedTokens = await response.json();
    if (!response.ok) throw refreshedTokens;

    return {
      ...token, // Maintain other token properties
      accessToken: refreshedTokens.accessToken,
      refreshToken: refreshedTokens.refreshToken || token.refreshToken, // Use new refreshToken or fall back to old one if not provided
      accessTokenExpires: jwtDecode(refreshedTokens.accessToken).exp * 1000, // Expiry in ms
    };
  } catch (error) {
    console.error("Error refreshing access token:", error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

const credentialsconfig = Credentials({
  name: "Credentials",
  credentials: {
    email: { label: "Email", type: "email" },
    password: { label: "Password", type: "password" },
  },
  async authorize(credentials) {
    //console.log("credentials", credentials);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/login`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      }
    );
    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      throw new InvalidLoginError(data.error.message);
      //return { status: data.error.status, error: data.error.message };
      // Return an object with error message coming from the backend
    }
    if (!data.isVerified) {
      throw new InvalidLoginError("user not verified");
      //return { message: data.message, isVerified: data.isVerified };
    }
    // If login is successful, return user data
    return {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      message: data.message,
      name: data.name,
      refreshTokenExpires: jwtDecode(data.refreshToken).exp * 1000,
    };
  },
});

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [credentialsconfig],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      // Case 1: User just logged in
      if (user) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: jwtDecode(user.accessToken).exp * 1000, // Expiry in ms
          refreshTokenExpires: user.refreshTokenExpires, // Expiry in ms
        };
      }

      // Case 2: Refresh token has expired, user needs to be logged out
      if (Date.now() > token.refreshTokenExpires) {
        return { ...token, error: "RefreshTokenExpired" };
      }

      // Case 3: Access token is still valid, return it
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Case 4: Access token expired, refresh it
      const refreshedToken = await refreshAccessToken(token);

      // Return the new token set after refresh
      return {
        ...refreshedToken, // Always ensure to return the newly refreshed token
      };
    },

    async session({ session, token }) {
      // If there's an error related to token refresh, log out the user
      if (token.error === "RefreshTokenExpired") {
        session.user = null;
        return session;
      }

      // Otherwise, update the session with the new token data
      session.user = {
        ...session.user,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        accessTokenExpires: token.accessTokenExpires,
        refreshTokenExpires: token.refreshTokenExpires,
      };

      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/error",
  },
});
