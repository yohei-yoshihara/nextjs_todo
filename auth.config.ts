import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      console.log("nextUrl.pathname = ", nextUrl.pathname);
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      if (isOnDashboard) {
        if (isLoggedIn) {
          console.log("authorized => true");
          return true;
        }
        console.log("authorized => false");
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        console.log("authorized => redirect");
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },
  },
} satisfies NextAuthConfig;
