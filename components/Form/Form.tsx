import { FC, useState } from "react";
import { FormProps } from "./Form.type";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

import { providers, Contract } from "ethers";
import { parseUnits } from "ethers/lib/utils";

import { ABI } from "../../ABI";

import { contractAddress } from "../../contractAddress";

const provider = new providers.JsonRpcProvider(
  "https://polygon-mumbai.g.alchemy.com/v2/npciD31aUZvxiFyuIBhEToscMCcscV7B"
);
const contract = new Contract(contractAddress, ABI, provider);

const options = {
  gasPrice: parseUnits("5.0", "gwei"),
  gasLimit: "2100000",
};

const createNewCompany = async (companyID: string, companyName: string) => {
  if (typeof window !== "undefined") {
    try {
      const metaMaskprovider = new providers.Web3Provider(
        (window as any).ethereum
      );
      const signer = metaMaskprovider.getSigner();
      const contractWithWallet = contract.connect(signer);
      const tx = await contractWithWallet.functions.createNewCompany(
        companyID,
        companyName,
        options
      );

      const wait = await tx.wait();

      wait.logs.forEach((log: any) => {});

      return true;
    } catch (error: any) {
      console.log("createNewCompany: some error occoured");
      return false;
    }
  }
};
const createNewProduct = async (companyID: string, productName: string) => {
  if (typeof window !== "undefined") {
    try {
      const metaMaskprovider = new providers.Web3Provider(
        (window as any).ethereum
      );
      const signer = metaMaskprovider.getSigner();
      const contractWithWallet = contract.connect(signer);
      const tx = await contractWithWallet.functions.createNewProduct(
        companyID,
        productName,
        options
      );

      const wait = await tx.wait();

      wait.logs.forEach((log: any) => {});

      return true;
    } catch (error: any) {
      console.log("createNewCompany: some error occoured");
      return false;
    }
  }
};

const createNewClaim = async (
  companyID: string,
  claimName: string,
  productID: number
) => {
  if (typeof window !== "undefined") {
    try {
      const metaMaskprovider = new providers.Web3Provider(
        (window as any).ethereum
      );
      const signer = metaMaskprovider.getSigner();
      const contractWithWallet = contract.connect(signer);
      const tx = await contractWithWallet.functions.createNewClaim(
        companyID,
        productID,
        claimName,
        options
      );
      const wait = await tx.wait();

      //   const emits = await new Promise((resolve) => {
      //     contractWithWallet.once("ClaimCreated", (ID, name) => {
      //       resolve({ ID: ID, name: name });
      //     });
      //   });
      //   console.log("emits: ", emits);
      wait.logs.forEach((log: any) => {});

      return true;
    } catch (error: any) {
      console.log("createNewClaim: some error occoured");
      return false;
    }
  }
};

const createNewDocument = async (
  companyID: string,
  claimID: number,
  documentHash: string,
  documentName: string,
  productID: number
) => {
  if (typeof window !== "undefined") {
    try {
      const metaMaskprovider = new providers.Web3Provider(
        (window as any).ethereum
      );
      const signer = metaMaskprovider.getSigner();
      const contractWithWallet = contract.connect(signer);
      const tx = await contractWithWallet.functions.createNewDocument(
        companyID,
        productID,
        claimID,
        documentHash,
        documentName,
        options
      );

      const wait = await tx.wait();
      return true;
      wait.logs.forEach((log: any) => {});
    } catch (error: any) {
      console.log("createNewCompany: some error occoured");
      return false;
    }
  }
};

const addNewSignatures = async (
  companyID: string,
  productID: number,
  claimID: number,
  documentID: number,
  signatures: string
) => {
  if (typeof window !== "undefined") {
    try {
      const metaMaskprovider = new providers.Web3Provider(
        (window as any).ethereum
      );
      const signer = metaMaskprovider.getSigner();
      const contractWithWallet = contract.connect(signer);
      const signaturesArr = signatures.split(",");
      const tx = await contractWithWallet.functions.addNewSignatures(
        companyID,
        productID,
        claimID,
        documentID,
        signaturesArr,
        options
      );

      const wait = await tx.wait();

      wait.logs.forEach((log: any) => {});

      return true;
    } catch (error: any) {
      console.log("createNewCompany: some error occoured");
      return false;
    }
  }
};

