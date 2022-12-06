import React, { useState, useEffect, useContext } from "react";
import client from "../sanity";
import Card from "react-bootstrap/Card";
import ClaimedCard from "../components/ClaimedCard";
import ClaimedBreakDown from "../components/ClaimedBreakDown";
import InvestorContext from "../context/user";
import { toast } from "react-toastify";
import SanityContext from "../context/sanityDB";
import { Button } from "react-bootstrap";
const RegisteredView = ({ _dbUser }) => {
  const { withdrawTotalInvestment } = useContext(InvestorContext);
  const {} = useContext(SanityContext);
  const [ido, setIdo] = useState(null);
  const [seed, setSeed] = useState(null);
  const [claimable, setClaimable] = useState(null);
  const [balance, setBalance] = useState(null);
  const [isClaimed, setisClaimed] = useState(null);
  useEffect(() => {
    initialiseState().then();
  }, [claimable, seed, ido]);
  const initialiseState = async () => {
    setIdo(_dbUser["ido_claimed"]);
    setSeed(_dbUser["seed_claimed"]);
    setClaimable(_dbUser["claimable"]);
    setBalance(_dbUser["balance"]);
    setisClaimed(_dbUser["isClaimed"]);
  };

  const claimTokens = async () => {
    let isrec = await withdrawTotalInvestment("");
    if (true) {
      client
        .patch(_dbUser["_id"]) // Document ID to patch
        .set({ isClaimed: true })
        .commit() // Perform the patch and return a promise
        .then((updatedRecord) => {
          toast.success("Tokes Claimed Successfully.");
          setisClaimed(updatedRecord["isClaimed"]);
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
      <Card>
        <ClaimedBreakDown section={"IDO Claimed"} amount={ido} />
        <ClaimedBreakDown section={"SEED Claimed"} amount={seed} />
        <ClaimedBreakDown section={"Registered Claimed"} amount={balance} />
      </Card>
      <Card className="mt-3">
        <Card.Body>
          <Card.Title>Claimable Tokens</Card.Title>
          <Card.Text>MPG {claimable}</Card.Text>
          {isClaimed ? (
            <Button variant="secondary">Claimed</Button>
          ) : (
            <Button variant="success" onClick={claimTokens}>
              Claim Tokens
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default RegisteredView;
