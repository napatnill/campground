/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import userLogIn from "@/lib/user/userLogIn";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (!credentials) return null;

        const user = await userLogIn(credentials.email, credentials.password);

        if (user) {
          return user;
        } else {
          return null;
        }
      }
    })
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    }
  },
  pages: {
    signIn: "/auth/login" // Redirect to your custom sign-in page
  }
};

// Initialize NextAuth with the defined options
const handler = NextAuth(authOptions);

// Export handlers for each HTTP method
export { handler as GET, handler as POST };
