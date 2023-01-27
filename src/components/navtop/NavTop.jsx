import { React, useState } from "react";

// get current user auth data
import { useAuthUser } from "react-auth-kit";

// Routing
import { NavLink } from "react-router-dom";

// Logout function
import { LogOut } from "../../functions/Auth/LogOut";

// bootstrap
import { Nav, Navbar } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";

// icons
import { GiHamburgerMenu } from "react-icons/gi";
import { HiOutlineLogout } from "react-icons/hi";

import "./navtop.css";

import { Aside } from "./../aside/Aside";
import { AsideUser } from "../aside/AsideUser";
import { AsideVerifier } from "../aside/AsideVerifier";
import { AsideDriver } from "../aside/AsideDriver";

export const NavTop = ({ bc, parentLink, onClick, title, name, ...props }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const auth = useAuthUser();

  return (
    <Navbar className="px-2 mt-4">
      <Navbar.Brand>
        <NavLink to={parentLink}>
          <div className="bc-icon fs-3">{bc}</div>
        </NavLink>
      </Navbar.Brand>

      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text className="d-none d-lg-block">
          Signed in as:
          <Dropdown className="d-inline mx-2" align="end">
            <Dropdown.Toggle id="dropdown-autoclose-true">
              {auth() ? auth().user_name : null}
            </Dropdown.Toggle>

            <Dropdown.Menu className="dropdown-body shadow-sm rounded">
              {/* Sign Out Button */}
              <NavLink
                exactcontent
                to={"/silakend-login"}
                className="logout dropdown-item d-flex ms-2"
                onClick={() => LogOut()}
              >
                Log Out
                <HiOutlineLogout className="logout-icon ms-2 fs-4" />
              </NavLink>
              {/* Sign Out Button */}
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Text>

        <Nav.Item className="d-block d-lg-none">
          <Button className="button-toggle" size="lg" onClick={handleShow}>
            <GiHamburgerMenu />
          </Button>
        </Nav.Item>

        <Offcanvas
          show={show}
          onHide={handleClose}
          {...props}
          className="d-xl-none d-lg-none"
        >
          <Offcanvas.Header closeButton>
            <Navbar.Text className="nav-text d-flex align-items-center">
              Signed in as:
              <Dropdown className="d-inline mx-2" align="end">
                <Dropdown.Toggle id="dropdown-autoclose-true">
                  {auth() ? auth().user_name : null}
                </Dropdown.Toggle>

                <Dropdown.Menu className="dropdown-body shadow-sm rounded">
                  {/* Sign Out Button */}
                  <NavLink
                    exact
                    to={"/silakend-login"}
                    className="logout dropdown-item d-flex ms-2"
                    onClick={() => LogOut()}
                  >
                    Logout
                    <HiOutlineLogout className="logout-icon ms-2 fs-4" />
                  </NavLink>
                  {/* Sign Out Button */}
                </Dropdown.Menu>
              </Dropdown>
            </Navbar.Text>
          </Offcanvas.Header>

          <Offcanvas.Body>
            {auth().user_level === 1 || auth().user_level === 2 ? (
              <Aside />
            ) : auth().user_level === 3 ? (
              <AsideVerifier />
            ) : auth().user_level === 4 ? (
              <AsideDriver />
            ) : (
              <AsideUser />
            )}
          </Offcanvas.Body>
        </Offcanvas>
      </Navbar.Collapse>
    </Navbar>
  );
};
