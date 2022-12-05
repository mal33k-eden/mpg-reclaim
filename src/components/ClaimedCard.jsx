import React from "react";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
const ClaimedCard = ({ address, amount, section, claimedFunction }) => {
  return (
    <div>
      <Card className="mt-3">
        <Card.Body>
          <Card.Title>{section}</Card.Title>
          <Card.Text>MPG {amount}</Card.Text>
          <Button variant="primary" onClick={claimedFunction}>
            Confirm
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ClaimedCard;
