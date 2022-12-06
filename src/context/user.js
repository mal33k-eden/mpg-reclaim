import { createContext, useContext, useEffect, useState } from "react";
import client from "../sanity";
import { useMoralis, useWeb3Contract, useMoralisWeb3Api } from "react-moralis";
import { toast } from "react-toastify";
import UTILS from "../utils";
import _getUserDetails from "../api";
const InvestorContext = createContext();

export const InvestorProvider = ({ children }) => {
  const { authenticate, isAuthenticated, logout, user, Moralis } = useMoralis();
  const { runContractFunction } = useWeb3Contract();
  const Web3Api = useMoralisWeb3Api();
  const [connectedAddress, setConnectedAddress] = useState(null);
  const [refactoredAddress, setRefactoredAddress] = useState(null);
  const [claimedProfile, setClaimedProfile] = useState([0, 0]);
  const [dbInit, setDbInit] = useState("unloaded");
  useEffect(() => {
    if (isAuthenticated) {
      setUpDB().then();
      setConnectedAddress(user.get("ethAddress"));
      setRefactoredAddress(refactorAddress(user.get("ethAddress")));
      getTotalClaimedTokens();
    }
  }, [isAuthenticated, user, dbInit]);
  const setUpDB = async () => {
    if (isAuthenticated && user.get("ethAddress")) {
      var db = await _getUserDetails(user.get("ethAddress"));
      var mpg_init = localStorage.getItem("mpg_init");
      if (db == null && mpg_init == "unloaded") {
        await initialiseDBUser(user.get("ethAddress"));
      }
    }
  };
  const connect = async () => {
    try {
      await authenticate();
    } catch (error) {
      toast.error(error);
    }
  };
  const initialiseDBUser = async (userAddress) => {
    //record on claim
    var mpg_init = localStorage.getItem("mpg_init");
    try {
      if (mpg_init == "unloaded" && typeof userAddress == "string") {
        const doc = {
          _type: "mpg_claim",
          address: userAddress,
          balance: "0",
          seed_claimed: "0",
          ido_claimed: "0",
          claimable: "0",
          isClaimed: false,
          is_seed_claimed: false,
          is_ido_claimed: false,
          is_registered: false,
        };
        await client.create(doc);
        localStorage.setItem("mpg_init", "loaded");
        console.log(localStorage.getItem("mpg_init"));
        setDbInit(localStorage.getItem("mpg_init"));
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const disconnect = async () => {
    try {
      await logout();
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };
  const refactorAddress = (address) => {
    var first = address.slice(0, 6);
    var last = address.slice(-6);
    return first + "......" + last;
  };
  const getInvestments = async () => {
    var res = [];
    var options = {
      abi: UTILS.claim_abi,
      contractAddress: UTILS.claim_contract,
      functionName: "getInvestmentsProfile",
    };
    try {
      var record = await runContractFunction({ params: options });
      if (record !== undefined) {
        var ido = record["ido"];
        var seed = record["seed"];
        res = [Moralis.Units.FromWei(ido), Moralis.Units.FromWei(seed)];
      }
    } catch (err) {}

    return res;
  };
  const getSectionInvestments = async (type) => {
    // type should be ido or seed
    var res = 0;
    var options = {
      abi: UTILS.claim_abi,
      contractAddress: UTILS.claim_contract,
      functionName: "getInvestmentsProfile",
    };
    try {
      var record = await runContractFunction({ params: options });
      if (record !== undefined) {
        var sectionTokens = record[type];

        res = Moralis.Units.FromWei(sectionTokens);
      }
    } catch (err) {}

    return res;
  };
  const getInvestmentPeriodStatus = async (type, period) => {
    var res;
    var options = {
      abi: UTILS.claim_abi,
      contractAddress: UTILS.claim_contract,
      functionName: type === "IDO" ? "idoPeriodStatus" : "seedPeriodStatus",
      params: {
        period: period,
      },
    };
    var record = await runContractFunction({ params: options });
    if (record !== undefined) {
      return record;
    }

    return res;
  };
  const getTotalClaimedTokens = async () => {
    let claimedIdo = 0;
    let claimedSeed = 0;
    let investments = await getInvestments();

    let ido = parseInt(investments[0]);
    let seed = parseInt(investments[1]);
    if (ido > 0) {
      for (let index = 0; index < UTILS.idoPeriods.length; index++) {
        let checks = await getInvestmentPeriodStatus("IDO", index);
        if (checks) {
          claimedIdo += ido * 0.1;
        }
      }
    }
    if (seed > 0) {
      for (let index = 0; index < UTILS.seedPeriods.length; index++) {
        let checks = await getInvestmentPeriodStatus("SEED", index);
        if (checks) {
          claimedSeed += seed * 0.1;
        }
      }
    }
    console.log([claimedIdo, claimedSeed]);
    setClaimedProfile([claimedIdo, claimedSeed]);
  };
  const getSectionClaimedTokens = async (section) => {
    if (!Moralis.isWeb3Enabled()) {
      await Moralis.enableWeb3();
    }
    let claimed = 0;
    let investments = await getSectionInvestments(section);
    let sectionInvestment = parseInt(investments);
    if (sectionInvestment > 0 && section == "ido") {
      for (let index = 0; index < UTILS.idoPeriods.length; index++) {
        let checks = await getInvestmentPeriodStatus("IDO", index);
        if (checks) {
          claimed += sectionInvestment * 0.1;
        }
      }
    }
    if (sectionInvestment > 0 && section == "seed") {
      for (let index = 0; index < UTILS.seedPeriods.length; index++) {
        let checks = await getInvestmentPeriodStatus("SEED", index);
        if (checks) {
          claimed += sectionInvestment * 0.1;
        }
      }
    }
    return claimed;
  };
  const fetchTokenBalances = async (address) => {
    await Moralis.enableWeb3();
    let mpgBal = 0;
    const options = {
      chain: "bsc",
      address: address,
    };
    const balances = await Web3Api.account.getTokenBalances(options);

    balances.map((element, index) => {
      if (element["token_address"] == UTILS.mpg_address) {
        mpgBal = Moralis.Units.FromWei(element["balance"]);
      }
    });
    return mpgBal;
  };
  const getRecorded = async () => {
    if (!Moralis.isWeb3Enabled) {
      await Moralis.enableWeb3();
    }
    var add = user.get("ethAddress");
    var options = {
      abi: UTILS.new_claim_abi,
      contractAddress: UTILS.new_claim_contract,
      functionName: "isRecorded",
      params: { _investor: add },
    };
    var record = await runContractFunction({ params: options });

    return record;
  };
  const recordTotalInvestment = async (calculatedAmount) => {
    if (!Moralis.isWeb3Enabled) {
      await Moralis.enableWeb3();
    }
    var options = {
      abi: UTILS.new_claim_abi,
      contractAddress: UTILS.new_claim_contract,
      functionName: "recordAddress",
      params: { claimAmount: Moralis.Units.ETH(calculatedAmount) },
    };
    try {
      var r = await runContractFunction({ params: options });
      if (r !== undefined) {
        r.wait(2);

        return true;
      } else {
        // toast.error("execution reverted: Connected address is not marked as an investor.");
      }
    } catch (err) {
      // toast.error("execution reverted: Connected address is not marked as an investor.");
    }
    return false;
  };
  const withdrawTotalInvestment = async (receiver) => {
    if (!Moralis.isWeb3Enabled) {
      await Moralis.enableWeb3();
    }
    var options = {
      abi: UTILS.new_claim_abi,
      contractAddress: UTILS.new_claim_contract,
      functionName: "withdraw",
      params: { receiver: receiver },
    };
    try {
      var r = await runContractFunction({ params: options });
      if (r !== undefined) {
        r.wait(2);
        return true;
      }
    } catch (err) {}
    return false;
  };

  return (
    <InvestorContext.Provider
      value={{
        connect,
        isAuthenticated,
        connectedAddress,
        disconnect,
        Moralis,
        refactoredAddress,
        claimedProfile,
        getTotalClaimedTokens,
        getSectionClaimedTokens,
        fetchTokenBalances,
        getRecorded,
        recordTotalInvestment,
        withdrawTotalInvestment,
      }}
    >
      {children}
    </InvestorContext.Provider>
  );
};
export default InvestorContext;
