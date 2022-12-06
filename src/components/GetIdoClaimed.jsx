import React, { useContext, useEffect, useState } from "react";
import client from "../sanity";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import InvestorContext from "../context/user";
import { toast } from "react-toastify";
import SanityContext from "../context/sanityDB";
const GetIdoClaimed = ({ address }) => {
  const { getSectionClaimedTokens } = useContext(InvestorContext);
  const { getDBInvestor } = useContext(SanityContext);
  const [claimedTokens, setClaimedTokens] = useState(null);
  const [isRegistered, setisRegistered] = useState(false);
  const [idoClaimed, setidoClaimed] = useState("0");
  const [user_id, setUserId] = useState(null);

  useEffect(() => {
    initialiseState().then();
  }, [idoClaimed, isRegistered]);
  const initialiseState = async () => {
    let _dbUser = await getDBInvestor(address);
    setUserId(_dbUser["_id"]);
    setidoClaimed(_dbUser["ido_claimed"]);
    setisRegistered(_dbUser["is_ido_claimed"]);
  };
  const getClaimedTokens = async () => {
    let res = await getSectionClaimedTokens("ido");
    setClaimedTokens(res.toString());
  };
  const recordClaimedTokens = () => {
    client
      .patch(user_id) // Document ID to patch
      .set({ ido_claimed: claimedTokens.toString(), is_ido_claimed: true })
      .commit() // Perform the patch and return a promise
      .then((updatedRecord) => {
        toast.success("IDO claimed tokens updated.");
        setidoClaimed(updatedRecord["ido_claimed"]);
        setisRegistered(updatedRecord["is_ido_claimed"]);
      })
      .catch((err) => {
        console.error("Oh no, the update failed: ", err.message);
      });
  };
  return (
    <div>
      <Card className="mt-3">
        <Card.Body>
          <Card.Title>Get IDO Claimed</Card.Title>
          {!isRegistered ? (
            <>
              {claimedTokens && <Card.Text>MPG {claimedTokens}</Card.Text>}
              <Button variant="primary" onClick={claimedTokens ? recordClaimedTokens : getClaimedTokens}>
                {claimedTokens ? "Confirm Records" : "Get Records"}
              </Button>
            </>
          ) : (
            <Card.Text>MPG {idoClaimed}</Card.Text>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default GetIdoClaimed;