const Form: FC<FormProps> = ({ title }) => {
  let shape: any = {
    companyID: yup.string().test("len", "", (val) => val?.length === 6),
  };
  if (title === "Create Company") {
    shape["companyName"] = yup.string().required("");
  }
  if (title === "Create Product") {
    shape["productName"] = yup.string().required("");
  }
  if (title === "Create Claim") {
    shape["claimName"] = yup.string().required("");
    shape["productID"] = yup.string().required("");
  }
  if (title === "Create Document") {
    shape["claimID"] = yup.string().required("");
    shape["productID"] = yup.string().required("");
    shape["documentName"] = yup.string().required("");
    shape["documentHash"] = yup.string().required("");
  }
  if (title === "Add Signatures") {
    shape["claimID"] = yup.string().required("");
    shape["productID"] = yup.string().required("");
    shape["documentID"] = yup.string().required("");
    shape["signatures"] = yup.string().required("");
  }

  const schema = yup.object().shape(shape);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
  });

  const [showLoadingAnimation, setShowLoadingAnimation] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSucess, setShowSuccess] = useState(false);

  const companyIDField = () => {
    return (
      <div className="form-group mb-1">
        <input
          type="text"
          maxLength={6}
          className={`form-control block
    w-full
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
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none ${
      errors.companyID ? "is-invalid" : ""
    }`}
          {...register("companyID")}
          id="exampleInput7"
          placeholder="*Company ID (length: 6)"
        />
        <div
          className={
            errors.companyID
              ? "text-red-600 text-[0.9rem] mt-1"
              : "invisible text"
          }
        >
          *Company ID Must be exactly 6 charachters
        </div>
      </div>
    );
  };

  const requiredField = (placeHolder: string, fieldName: string) => {
    return (
      <div className="form-group mb-1">
        <input
          type="text"
          className={`form-control block
      w-full
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
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none ${
        errors[fieldName] ? "is-invalid" : ""
      }`}
          {...register(fieldName)}
          placeholder={placeHolder}
        />
        <div
          className={
            errors[fieldName]
              ? "text-red-600 text-[0.9rem] mt-1 mb-0"
              : "invisible text"
          }
        >
          *This field is required
        </div>
      </div>
    );
  };

  const onSubmit = async (data: any) => {
    setShowLoadingAnimation(true);
    let resp: boolean = true;
    if (title === "Create Company") {
      resp = !!(await createNewCompany(data.companyID, data.companyName));
    }
    if (title === "Create Product") {
      //handle create product case
      resp = !!(await createNewProduct(data.companyID, data.productName));
    }
    if (title === "Create Claim") {
      resp = !!(await createNewClaim(
        data.companyID,
        data.claimName,
        Number(data.productID)
      ));
    }
    if (title === "Create Document") {
      resp = !!(await createNewDocument(
        data.companyID,
        Number(data.claimID),
        data.documentHash,
        data.documentName,
        Number(data.productID)
      ));
    }
    if (title === "Add Signatures") {
      resp = !!(await addNewSignatures(
        data.companyID,
        Number(data.productID),
        Number(data.claimID),
        data.documentID,
        data.signatures
      ));
    }
    setShowLoadingAnimation(false);
    resp ? setShowSuccess(true) : setShowError(true);
  };
  return (
    <div
      className="block p-6 rounded-lg shadow-lg bg-white max-w-md"
      // style={{ height: "30rem" }}
    >
      <div>
        <h1 className="text-center mb-5 text-[2rem]">{title}</h1>
      </div>
      <form
        onSubmit={(e) => {
          handleSubmit(onSubmit)(e);
        }}
        method="post"
      >
        <div
          className="flex flex-col justify-between"
          style={{ height: "23rem" }}
        >
          <div>
            {title === "Create Company" && (
              <div>
                <div>{companyIDField()}</div>
                <div>{requiredField("*Company Name", "companyName")}</div>
              </div>
            )}
            {title === "Create Product" && (
              <div>
                <div>{companyIDField()}</div>
                <div>{requiredField("*Product Name", "productName")}</div>
              </div>
            )}
            {title === "Create Claim" && (
              <div>
                <div>{companyIDField()}</div>
                <div>{requiredField("*Product ID", "productID")}</div>
                <div>{requiredField("*Claim Name", "claimName")}</div>
              </div>
            )}
            {title === "Create Document" && (
              <div>
                <div>{companyIDField()}</div>
                <div>{requiredField("*Product ID", "productID")}</div>
                <div>{requiredField("*Claim ID", "claimID")}</div>
                <div>{requiredField("*Document Name", "documentName")}</div>
                <div>{requiredField("*Document Hash", "documentHash")}</div>
              </div>
            )}
            {title === "Add Signatures" && (
              <div>
                <div>{companyIDField()}</div>
                <div>{requiredField("*Product ID", "productID")}</div>
                <div>{requiredField("*Claim ID", "claimID")}</div>
                <div>{requiredField("*Document ID", "documentID")}</div>
                <div>
                  {requiredField("*Signatures (comma seperated)", "signatures")}
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            className={`
      w-full
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
    ${(showLoadingAnimation || showError || showSucess) && "hidden"}
      `}
          >
            Submit
          </button>
          <div
            className={`flex justify-center ${
              !showLoadingAnimation && "hidden"
            }`}
          >
            <svg
              aria-hidden="true"
              className="w-6 h-6 mr-2 text-gray-200 lg:w-8 lg:h-8 animate-spin dark:white fill-black"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        </div>
        <div
          className={`text-center ${!(showError || showSucess) && "hidden"}`}
        >
          {showError && <div className="text-red-500">Some Error Occured</div>}
          {showSucess && (
            <div className="text-green-500">Transaction Successful</div>
          )}
          <button
            className="       
                w-full
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
            onClick={() => (setShowError(false), setShowSuccess(false))}
          >
            OK
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
