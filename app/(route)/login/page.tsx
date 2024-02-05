"use client";

import { useWeb3Modal, useWeb3ModalState } from "@web3modal/wagmi/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAccount } from "wagmi";

const LoginPage = () => {
  const router = useRouter();
  const modal = useWeb3Modal();
  const state = useWeb3ModalState();
  const { isConnected } = useAccount();

  useEffect(() => {
    if (isConnected) {
      router.push("/");
    }
  }, [isConnected, router]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
      <div className="fixed left-1/2 top-1/2 flex w-full max-w-[500px] -translate-x-1/2 -translate-y-1/2 flex-col rounded-lg bg-zinc-200 p-6 dark:bg-zinc-800">
        <h1 className="text-left text-2xl font-bold">Login</h1>
        <h2 className="mt-4 text-left text-base font-medium">Custom Button</h2>
        <button
          className={`text-zinc-50 bg-[#4F46E5] hover:bg-[#4338CA] transition-colors duration-300 mt-3 w-full rounded-lg px-4 py-3 text-center text-lg ${state.open && "bg-zinc-300 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300"}`}
          type="button"
          onClick={() => modal.open()}
          disabled={state.open}
        >
          {state.open ? "Connecting..." : "Connect"}
        </button>
        <div className="mt-6 h-[1px] rounded-full bg-zinc-300 dark:bg-zinc-700" />
        <h2 className="my-4 text-left text-base font-medium">Default Button</h2>
        <w3m-button />
      </div>
    </div>
  );
};

export default LoginPage;
