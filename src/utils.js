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
  mpg_abi: [
    { inputs: [], stateMutability: "nonpayable", type: "constructor" },
    {
      anonymous: false,
      inputs: [
        { indexed: true, internalType: "address", name: "owner", type: "address" },
        { indexed: true, internalType: "address", name: "spender", type: "address" },
        { indexed: false, internalType: "uint256", name: "value", type: "uint256" },
      ],
      name: "Approval",
      type: "event",
    },
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
        { indexed: true, internalType: "address", name: "from", type: "address" },
        { indexed: true, internalType: "address", name: "to", type: "address" },
        { indexed: false, internalType: "uint256", name: "value", type: "uint256" },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      inputs: [{ internalType: "address", name: "_add", type: "address" }],
      name: "addMigratorAddress",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_seed_total", type: "uint256" },
        { internalType: "uint256", name: "_ido_total", type: "uint256" },
        { internalType: "address", name: "_investor", type: "address" },
      ],
      name: "addToBox",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "owner", type: "address" },
        { internalType: "address", name: "spender", type: "address" },
      ],
      name: "allowance",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "approve",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "account", type: "address" }],
      name: "balanceOf",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    { inputs: [], name: "decimals", outputs: [{ internalType: "uint8", name: "", type: "uint8" }], stateMutability: "view", type: "function" },
    {
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "subtractedValue", type: "uint256" },
      ],
      name: "decreaseAllowance",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "getFirstListingDate",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getIdoProvisionDates",
      outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getSeedProvisionDates",
      outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "addedValue", type: "uint256" },
      ],
      name: "increaseAllowance",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "investor", type: "address" }],
      name: "investorAllowance",
      outputs: [
        { internalType: "uint256", name: "presale_total", type: "uint256" },
        { internalType: "uint256", name: "privatesale_total", type: "uint256" },
        { internalType: "uint256", name: "allowance", type: "uint256" },
        { internalType: "uint256", name: "spent", type: "uint256" },
        { internalType: "uint256", name: "lockStage", type: "uint256" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "investor", type: "address" }],
      name: "isEarlyInvestor",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "_beneficiary", type: "address" },
        { internalType: "uint256", name: "_lockStageGlobal", type: "uint256" },
      ],
      name: "isIdoAllowanceProvisioned",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "_add", type: "address" }],
      name: "isMigrator",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "_beneficiary", type: "address" },
        { internalType: "uint256", name: "_lockStageGlobal", type: "uint256" },
      ],
      name: "isSeedAllowanceProvisioned",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "_add", type: "address" }],
      name: "iswhiteListAddress",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    { inputs: [], name: "name", outputs: [{ internalType: "string", name: "", type: "string" }], stateMutability: "view", type: "function" },
    { inputs: [], name: "owner", outputs: [{ internalType: "address", name: "", type: "address" }], stateMutability: "view", type: "function" },
    { inputs: [], name: "releaseTokenTransfer", outputs: [], stateMutability: "nonpayable", type: "function" },
    { inputs: [], name: "released", outputs: [{ internalType: "bool", name: "", type: "bool" }], stateMutability: "view", type: "function" },
    { inputs: [], name: "renounceOwnership", outputs: [], stateMutability: "nonpayable", type: "function" },
    {
      inputs: [{ internalType: "uint256", name: "_date", type: "uint256" }],
      name: "setFirstListingDate",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "_migrator", type: "address" }],
      name: "setMigrator",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    { inputs: [], name: "symbol", outputs: [{ internalType: "string", name: "", type: "string" }], stateMutability: "view", type: "function" },
    { inputs: [], name: "totalSupply", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" },
    {
      inputs: [
        { internalType: "address", name: "_to", type: "address" },
        { internalType: "uint256", name: "_value", type: "uint256" },
      ],
      name: "transfer",
      outputs: [{ internalType: "bool", name: "success", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "_from", type: "address" },
        { internalType: "address", name: "_to", type: "address" },
        { internalType: "uint256", name: "_value", type: "uint256" },
      ],
      name: "transferFrom",
      outputs: [{ internalType: "bool", name: "success", type: "bool" }],
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
    {
      inputs: [{ internalType: "uint256", name: "_stage", type: "uint256" }],
      name: "updateLockStage",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "_add", type: "address" }],
      name: "whiteListAddress",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
  claim_contract: "0xbFecac4635315EE23C4E179501E0b5c588F28ad1",
  new_claim_contract: "0x15DEE5545bCd4062e62DAFa9DECbB728f2252b9f",
  mpg_address: "0x53f0e242ea207b6e9b63e0a53e788267aa99ff9b",
  idoPeriods: ["June", "July", "August", "September"],
  seedPeriods: ["June", "July", "August", "September", "October", "November"],
};

export default UTILS;
