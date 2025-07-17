import NextAuth, { type DefaultSession, type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

// 👇 Type augmentation
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      name: string;
      phone: string;
      email: string;
      role: "ADMIN";
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    name: string;
    phone: string;
    email: string;
    role: "ADMIN";
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id: string;
    name: string;
    phone: string;
    email: string;
    role: "ADMIN";
  }
}

const config: NextAuthConfig = {
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        phone: { label: "Phone", type: "text" },
        name: { label: "Name", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { phone, password } = credentials ?? {};
        if (!phone || !password) return null;

        const admin = await prisma.admin.findFirst({
          where: { phone: { contains: phone as string } },
        });

        if (!admin) return null;

        const isValid = await bcrypt.compare(
          password as string,
          admin.password
        );
        if (!isValid) return null;

        return {
          id: admin.id,
          name: admin.name,
          phone: admin.phone,
          email: admin.email,
          role: admin.role,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          name: token.name,
          phone: token.phone,
          email: token.email,
          role: token.role,
          emailVerified: null,
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.phone = user.phone;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
