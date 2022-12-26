import React, { useContext, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import InvestorContext from "../context/user";
const NavBr = () => {
  const { isAuthenticated, connect, disconnect } = useContext(InvestorContext);
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">MPG Claim</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>

            <Nav>
              <Button onClick={isAuthenticated ? disconnect : connect} variant={isAuthenticated ? "success" : "secondary"}>
                {isAuthenticated ? "Disconnect Wallet" : "Connect Wallet"}
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBr;
