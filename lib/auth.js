import GoogleProvider from "next-auth/providers/google";
import { sql } from "./db";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/enter" },
  callbacks: {
    async jwt({ token }) {
      if (!token.pseudo && token.email) {
        try {
          const rows = await sql`SELECT pseudo FROM creators WHERE email = ${token.email}`;
          if (rows[0]) token.pseudo = rows[0].pseudo;
        } catch (e) {}
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.pseudo = token.pseudo || null;
      return session;
    },
  },
};
