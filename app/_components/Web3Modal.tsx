"use client";

import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";

import { WagmiConfig } from "wagmi";
import { arbitrum, mainnet } from "viem/chains";
import { siweConfig } from "../_utils/siweUtils";

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = `${process.env.NEXT_PUBLIC_PROJECT_ID}`;

// 2. Create wagmiConfig
const metadata = {
  name: "walletconnect-wagmi-practice",
  description: "walletconnect-wagmi-practice",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [mainnet, arbitrum];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

// 3. Create modal
createWeb3Modal({
  siweConfig,
  wagmiConfig,
  projectId,
  chains,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

export const Web3Modal = ({ children }: { children: React.ReactNode }) => {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
};
