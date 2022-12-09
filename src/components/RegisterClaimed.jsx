import React, { useContext, useEffect, useState } from "react";
import client from "../sanity";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import InvestorContext from "../context/user";
import { toast } from "react-toastify";
import SanityContext from "../context/sanityDB";
const RegisterClaimed = ({ address }) => {
  const { fetchTokenBalances, recordTotalInvestment, getRecorded } = useContext(InvestorContext);
  const { getDBInvestor, setcompletedWizard } = useContext(SanityContext);
  const [currBalance, setCurrBalance] = useState(null);
  const [claimableTokens, setClaimableTokens] = useState(null);
  const [calClaimableTokens, setCalClaimableTokens] = useState(null);
  const [isRegistered, setisRegistered] = useState(false);
  const [balance, setBalance] = useState("0");
  const [user_id, setUserId] = useState(null);
  useEffect(() => {
    console.log(isRegistered);
    console.log(address);
  }, [isRegistered]);
  const initialiseState = async () => {
    let _dbUser = await getDBInvestor(address);
    let bal = await fetchTokenBalances(address);

    if (_dbUser["is_ido_claimed"] && _dbUser["is_seed_claimed"]) {
      setCurrBalance(bal);
      setUserId(_dbUser["_id"]);
      setBalance(_dbUser["balance"]);
      setisRegistered(_dbUser["is_registered"]);
      setCalClaimableTokens(parseInt(bal) - (parseInt(_dbUser["ido_claimed"]) + parseInt(_dbUser["seed_claimed"])));
    } else {
      toast.error("You need to confirm your IDO & SEED tokens before you continue");
    }
  };

  const recordClaimedTokens = async () => {
    await recordTotalInvestment(calClaimableTokens);
    let isrec = await getRecorded();
    if (isrec) {
      client
        .patch(user_id) // Document ID to patch
        .set({ balance: currBalance, is_registered: true, claimable: calClaimableTokens.toString() })
        .commit() // Perform the patch and return a promise
        .then((updatedRecord) => {
          toast.success("Claimable tokens updated. Refresh your browser if you you have not been redirected after 15 seconds");
          setBalance(updatedRecord["balance"]);
          setisRegistered(updatedRecord["isRegistered"]);
          setClaimableTokens(updatedRecord["claimable"]);
          setcompletedWizard(true);
        })
        .catch((err) => {
          console.error("Oh no, the update failed: ", err.message);
        });
    } else {
      toast.error("Error whiles making records. Try again!");
    }
  };
  return (
    <div>
      <Card className="mt-3">
        <Card.Body>
          <Card.Title>Total Claimable</Card.Title>
          {isRegistered == false ? (
            <>
              {currBalance && <Card.Text>Current Balance: MPG {currBalance}</Card.Text>}
              {calClaimableTokens && <Card.Text>Claimable Tokens: MPG {calClaimableTokens}</Card.Text>}
              <Button variant="primary" onClick={currBalance ? recordClaimedTokens : initialiseState}>
                {currBalance ? "Confirm Records" : "Get Records"}
              </Button>
            </>
          ) : (
            <>
              <Card.Text>Current Balance: MPG {balance}</Card.Text>
              <Card.Text>Total Claimable: MPG {claimableTokens}</Card.Text>
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default RegisterClaimed;
