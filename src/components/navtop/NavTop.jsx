import { React, useState } from "react";

import { NavLink } from "react-router-dom";

// bootstrap
import { Nav, Navbar } from "react-bootstrap";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Container } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

// icons
import { GiHamburgerMenu } from "react-icons/gi";
import { HiOutlineLogout } from "react-icons/hi";

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
          <Navbar.Text className="nav-text d-flex align-items-center">
            <span className="me-2">Signed in as:</span>

            <Dropdown className="d-inline mx-2" align="end">
              <Dropdown.Toggle id="dropdown-autoclose-true">
                User
              </Dropdown.Toggle>

              <Dropdown.Menu className="dropdown-body shadow-sm rounded">
                <NavLink
                  exact
                  to={"/silakend-login"}
                  className="logout dropdown-item d-flex ms-2 "
                >
                  Logout
                  <HiOutlineLogout className="logout-icon ms-2 fs-4" />
                </NavLink>
              </Dropdown.Menu>
            </Dropdown>
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
