import React, { useContext, useEffect, useState } from "react";
import client from "../sanity";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import InvestorContext from "../context/user";
import { toast } from "react-toastify";
import SanityContext from "../context/sanityDB";
const GetSeedClaimed = ({ address }) => {
  const { getSectionClaimedTokens } = useContext(InvestorContext);
  const { getDBInvestor } = useContext(SanityContext);
  const [claimedTokensBlkc, setClaimedTokens] = useState(null);
  const [isRegistered, setisRegistered] = useState(false);
  const [seedClaimed, setseedClaimed] = useState("0");
  const [user_id, setUserId] = useState(null);
  useEffect(() => {
    initialiseState().then();
  }, [seedClaimed]);
  const initialiseState = async () => {
    let _dbUser = await getDBInvestor(address);
    setUserId(_dbUser["_id"]);
    setseedClaimed(_dbUser["seed_claimed"]);
    setisRegistered(_dbUser["is_seed_claimed"]);
  };
  const getClaimedTokens = async () => {
    let res = await getSectionClaimedTokens("seed");
    setClaimedTokens(res.toString());
  };
  const recordClaimedTokens = () => {
    client
      .patch(user_id) // Document ID to patch
      .set({ seed_claimed: claimedTokensBlkc.toString(), is_seed_claimed: true })
      .commit() // Perform the patch and return a promise
      .then((updatedRecord) => {
        toast.success("SEED claimed tokens updated.");
        setseedClaimed(updatedRecord["seed_claimed"]);
        setisRegistered(updatedRecord["is_seed_claimed"]);
      })
      .catch((err) => {
        console.error("Oh no, the update failed: ", err.message);
      });
  };
  return (
    <div>
      <Card className="mt-3">
        <Card.Body>
          <Card.Title>Get SEED Claimed</Card.Title>
          {!isRegistered ? (
            <>
              {claimedTokensBlkc && <Card.Text>MPG {claimedTokensBlkc}</Card.Text>}
              <Button variant="primary" onClick={claimedTokensBlkc ? recordClaimedTokens : getClaimedTokens}>
                {claimedTokensBlkc ? "Confirm Records" : "Get Records"}
              </Button>
            </>
          ) : (
            <Card.Text>MPG {seedClaimed}</Card.Text>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default GetSeedClaimed;
