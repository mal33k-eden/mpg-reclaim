const UTILS = {
  claim_abi: [
    { inputs: [{ internalType: "address", name: "_mpg", type: "address" }], stateMutability: "nonpayable", type: "constructor" },
    {
      anonymous: false,
      inputs: [
        { indexed: true, internalType: "address", name: "previousOwner", type: "address" },
        { indexed: true, internalType: "address", name: "newOwner", type: "address" },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        { indexed: false, internalType: "address", name: "investor", type: "address" },
        { indexed: false, internalType: "uint256", name: "idoInvestment", type: "uint256" },
        { indexed: false, internalType: "uint256", name: "seedInvestments", type: "uint256" },
      ],
      name: "addressRecorded",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        { indexed: false, internalType: "address", name: "investor", type: "address" },
        { indexed: false, internalType: "address", name: "receiver", type: "address" },
        { indexed: false, internalType: "uint256", name: "amount", type: "uint256" },
        { indexed: false, internalType: "enum Utils.idoPeriod", name: "stage", type: "uint8" },
      ],
      name: "withrawIdoEvent",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        { indexed: false, internalType: "address", name: "investor", type: "address" },
        { indexed: false, internalType: "address", name: "receiver", type: "address" },
        { indexed: false, internalType: "uint256", name: "amount", type: "uint256" },
        { indexed: false, internalType: "enum Utils.seedPeriod", name: "stage", type: "uint8" },
      ],
      name: "withrawSeedEvent",
      type: "event",
    },
    {
      inputs: [
        { internalType: "uint256", name: "amount", type: "uint256" },
        { internalType: "uint256", name: "percent", type: "uint256" },
      ],
      name: "calcPercent",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "pure",
      type: "function",
      constant: true,
    },
    {
      inputs: [{ internalType: "address", name: "_investor", type: "address" }],
      name: "isRecorded",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [],
      name: "mpg",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [],
      name: "owner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    { inputs: [], name: "renounceOwnership", outputs: [], stateMutability: "nonpayable", type: "function" },
    {
      inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_ido70Investment", type: "uint256" },
        { internalType: "uint256", name: "_seed80Investments", type: "uint256" },
      ],
      name: "recordAddress",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "enum Utils.idoPeriod", name: "period", type: "uint8" },
        { internalType: "address", name: "receiver", type: "address" },
      ],
      name: "withdrawIdo",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "enum Utils.seedPeriod", name: "period", type: "uint8" },
        { internalType: "address", name: "receiver", type: "address" },
      ],
      name: "withdrawSeed",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "enum Utils.idoPeriod", name: "period", type: "uint8" }],
      name: "idoPeriodStatus",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [{ internalType: "enum Utils.seedPeriod", name: "period", type: "uint8" }],
      name: "seedPeriodStatus",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [{ internalType: "address", name: "receiver", type: "address" }],
      name: "safePull",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "getInvestmentsProfile",
      outputs: [
        { internalType: "uint256", name: "ido", type: "uint256" },
        { internalType: "uint256", name: "seed", type: "uint256" },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
  ],
  new_claim_abi: [
    {
      inputs: [
        {
          internalType: "address",
          name: "_mpg",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
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
          internalType: "address",
          name: "investor",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "claimAmount",
          type: "uint256",
        },
      ],
      name: "addressRecorded",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "investor",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "receiver",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "withrawEvent",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_investor",
          type: "address",
        },
      ],
      name: "getCanClaim",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_investor",
          type: "address",
        },
      ],
      name: "getCliamable",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_investor",
          type: "address",
        },
      ],
      name: "isRecorded",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [],
      name: "mpg",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_investor",
          type: "address",
        },
      ],
      name: "resetIsRecorded",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "claimAmount",
          type: "uint256",
        },
      ],
      name: "recordAddress",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "receiver",
          type: "address",
        },
      ],
      name: "withdraw",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "receiver",
          type: "address",
        },
      ],
      name: "safePull",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
  claim_contract: "0xbFecac4635315EE23C4E179501E0b5c588F28ad1",
  new_claim_contract: "0x00eCA8135b7450b7691A7BE76AB174a688c3a527",
  mpg_address: "0x53f0e242ea207b6e9b63e0a53e788267aa99ff9b",
  idoPeriods: ["June", "July", "August", "September"],
  seedPeriods: ["June", "July", "August", "September", "October", "November"],
};

export default UTILS;
