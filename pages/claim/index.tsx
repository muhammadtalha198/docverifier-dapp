import Link from "next/link";

import { useState } from "react";

import { providers, Contract } from "ethers";

import { ABI } from "../../ABI";

import { contractAddress } from "../../contractAddress";

const provider = new providers.JsonRpcProvider(
  "https://polygon-mumbai.g.alchemy.com/v2/npciD31aUZvxiFyuIBhEToscMCcscV7B"
);
const contract = new Contract(contractAddress, ABI, provider);

const options = {
  gasPrice: 200,
  gasLimit: 2100000,
};

const Claim = () => {
  const [companyID, setCompanyID] = useState("");
  const [claimID, setClaimID] = useState(-1);
  const [productID, setProductID] = useState(-1);

  const [docArr, setdocArr] = useState<[]>([]);
  const [claimName, setClaimName] = useState("");
  const [error, setError] = useState("");

  const getClaims = async (companyID: string, claimID: number) => {
    if (
      companyID.length !== 6 ||
      claimID === -1 ||
      claimID === null ||
      productID === -1
    ) {
      setError("Invalid Input");
      setdocArr([]);
      setClaimName("");
      setClaimID(-1);
      setProductID(-1);
      return;
    }
    if (typeof window !== "undefined") {
      try {
        const metaMaskprovider = new providers.Web3Provider(
          (window as any).ethereum
        );
        const signer = metaMaskprovider.getSigner();
        const contractWithWallet = contract.connect(signer);
        const tx = await contractWithWallet.functions
          .getClaim(companyID, productID, claimID, options)
          .then((result) => {
            setdocArr(result[0]);
            setClaimName(result[1]);
            setError("");
          });
      } catch (error: any) {
        setdocArr([]);
        setClaimName("");
        setError("Some Error Occured");
      }
    }
  };

  return (
    <div>
      <div className="flex justify-end mt-5 mr-10">
        <Link href="/">
          <div
            className="
      text-center
      px-6
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
      "
          >
            Back
          </div>
        </Link>
      </div>
      <div className="flex justify-center">
        <div className="form-group flex flex-col items-center gap-6">
          <div className="text-center font-bold text-[2rem]">Get Claim</div>
          <div>
            <input
              className={`form-control block
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`}
              placeholder="*Company ID"
              onChange={(e) => setCompanyID(e.target.value.toString())}
              maxLength={6}
            />
          </div>
          <div>
            <input
              className={`form-control block
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`}
              placeholder="*Product ID"
              onChange={(e) => setProductID(Number(e.target.value))}
            />
          </div>

          <div>
            <input
              className={`form-control block
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`}
              placeholder="*Claim ID"
              onChange={(e) => setClaimID(Number(e.target.value))}
            />
          </div>

          <div className="">
            <button
              className="
      px-6
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
      ease-in-out"
              onClick={() => getClaims(companyID, claimID)}
            >
              Get Claim
            </button>
          </div>
        </div>
      </div>

      <div className="ml-80 my-10 font-bold text-[2rem]">{claimName}</div>
      <div className="text-center mb-10 font-bold text-red-600 text-[2rem]">
        {error}
      </div>
      <div className="flex flex-col gap-6 mx-80">
        {docArr.map((doc: any, index) => {
          return (
            <div
              key={index}
              className="block p-6 rounded-lg shadow-lg bg-white"
            >
              <div>
                <div className="font-semibold text-center text-[1.2rem]">{`${doc.documentName}`}</div>
                <div>{`ID: ${Number(doc.documentID)}`}</div>
                <div>{`Hash: ${doc.documentHash}`}</div>
                <div>{`Timestamp: ${Number(doc.timestamp)}`}</div>
                <div>{`Signatures: `}</div>
                {String(doc.signatures)
                  .split(",")
                  .map((sign, index) => {
                    return <div key={index}>{sign}</div>;
                  })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Claim;
