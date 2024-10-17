import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUser } from "@/app/lib/data";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";

export const BASE_PATH = "/api/auth";

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },
  },
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials) {
          return null;
        }
        const username = credentials.username as string;
        const password = credentials.password as string;
        console.log(
          `authorize, username = ${username}, password = ${password}`
        );

        const user = await getUser(username);
        console.log("user = ", user);
        if (!user) {
          console.error("ERROR: no user found");
          return null;
        }
        if (!(await bcrypt.compare(password, user.password))) {
          console.error("ERROR: wrong password");
          return null;
        }
        return {
          id: `${user.id}`,
          name: user.username,
        };
      },
    }),
  ],
});
