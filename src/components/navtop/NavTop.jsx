import { React, useState } from "react";

import { NavLink } from "react-router-dom";

// bootstrap
import { Nav, Navbar } from "react-bootstrap";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Container } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";

// icons
import { GiHamburgerMenu } from "react-icons/gi";
import { HiOutlineLogout } from "react-icons/hi";

// auth
import { useSignOut } from "react-auth-kit";

import "./navtop.css";

import { Aside } from "./../aside/Aside";

export const NavTop = ({ bc, name, ...props }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const signOut = useSignOut();

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
            Signed in as:
            <Dropdown className="d-inline mx-2" align="end">
              <Dropdown.Toggle id="dropdown-autoclose-true">
                {localStorage.getItem("username")}
              </Dropdown.Toggle>

              <Dropdown.Menu className="dropdown-body shadow-sm rounded">
                {/* Sign Out Button */}
                <NavLink
                  exact
                  to={"/silakend-login"}
                  className="logout dropdown-item d-flex ms-2"
                  onClick={() => signOut()}
                >
                  Logout
                  <HiOutlineLogout className="logout-icon ms-2 fs-4" />
                </NavLink>
                {/* Sign Out Button */}
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
