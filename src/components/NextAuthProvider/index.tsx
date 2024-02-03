"use client";

import { SessionProvider } from "next-auth/react";
import { FunctionComponent, ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";

const authRoutes = ["/login"];

const NextAuthProvider: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  const pathname = usePathname();
  return (
    <SessionProvider>
      {!authRoutes.includes(pathname) && <Navbar />}
      {children}
      {!authRoutes.includes(pathname) && <Footer />}
    </SessionProvider>
  );
};

export default NextAuthProvider;
