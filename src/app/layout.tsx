import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/components/NextAuthProvider";
import "react-toastify/dist/ReactToastify.css";
import { Flip, ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KuyAnime",
  description: "Generated by KuyAnime",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-gray-100/75 ${inter.className}`}
        suppressHydrationWarning={true}
      >
        <NextAuthProvider>
          {children}
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Flip}
          />
        </NextAuthProvider>
      </body>
    </html>
  );
}
