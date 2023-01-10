import { React, useState } from "react";

// get current user auth data
import { useAuthUser } from "react-auth-kit";

// Routing
import { NavLink, redirect } from "react-router-dom";

// Axios
import axios from "axios";

// bootstrap
import { Nav, Navbar } from "react-bootstrap";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Card from "react-bootstrap/Card";

// icons
import { GiHamburgerMenu } from "react-icons/gi";
import { HiOutlineLogout } from "react-icons/hi";

import swal from "sweetalert";
import "./navtop.css";

import { Aside } from "./../aside/Aside";

export const NavTop = ({ bc, parentLink, onClick, title, name, ...props }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const auth = useAuthUser();

  const logout = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const body = {
      body: {},
    };

    const logoutPost = await axios
      .post("https://silakend-server.xyz/api/auth/logout", body, config)
      .then((response) => {
        if (response.status === 200) {
          swal({
            title: "Berhasil Logout!",
            text: response.data.msg,
            icon: "success",
          });
          localStorage.clear();
          redirect("/silakend-login");
        }
      })
      .catch((error) => {
        if (error.response.data.message) {
          swal("Ups!", error.response.data.message, "error");
        } else {
          swal("Ups!", error.response.data.msg, "error");
        }
      });
    return logoutPost;
  };

  return (
    <div className="px-2">
      <Navbar className="navbar">
        <Card className="w-100">
          <Card.Body>
            <Nav.Item className="nav-item-start">
              <Breadcrumb>
                <Breadcrumb.Item className="mb-1">
                  <NavLink to={parentLink}>
                    <div className="bc-icon">{bc}</div>
                  </NavLink>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <span className="color-primary fw-semibold"> {title}</span>
                </Breadcrumb.Item>
              </Breadcrumb>
            </Nav.Item>

            <Nav className="justify-content-end gap-1 nav-item-end">
              <Navbar.Text className="nav-text d-none d-lg-block d-flex align-items-center">
                Signed in as:
                <Dropdown className="d-inline mx-2" align="end">
                  <Dropdown.Toggle id="dropdown-autoclose-true">
                    {auth() ? localStorage.getItem("username") : null}
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="dropdown-body shadow-sm rounded">
                    {/* Sign Out Button */}
                    <NavLink
                      exactcontent
                      to={"/silakend-login"}
                      className="logout dropdown-item d-flex ms-2"
                      onClick={() => logout()}
                    >
                      Logout
                      <HiOutlineLogout className="logout-icon ms-2 fs-4" />
                    </NavLink>
                    {/* Sign Out Button */}
                  </Dropdown.Menu>
                </Dropdown>
              </Navbar.Text>

              <Nav.Item className="d-block d-lg-none">
                <Button
                  className="button-toggle"
                  size="lg"
                  onClick={handleShow}
                >
                  <GiHamburgerMenu />
                </Button>
              </Nav.Item>

              <Offcanvas
                show={show}
                onHide={handleClose}
                {...props}
                responsive="lg"
                className="sidebar-mobile d-xl-none d-lg-none"
              >
                <Offcanvas.Header closeButton>
                  <Navbar.Text className="nav-text d-flex align-items-center">
                    Signed in as:
                    <Dropdown className="d-inline mx-2" align="end">
                      <Dropdown.Toggle id="dropdown-autoclose-true">
                        {auth() ? localStorage.getItem("username") : null}
                      </Dropdown.Toggle>

                      <Dropdown.Menu className="dropdown-body shadow-sm rounded">
                        {/* Sign Out Button */}
                        <NavLink
                          exact
                          to={"/silakend-login"}
                          className="logout dropdown-item d-flex ms-2"
                          onClick={() => logout()}
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
                  <Aside />
                </Offcanvas.Body>
              </Offcanvas>
            </Nav>
          </Card.Body>
        </Card>
      </Navbar>
    </div>
  );
};
