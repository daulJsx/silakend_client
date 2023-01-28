import React from "react";

// fetch data requirement
import { useQuery } from "react-query";

// Cookies JS
import Cookies from "js-cookie";

// import axios from "axios";
import FetchUsers from "../../consAPI/FetchUsers";

// Navigating
import { Navigate } from "react-router-dom";

// For checking user have done in authentication
import { useAuthUser } from "react-auth-kit";

// Functions
import { SecuringPage } from "../../functions/Securing/SecuringPage";

// Bootstrap components
import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Breadcrumb from "react-bootstrap/Breadcrumb";

// Components
import { Aside } from "../../components/aside/Aside";
import { NavTop } from "../../components/navtop/NavTop";
import { Footer } from "../../components/footer/Footer";

// Icons
import { FaUserTie } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";

export const Drivers = () => {
  const auth = useAuthUser();

  // Fetching users as driver
  const {
    data: usersData,
    error,
    isLoading,
    isError,
  } = useQuery(["users", 10], FetchUsers);

  // Get access token
  const token = Cookies.get("token");

  let index = 0;

  return token ? (
    auth().user_level === 1 || auth().user_level === 2 ? (
      isError ? (
        <div>{error.message}</div>
      ) : isLoading ? (
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
            <Col xs="auto" className="d-none d-lg-block d-flex min-vh-100 px-4">
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
                      bc={<FaUserTie />}
                      parentLink={"/data-pengemudi"}
                    />
                  ))}
                </Col>
              </Row>
              {/* NAVBAR */}

              <main className="px-2 min-vh-100 mt-4">
                <Row>
                  <Col>
                    <Card className="shadow rounded bg__primary">
                      <Card.Header>
                        <Container>
                          <Row className="gap-3 mt-4">
                            <Col>
                              <h3 className="main__title"> Pengemudi</h3>
                            </Col>
                          </Row>
                        </Container>
                      </Card.Header>
                      <Card.Body className="p-4">
                        <Container
                          className="p-4"
                          style={{ background: "#fff", borderRadius: "10px" }}
                        >
                          <Row>
                            <Col>
                              <Table hover responsive>
                                <thead>
                                  <tr>
                                    <th>No</th>
                                    <th>NAMA PENGEMUDI</th>
                                    <th>PERAN</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {usersData.map((users) =>
                                    users.role.map((userAsDriver) => {
                                      return userAsDriver.level === 4 ? (
                                        <tr key={users.user_id}>
                                          <td>{(index += 1)}</td>
                                          <td>{users.name}</td>
                                          <td>{userAsDriver.name}</td>
                                        </tr>
                                      ) : null;
                                    })
                                  )}
                                </tbody>
                              </Table>
                            </Col>
                          </Row>
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
      SecuringPage()
    )
  ) : (
    <Navigate to="/silakend-login" />
  );
};
