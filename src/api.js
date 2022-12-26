import client from "./sanity";

var _getUserDetails = async (userAddress) => {
  try {
    //_id,address,isRegistered,isClaimed, claimable,ido_claimed,is_ido_claimed, seed_claimed,is_seed_claimed,balance
    const query = `*[_type == "mpg_claim" && lower(address) == '${userAddress}'] {_id,address,is_registered,isClaimed, claimable,ido_claimed,is_ido_claimed, seed_claimed,is_seed_claimed,balance}`;
    const params = { address: userAddress };
    let results = await client.fetch(query, params);
    results.length ? localStorage.setItem("mpg_init", "loaded") : localStorage.setItem("mpg_init", "unloaded");
    return results.length ? results[0] : null;
  } catch (error) {
    console.log(error);
  }
};

export default _getUserDetails;
