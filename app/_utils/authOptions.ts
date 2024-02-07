import { NextAuthOptions } from "next-auth";
import credentialsProvider from "next-auth/providers/credentials";
import { getCsrfToken } from "next-auth/react";
import { ethers } from "ethers";
import { SiweMessage } from "siwe";
import type { SIWESession } from "@web3modal/core";

declare module "next-auth" {
  interface Session extends SIWESession {
    address: string;
    chainId: number;
  }
}

const nextAuthSecret = `${process.env.NEXTAUTH_SECRET}`;
if (!nextAuthSecret) {
  throw new Error("NEXTAUTH_SECRET is not set");
}
// Get your projectId on https://cloud.walletconnect.com
const projectId = `${process.env.NEXT_PUBLIC_PROJECT_ID}`;
if (!projectId) {
  throw new Error("NEXT_PUBLIC_PROJECT_ID is not set");
}

const authOptions: NextAuthOptions = {
  providers: [
    credentialsProvider({
      name: "Ethereum",
      credentials: {
        message: {
          label: "Message",
          type: "text",
          placeholder: "0x0",
        },
        signature: {
          label: "Signature",
          type: "text",
          placeholder: "0x0",
        },
      },
      async authorize(credentials, req) {
        try {
          if (!credentials?.message) {
            throw new Error("SiweMessage is undefined");
          }
          const siwe = new SiweMessage(credentials.message);
          const provider = new ethers.JsonRpcProvider(
            // eslint-disable-next-line prettier/prettier
            `https://rpc.walletconnect.com/v1?chainId=eip155:${siwe.chainId}&projectId=${projectId}`
          );
          const nonce = await getCsrfToken({ req: { headers: req.headers } });
          const result = await siwe.verify(
            {
              signature: credentials?.signature || "",
              nonce,
            },
            // eslint-disable-next-line prettier/prettier
            { provider }
          );

          if (result.success) {
            return {
              id: `eip155:${siwe.chainId}:${siwe.address}`,
            };
          }

          return null;
        } catch (e) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (!token.sub) {
        return session;
      }

      const [, chainId, address] = token.sub.split(":");
      if (chainId && address) {
        session.address = address;
        session.chainId = parseInt(chainId, 10);
      }

      return session;
    },
  },
  secret: nextAuthSecret,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
};

export default authOptions;
