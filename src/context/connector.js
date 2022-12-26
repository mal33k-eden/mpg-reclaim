import { createContext, useState, useEffect } from "react";
import { ethers, providers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import UTILS from "../utils";
const ConnectorContext = createContext();

export const ConnectorProvider = ({ children }) => {
  const [web3Modal, setWeb3Modal] = useState(null);
  const [web3Pvdr, setWeb3Pvdr] = useState(null);
  const [connectedAddress, setConnectedAddress] = useState(null);
  const [balance, setBalance] = useState(null);

  // useEffect(() => {
  //   const providerOptions = {
  //     walletconnect: {
  //       display: {
  //         logo: "data:image/gif;base64,INSERT_BASE64_STRING",
  //         name: "Mobile",
  //         description: "Scan qrcode with your mobile wallet",
  //       },
  //       package: WalletConnectProvider,
  //       rpc: {
  //         56: "https://bsc-dataseed.binance.org/",
  //       },
  //       network: "binance",
  //       chainId: 56,
  //     },
  //   };
  //   const newWeb3Modal = new Web3Modal({
  //     cacheProvider: true, // very important
  //     disableInjectedProvider: false,
  //     providerOptions,
  //   });
  //   setWeb3Modal(newWeb3Modal);
  // }, []);
  // useEffect(() => {
  //   // connect automatically and without a popup if user is already connected
  //   if (web3Modal && web3Modal.cachedProvider) {
  //     connectWallet();
  //   }
  // }, [web3Modal]);

  // async function connectWallet() {
  //   const provider = await web3Modal.connect();
  //   addListeners(provider);
  //   const ethersProvider = new providers.Web3Provider(provider);
  //   setWeb3Pvdr(ethersProvider);
  //   const userAddress = await ethersProvider.getSigner().getAddress();
  //   // let b = await ethersProvider.getSigner().getBalance();
  //   setConnectedAddress(userAddress);
  // }
  // async function addListeners(web3ModalProvider) {
  //   web3ModalProvider.on("accountsChanged", (accounts) => {
  //     window.location.reload();
  //   });

  //   // Subscribe to chainId change
  //   web3ModalProvider.on("chainChanged", (chainId) => {
  //     window.location.reload();
  //   });
  // }

  // const readContract = async () => {
  //   // const erc20 = new ethers.Contract(UTILS.mpg_address, UTILS.mpg_abi, web3Pvdr);
  //   // var bal = await erc20.balanceOf(address);
  //   // setBalance(bal.toString());
  // };
  const isAuthenticated = null;
  let refactoredAddress = null;

  return <ConnectorContext.Provider values={{ isAuthenticated }}>{children}</ConnectorContext.Provider>;
};

export default ConnectorContext;
