import { createContext, useContext, useState } from "react";
import client from "../sanity";
import InvestorContext from "./user";
const SanityContext = createContext();

export const SanityProvider = ({ children }) => {
  const { isAuthenticated, Moralis, connectedAddress } = useContext(InvestorContext);
  const [completedWizard, setcompletedWizard] = useState(false);

  const getDBInvestor = async (userAddress) => {
    try {
      //_id,address,isRegistered,isClaimed, claimable,ido_claimed,is_ido_claimed, seed_claimed,is_seed_claimed,balance
      const query = `*[_type == "mpg_claim" && lower(address) == '${userAddress}'] {_id,address,is_registered,isClaimed, claimable,ido_claimed,is_ido_claimed, seed_claimed,is_seed_claimed,balance}`;
      const params = { address: userAddress };
      let results = await client.fetch(query, params);
      console.log(results);
      return results.length ? results[0] : null;
    } catch (error) {
      console.log(error);
    }
  };

  return <SanityContext.Provider value={{ getDBInvestor, setcompletedWizard, completedWizard }}>{children}</SanityContext.Provider>;
};
export default SanityContext;
