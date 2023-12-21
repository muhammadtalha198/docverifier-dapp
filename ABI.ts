export const ABI = [
  {
    inputs: [
      { internalType: "address", name: "initialOwner", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "companyID",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "productID",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "claimID",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "claimName",
        type: "string",
      },
    ],
    name: "ClaimCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "string", name: "ID", type: "string" },
      { indexed: false, internalType: "string", name: "name", type: "string" },
    ],
    name: "CompanyCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint256", name: "ID", type: "uint256" },
      { indexed: false, internalType: "string", name: "name", type: "string" },
      {
        indexed: false,
        internalType: "string",
        name: "dochash",
        type: "string",
      },
    ],
    name: "DocumentCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "companyID",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "productID",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "productName",
        type: "string",
      },
    ],
    name: "ProductCreated",
    type: "event",
  },
  {
    inputs: [
      { internalType: "string", name: "_companyID", type: "string" },
      { internalType: "uint256", name: "_productID", type: "uint256" },
      { internalType: "uint256", name: "_claimID", type: "uint256" },
      { internalType: "uint256", name: "_documentID", type: "uint256" },
      { internalType: "string[]", name: "_signatures", type: "string[]" },
    ],
    name: "addNewSignatures",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "", type: "string" }],
    name: "companyMap",
    outputs: [
      { internalType: "string", name: "companyID", type: "string" },
      { internalType: "string", name: "companyName", type: "string" },
      { internalType: "bool", name: "initialized", type: "bool" },
      {
        components: [
          { internalType: "uint256", name: "_value", type: "uint256" },
        ],
        internalType: "struct Counters.Counter",
        name: "productCounter",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "_companyID", type: "string" },
      { internalType: "uint256", name: "_productID", type: "uint256" },
      { internalType: "string", name: "_claimName", type: "string" },
    ],
    name: "createNewClaim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "_companyID", type: "string" },
      { internalType: "string", name: "_companyName", type: "string" },
    ],
    name: "createNewCompany",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "_companyID", type: "string" },
      { internalType: "uint256", name: "_productID", type: "uint256" },
      { internalType: "uint256", name: "_claimID", type: "uint256" },
      { internalType: "string", name: "_documentHash", type: "string" },
      { internalType: "string", name: "_documentName", type: "string" },
    ],
    name: "createNewDocument",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "_companyID", type: "string" },
      { internalType: "string", name: "_productName", type: "string" },
    ],
    name: "createNewProduct",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "_companyID", type: "string" },
      { internalType: "uint256", name: "_productID", type: "uint256" },
      { internalType: "uint256", name: "_claimID", type: "uint256" },
    ],
    name: "getClaim",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "documentID", type: "uint256" },
          { internalType: "string", name: "documentHash", type: "string" },
          { internalType: "string", name: "documentName", type: "string" },
          { internalType: "uint256", name: "timestamp", type: "uint256" },
          { internalType: "bool", name: "initialized", type: "bool" },
          { internalType: "string[]", name: "signatures", type: "string[]" },
        ],
        internalType: "struct DocumentStash.Document[]",
        name: "",
        type: "tuple[]",
      },
      { internalType: "string", name: "", type: "string" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "_companyID", type: "string" },
      { internalType: "uint256", name: "_productID", type: "uint256" },
    ],
    name: "getClaimsCounter",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "_companyID", type: "string" },
      { internalType: "uint256", name: "_claimID", type: "uint256" },
      { internalType: "uint256", name: "_productID", type: "uint256" },
    ],
    name: "getDocumentsCounter",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "_value", type: "uint256" },
        ],
        internalType: "struct Counters.Counter",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "_companyID", type: "string" }],
    name: "getProductCounter",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
