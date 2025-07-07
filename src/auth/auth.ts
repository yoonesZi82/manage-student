import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      phone: string;
      email: string;
      role: "ADMIN";
    };
  }
  interface User {
    phone: string;
    role: "ADMIN";
  }
}
declare module "next-auth" {
  interface JWT {
    id: string;
    phone: string;
    name: string;
    email: string;
    role: "ADMIN";
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        phone: {
          label: "شماره تلفن",
          type: "text",
          placeholder: "شماره تلفن خود را وارد کنید",
        },
        name: {
          label: "نام و نام خانوادگی",
          type: "text",
          placeholder: "نام و نام خانوادگی خود را وارد کنید",
        },
        email: {
          label: "ایمیل",
          type: "email",
          placeholder: "ایمیل خود را وارد کنید",
        },
        password: { label: "رمز عبور", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const { password, phone } = credentials;

          const admin = await prisma.admin.findFirst({
            where: {
              phone: {
                contains: phone as string,
              },
            },
          });

          if (!admin) {
            return null;
          }
          const isValidPassword = await bcrypt.compare(
            password as string,
            admin.password
          );
          if (!isValidPassword) {
            return null;
          }

          return {
            id: admin.id,
            name: admin.name,
            phone: admin.phone,
            email: admin.email,
            role: admin.role,
          };
        } catch {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    // redirect(params) {
    //   return new URL(params.url, params.baseUrl).href;
    // },
    session({ session, token }) {
      if (token) {
        return {
          ...session,
          user: {
            ...session.user,
            id: token.id as string,
            name: token.name as string,
            phone: token.phone as string,
            email: token.email as string,
            role: token.role as "ADMIN",
          },
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
  pages: {
    signIn: "/login",
  },
  cookies: {
    callbackUrl: {
      name: "callbackUrl",
      options: {
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
    csrfToken: {
      name: "csrfToken",
      options: {
        httpOnly: true,
        priority: "high",
        secure: process.env.NODE_ENV === "production",
      },
    },
    sessionToken: {
      name: "token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
});
