import React from "react";

// React Bootstrap
import { Navbar, Nav } from "react-bootstrap";

// CSS
import "./Aside.css";
import "./../../App.css";

export const AsideBrand = ({ logo, textBrand }) => {
  return (
    <>
      <Nav.Item className="py-5 mx-auto" as="li">
        <Navbar.Brand
          href="/"
          className="silakend d-flex mb-md-0 me-md-auto brand-icon"
        >
          <img src={logo} alt="Polman Logo" className="polman-logo" />
          <span className="color-primary ms-2 fw-bold fs-5">{textBrand}</span>
        </Navbar.Brand>
      </Nav.Item>
    </>
  );
};
