import { React, useState } from "react";

// bootstrap
import { Nav, Navbar } from "react-bootstrap";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Container } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";

import { RiDashboardFill } from "react-icons/ri";

import "./navtop.css";

export const NavTop = ({ name, ...props }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Navbar className="navbar mb-4">
      <Container>
        <Nav.Item className="mt-3">
          <Breadcrumb>
            <Breadcrumb.Item>
              <div className="bc-icon">
                <RiDashboardFill />
              </div>
            </Breadcrumb.Item>

            <Breadcrumb.Item></Breadcrumb.Item>
          </Breadcrumb>
        </Nav.Item>

        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end gap-1">
          <Navbar.Text className="side-menu">
            <span className="me-3">Signed in as:</span>
            <a className="user" href="#login">
              Mark Otto
            </a>
          </Navbar.Text>
          <Navbar.Text className="d-lg-none d-xl-none d-md-none">
            <Button variant="primary" onClick={handleShow} className="me-2">
              {name}
            </Button>
          </Navbar.Text>
          <Offcanvas show={show} onHide={handleClose} {...props}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Offcanvas</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              Some text as placeholder. In real life you can have the elements
              you have chosen. Like, text, images, lists, etc.
            </Offcanvas.Body>
          </Offcanvas>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

function Example() {
  return (
    <>
      {["end"].map((placement, idx) => (
        <NavTop key={idx} placement={placement} name={placement} />
      ))}
    </>
  );
}
