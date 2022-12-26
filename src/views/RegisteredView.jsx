import React, { useState, useEffect, useContext } from "react";
import client from "../sanity";
import Card from "react-bootstrap/Card";
import ClaimedBreakDown from "../components/ClaimedBreakDown";
import InvestorContext from "../context/user";
import { toast } from "react-toastify";
import { Button, Form } from "react-bootstrap";
const RegisteredView = ({ _dbUser }) => {
  const { withdrawTotalInvestment } = useContext(InvestorContext);
  const [ido, setIdo] = useState(null);
  const [seed, setSeed] = useState(null);
  const [claimable, setClaimable] = useState(null);
  const [balance, setBalance] = useState(null);
  const [isClaimed, setisClaimed] = useState(null);
  const [collector, setCollector] = useState(null);
  useEffect(() => {
    initialiseState().then();
  }, [claimable, seed, ido, isClaimed]);
  const initialiseState = async () => {
    setIdo(_dbUser["ido_claimed"]);
    setSeed(_dbUser["seed_claimed"]);
    setClaimable(_dbUser["claimable"]);
    setBalance(_dbUser["balance"]);
    setisClaimed(_dbUser["isClaimed"]);
  };
  const handleCollectionField = (event) => {
    setCollector(event.target.value);
  };
  const claimTokens = async () => {
    if (!collector) {
      toast.error("You need to provide a collector address to proceed");
      return;
    }
    let isrec = await withdrawTotalInvestment(collector);
    if (isrec) {
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
            <div>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Collection Wallet</Form.Label>
                  <Form.Control type="text" placeholder="Enter wallet address" onChange={handleCollectionField} />
                  <Form.Text className="text-muted">
                    Kindly ensure that this collection wallet address was not used to participate in the MPG IDO.
                  </Form.Text>
                </Form.Group>
              </Form>
              <Button variant="success" onClick={claimTokens}>
                Claim Tokens
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default RegisteredView;
