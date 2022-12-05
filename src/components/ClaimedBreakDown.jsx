import React from "react";
import Card from "react-bootstrap/Card";
const ClaimedBreakDown = ({ section, amount }) => {
  return (
    <div>
      <Card.Header as="h5">{section}</Card.Header>
      <Card.Body>
        <Card.Title>MPG {amount}</Card.Title>
      </Card.Body>
    </div>
  );
};

export default ClaimedBreakDown;
