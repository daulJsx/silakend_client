import React, { useState, useEffect } from "react";

// Interceptors
import axios from "axios";

// Functions
import { SecuringPage } from "../../functions/Securing/SecuringPage";

// Cookies JS
import Cookies from "js-cookie";

// For checking user have done in authentication
import { useAuthUser } from "react-auth-kit";

// Navigating
import { Navigate, NavLink } from "react-router-dom";

// bootstrap components
import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Breadcrumb from "react-bootstrap/Breadcrumb";

// Components
import { Aside } from "./../../components/aside/Aside";
import { NavTop } from "../../components/navtop/NavTop";
import { Footer } from "../../components/footer/Footer";

// icons
import { FaArrowLeft } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import { TbUsers } from "react-icons/tb";

// React Notification
import swal from "sweetalert";

export const UserDetail = () => {
  // get access token
  const token = Cookies.get("token");

  const auth = useAuthUser();

  // Initialize newest maintenance id
  const userId = localStorage.getItem("user_id");

  // initialize the loading
  const [isLoading, setIsLoading] = useState(true);

  // catch the current user from fetchCurrentUser
  const [userToMap, setUserToMap] = useState(null);

  useEffect(() => {
    const accessToken = Cookies.get("token");
    const currentUserId = localStorage.getItem("user_id");

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    async function fetchCurrentUser() {
      try {
        await axios
          .get(`https://silakend-server.xyz/api/users/${currentUserId}`, config)
          .then((response) => {
            if (response.status === 200) {
              setIsLoading(false);
              const currentUser = response.data;
              if (currentUser.length !== 0) {
                setUserToMap(currentUser);
              }
            }
          });
      } catch (error) {
        if (error.response) {
          const { message, msg } = error.response.data;
          if (message) {
            swal("Ups!", message, "error");
          } else {
            swal("Ups!", msg, "error");
          }
        } else {
          swal("Ups!", "Something went wrong", "error");
        }
      }
    }

    fetchCurrentUser();
  }, []);

  return token ? (
    auth().user_level === 1 ? (
      userId ? (
        isLoading ? (
          <div className="loading-io">
            <div className="loadingio-spinner-ripple-bc4s1fo5ntn">
              <div className="ldio-c0sicszbk9i">
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
        ) : (
          <Container fluid>
            <Row>
              {/* SIDEBAR */}
              <Col
                xs="auto"
                className="sidebar d-none d-lg-block d-flex min-vh-100 px-4"
              >
                <Aside />
              </Col>
              {/* SIDEBAR */}

              <Col>
                {/* NAVBAR */}
                <Row>
                  <Col>
                    {["end"].map((placement, idx) => (
                      <NavTop
                        key={idx}
                        placement={placement}
                        name={placement}
                        bc={<FaArrowLeft />}
                        parentLink={"/data-pengguna"}
                      />
                    ))}
                  </Col>
                </Row>
                {/* NAVBAR */}

                <main className="px-2 min-vh-100 mt-4">
                  <Row>
                    <Col>
                      <Card className="shadow bg__primary">
                        <Card.Header>
                          <Container>
                            <Row className="gap-3 mt-4">
                              <Col>
                                <h3 className="main__title">Data Pengguna</h3>
                                <Breadcrumb className="breadcrumb__item mt-3">
                                  <Breadcrumb.Item className="breadcrumb__item">
                                    <div className="d-flex justify-content-center align-items-center gap-2">
                                      <NavLink
                                        to={"/data-pengguna"}
                                        className="d-flex justify-content-center align-items-center text-muted gap-2"
                                      >
                                        <TbUsers className="fs-5" />
                                        Data
                                      </NavLink>

                                      <FiChevronRight className="fs-6 breadcrumb__divider" />
                                      <span className="color-primary">
                                        Rincian Pengguna
                                      </span>
                                    </div>
                                  </Breadcrumb.Item>
                                </Breadcrumb>
                              </Col>
                            </Row>
                          </Container>
                        </Card.Header>

                        <Card.Body className="p-4">
                          <Container
                            className="p-4"
                            style={{ background: "#fff", borderRadius: "10px" }}
                          >
                            <ListGroup as="ol" variant="flush" className="mb-2">
                              {userToMap !== ""
                                ? userToMap.map((currentUser) => (
                                    <>
                                      <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                      >
                                        <div className="ms-2 me-auto">
                                          <div className="list__title">NIP</div>
                                          {currentUser.nip}
                                        </div>
                                      </ListGroup.Item>
                                      <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                      >
                                        <div className="ms-2 me-auto">
                                          <div className="list__title">
                                            NAMA
                                          </div>
                                          {currentUser.name}
                                        </div>
                                      </ListGroup.Item>
                                      <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                      >
                                        <div className="ms-2 me-auto">
                                          <div className="list__title">
                                            ALAMAT
                                          </div>
                                          {currentUser.address}
                                        </div>
                                      </ListGroup.Item>
                                      <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                      >
                                        <div className="ms-2 me-auto">
                                          <div className="list__title">
                                            TELEPON
                                          </div>
                                          {currentUser.phone}
                                        </div>
                                      </ListGroup.Item>

                                      <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                      >
                                        <div className="ms-2 me-auto">
                                          <div className="list__title">
                                            EMAIL
                                          </div>
                                          {currentUser.email}
                                        </div>
                                      </ListGroup.Item>

                                      <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                      >
                                        <div className="ms-2 me-auto">
                                          <div className="list__title">
                                            UNIT KERJA
                                          </div>
                                          {currentUser.job_unit.name}
                                        </div>
                                      </ListGroup.Item>

                                      <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                      >
                                        <div className="ms-2 me-auto">
                                          <div className="list__title">
                                            PERAN
                                          </div>
                                          {currentUser.role.length !== 0 ? (
                                            currentUser.role.map(
                                              (userRole, index) => {
                                                return (
                                                  <ul className="rolesList">
                                                    <li key={index}>
                                                      {index + 1}.{" "}
                                                      {userRole.name}
                                                    </li>
                                                  </ul>
                                                );
                                              }
                                            )
                                          ) : (
                                            <p>
                                              Pengguna ini belum memiliki peran
                                            </p>
                                          )}
                                        </div>
                                      </ListGroup.Item>
                                    </>
                                  ))
                                : null}
                            </ListGroup>
                          </Container>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </main>

                <Row>
                  <Col>
                    <Footer />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        )
      ) : (
        <Navigate to="/data-pengguna" />
      )
    ) : (
      SecuringPage()
    )
  ) : (
    <Navigate to="/silakend-login" />
  );
};
