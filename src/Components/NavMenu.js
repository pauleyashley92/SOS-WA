import React from "react";
import "./NavMenu.css";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "react-bootstrap/Nav";

//Uses bootstrap
//Be sure to have bootstrap installed
function NavMenu() {
  return (
    <div>
      <Navbar className="header" expand="lg">
        <Navbar.Brand href="/">
          <img
            src="../long-marine-stranding-program.png"
            alt="stranding logo"
            width="100"
            height="50"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" >
            <Nav.Link href="/" >Map</Nav.Link>
            <Nav.Link href="faq" >FAQ</Nav.Link>
            <Nav.Link href="https://lmlstrandingnetwork.ucsc.edu/" >
              Stranding Program
            </Nav.Link>
            <Nav.Link href="about" >About The Developers</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Brand href="/">
            <Nav className="justify-content-end">
            <img
            src="../baskin-logo-banner-new.jpg"
            alt="baskin logo"
            width="115"
            height="20"
          />
          </Nav>
          </Navbar.Brand>
          
      </Navbar>
    </div>
  );
}

export default NavMenu;
