import { createContext, useEffect, useState } from "react";
import client from "../sanity";
import { ethers, providers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { toast } from "react-toastify";
import UTILS from "../utils";
import _getUserDetails from "../api";
const InvestorContext = createContext();

export const InvestorProvider = ({ children }) => {
  const [connectedAddress, setConnectedAddress] = useState(null);
  const [refactoredAddress, setRefactoredAddress] = useState(null);
  const [claimedProfile, setClaimedProfile] = useState([0, 0]);
  const [dbInit, setDbInit] = useState("unloaded");
  //
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [web3Modal, setWeb3Modal] = useState(null);
  const [web3Provider, setWeb3Provider] = useState(null);

  useEffect(() => {
    const providerOptions = {
      walletconnect: {
        display: {
          logo: "data:image/gif;base64,INSERT_BASE64_STRING",
          name: "Mobile",
          description: "Scan qrcode with your mobile wallet",
        },
        package: WalletConnectProvider,
        rpc: {
          56: "https://bsc-dataseed.binance.org/",
        },
        network: "binance",
        chainId: 56,
      },
    };
    const newWeb3Modal = new Web3Modal({
      cacheProvider: true, // very important
      disableInjectedProvider: false,
      providerOptions,
    });
    setWeb3Modal(newWeb3Modal);
  }, []);
  useEffect(() => {
    // connect automatically and without a popup if user is already connected
    if (web3Modal && web3Modal.cachedProvider) {
      connect();
    }
  }, [web3Modal]);

  useEffect(() => {
    if (isAuthenticated) {
      setUpDB().then(() => {
        setRefactoredAddress(refactorAddress(connectedAddress));
        getTotalClaimedTokens();
      });
    }
  }, [isAuthenticated, connectedAddress, dbInit]);
  const connect = async () => {
    try {
      const provider = await web3Modal.connect();
      addListeners(provider);
      setIsAuthenticated(true);
      const ethersProvider = new providers.Web3Provider(provider);
      setWeb3Provider(ethersProvider);
      const userAddress = await ethersProvider.getSigner().getAddress();
      setConnectedAddress(userAddress.toLowerCase());
    } catch (error) {
      toast.error(error);
    }
  };
  const setUpDB = async () => {
    console.log(connectedAddress);
    if (isAuthenticated && connectedAddress) {
      var db = await _getUserDetails(connectedAddress);
      var mpg_init = localStorage.getItem("mpg_init");
      if (db == null && mpg_init == "unloaded") {
        console.log("inserting");
        await initialiseDBUser(connectedAddress);
      }
    }
  };

  async function addListeners(web3ModalProvider) {
    web3ModalProvider.on("accountsChanged", (accounts) => {
      window.location.reload();
    });

    // Subscribe to chainId change
    web3ModalProvider.on("chainChanged", (chainId) => {
      window.location.reload();
    });
  }
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
        setDbInit(localStorage.getItem("mpg_init"));
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const disconnect = async () => {
    try {
      // await logout();
      localStorage.clear();
      setIsAuthenticated(false);
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

    try {
      const claim_contract = new ethers.Contract(UTILS.claim_contract, UTILS.claim_abi, web3Provider.getSigner());
      const record = await claim_contract.getInvestmentsProfile();
      var ido = record["ido"];
      var seed = record["seed"];
      res = [ethers.utils.formatEther(ido), ethers.utils.formatEther(seed)];
    } catch (err) {
      console.log(err);
    }

    return res;
  };
  const getSectionInvestments = async (type) => {
    // type should be ido or seed
    var res = 0;
    try {
      const claim_contract = new ethers.Contract(UTILS.claim_contract, UTILS.claim_abi, web3Provider.getSigner());
      const record = await claim_contract.getInvestmentsProfile();
      var section = record[type];
      console.log(section);
      res = ethers.utils.formatEther(section);
    } catch (err) {
      console.log(err);
    }

    return res;
  };
  const getInvestmentPeriodStatus = async (type, period) => {
    try {
      let record = null;
      const claim_contract = new ethers.Contract(UTILS.claim_contract, UTILS.claim_abi, web3Provider.getSigner());
      type === "IDO" ? (record = await claim_contract.idoPeriodStatus(period)) : (record = await claim_contract.seedPeriodStatus(period));
      return record;
    } catch (err) {
      console.log(err);
    }

    return null;
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
    let mpgBal = 0;
    try {
      const erc20 = new ethers.Contract(UTILS.mpg_address, UTILS.mpg_abi, web3Provider.getSigner());
      let bal = await erc20.balanceOf(address);
      bal = parseFloat(ethers.utils.formatEther(bal));
      mpgBal = bal.toFixed(2);
    } catch (error) {
      console.log(error);
    }
    return mpgBal;
  };
  const getRecorded = async () => {
    try {
      var _investor = connectedAddress;
      const new_contract = new ethers.Contract(UTILS.new_claim_contract, UTILS.new_claim_abi, web3Provider.getSigner());
      let record = await new_contract.isRecorded(_investor);
      console.log(record);
      return record;
    } catch (error) {
      console.log(error);
    }
  };
  const recordTotalInvestment = async (calculatedAmount) => {
    try {
      const new_contract = new ethers.Contract(UTILS.new_claim_contract, UTILS.new_claim_abi, web3Provider.getSigner());
      let r = await new_contract.recordAddress(calculatedAmount);
      if (r !== undefined) {
        r.wait();
        return true;
      } else {
        // toast.error("execution reverted: Connected address is not marked as an investor.");
      }
    } catch (err) {
      console.log(err);
      // toast.error("execution reverted: Connected address is not marked as an investor.");
    }
    return false;
  };
  const withdrawTotalInvestment = async (receiver) => {
    try {
      const new_contract = new ethers.Contract(UTILS.new_claim_contract, UTILS.new_claim_abi, web3Provider.getSigner());
      let r = await new_contract.withdraw(receiver);
      if (r !== undefined) {
        r.wait();
        return true;
      }
    } catch (err) {
      console.log(err);
    }
    return false;
  };

  return (
    <InvestorContext.Provider
      value={{
        connect,
        isAuthenticated,
        connectedAddress,
        refactoredAddress,
        disconnect,
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
