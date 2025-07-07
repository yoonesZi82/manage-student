"use client";
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import type { Session } from "next-auth";

type Props = {
  children: React.ReactNode;
  session: Session | null;
};

function SessionProvider({ children, session }: Props) {
  return (
    <NextAuthSessionProvider session={session} refetchOnWindowFocus={false}>
      {children}
    </NextAuthSessionProvider>
  );
}

export default SessionProvider;
