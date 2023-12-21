import type { NextPage } from "next";

import Form from "../components/Form/Form";

import Link from "next/link";

const connectWalletExtension = () => {
  (window as any).ethereum.enable();
};

const Home: NextPage = () => {
  return (
    <div>
      <div className="flex justify-end my-5 mr-10 mx-10">
        <button
          className="
      text-center
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out
      w-[13rem]
      mr-10
      "
          onClick={() => connectWalletExtension()}
        >
          Connect With Wallet
        </button>
        <Link href="/claim">
          <div
            className="
      text-center
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out
      w-[7rem]
      "
          >
            Documents
          </div>
        </Link>
      </div>
      <div className="flex gap-4 flex-wrap">
        <Form title="Create Company" />
        <Form title="Create Product" />
        <Form title="Create Claim" />
        <Form title="Create Document" />
        <Form title="Add Signatures" />
      </div>
    </div>
  );
};

export default Home;
