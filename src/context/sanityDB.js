import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import client from "../sanity";
import UTILS from "../utils";
import InvestorContext from "./user";
const SanityContext = createContext();

export const SanityProvider = ({ children }) => {
  const { isAuthenticated, Moralis, connectedAddress } = useContext(InvestorContext);
  const [completedWizard, setcompletedWizard] = useState(false);
  const getDBInvestor = async (userAddress) => {
    try {
      const query = `*[_type == "reclaim" && lower(address) == '${userAddress}'] {_id,address,isClaimed, claimable,ido_claimed,is_ido_claimed, seed_claimed,is_seed_claimed,balance,isRegistered}`;
      const params = { address: userAddress };
      let results = await client.fetch(query, params);
      if (results.length == 0) {
        if (initialiseDBUser(userAddress)) {
          results = await client.fetch(query, params);
        }
      }
      return results.length ? results[0] : null;
    } catch (error) {
      console.log(error);
    }
  };
  const initialiseDBUser = async (userAddress) => {
    //record on claim
    try {
      const doc = {
        _type: "reclaim",
        _id: userAddress,
        address: userAddress,
        balance: "0",
        seed_claimed: "0",
        ido_claimed: "0",
        claimable: "0",
      };
      await client.create(doc);
      return true;
    } catch (error) {
      console.log(error);
    }
  };
  return <SanityContext.Provider value={{ getDBInvestor, initialiseDBUser, setcompletedWizard, completedWizard }}>{children}</SanityContext.Provider>;
};
export default SanityContext;
