"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { disconnect } from "wagmi/actions";

const Home = () => {
  const [mounted, setMounted] = useState(false);
  const { address, isConnected } = useAccount();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && isConnected && (
        <main className="bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
          <div className="flex w-full items-center justify-center">
            <div className="flex h-screen w-[800px] flex-col overflow-x-clip overflow-y-scroll">
              <div className="px-5 py-3 text-2xl font-bold">My Account</div>
              <div className="p-5">
                <h2 className="mb-4 text-left text-base font-medium">
                  Custom Button
                </h2>
                <div className="mb-2">My Address : {address}</div>
                <button
                  className="w-48 h-12 rounded-md text-zinc-50 bg-[#4F46E5] hover:bg-[#4338CA] transition-colors duration-300"
                  onClick={async () => {
                    await disconnect();
                  }}
                  type="button"
                >
                  Logout
                </button>
              </div>
              <div className="h-[1px] rounded-full bg-zinc-300 dark:bg-zinc-700" />
              <div className="p-5">
                <h2 className="mb-4 text-left text-base font-medium">
                  Default Button
                </h2>
                <w3m-button />
                <div className="h-4" />
                <w3m-network-button />
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default Home;
