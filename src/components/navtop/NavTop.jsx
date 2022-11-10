import { React, useState } from "react";

// bootstrap
import { Nav, Navbar } from "react-bootstrap";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Container } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";

// icons
import { GiHamburgerMenu } from "react-icons/gi";

import "./navtop.css";

import { Aside } from "./../aside/Aside";

export const NavTop = ({ bc, name, ...props }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Navbar className="navbar mb-4">
      <Container>
        <Nav.Item className="mt-3">
          <Breadcrumb>
            <Breadcrumb.Item>
              <div className="bc-icon">{bc}</div>
            </Breadcrumb.Item>

            <Breadcrumb.Item></Breadcrumb.Item>
          </Breadcrumb>
        </Nav.Item>

        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end gap-1">
          <Navbar.Text className="nav-text">
            <span className="me-3">Signed in as:</span>
            <a className="user text-decoration-none" href="#login">
              Mark Otto
            </a>
          </Navbar.Text>
          <Navbar.Text className="d-block d-md-block d-sm-block d-lg-none">
            <Button
              variant="primary"
              onClick={handleShow}
              className="button-toggle me-2 ms-1"
            >
              <GiHamburgerMenu />
            </Button>
          </Navbar.Text>
          <Offcanvas
            show={show}
            onHide={handleClose}
            {...props}
            responsive="lg"
            className="sidebar-mobile d-xl-none d-lg-none"
          >
            <Offcanvas.Header closeButton></Offcanvas.Header>
            <Offcanvas.Body className="px-4">
              <Aside />
            </Offcanvas.Body>
          </Offcanvas>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
