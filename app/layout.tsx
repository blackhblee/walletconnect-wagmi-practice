import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Web3Modal } from "./_components/Web3Modal";
import NextAuthSessionProvider from "./_providers/NextAuthSessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "walletconnect-wagmi-practice",
  description: "walletconnect-wagmi-practice",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthSessionProvider>
          <Web3Modal>{children}</Web3Modal>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
