import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
const ShowInfo = ({ variant, title, message, action }) => {
  const [show, setShow] = useState(true);

  return (
    <div className="my-3">
      <Alert show={show} variant={variant}>
        <Alert.Heading> {title}</Alert.Heading>
        <p>{message}</p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(false)} variant="danger" size="sm">
            Close Alert!
          </Button>
        </div>
      </Alert>

      {!show && <Button onClick={() => setShow(true)}>Show Alert</Button>}
    </div>
  );
};

export default ShowInfo;
