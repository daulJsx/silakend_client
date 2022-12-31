import React, { useState } from "react";

// fetch data requirement
import { useQuery } from "react-query";

// import axios from "axios";
import FetchUsers from "../../consAPI/FetchUsers";

// Navigating
import { Navigate } from "react-router-dom";

// For checking user have done in authentication
import { useAuthUser } from "react-auth-kit";

// Bootstrap components
import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";

// Components
import { Aside } from "../../components/aside/Aside";
import { NavTop } from "../../components/navtop/NavTop";
import { Footer } from "../../components/footer/Footer";

// Icons
import { FaUserTie } from "react-icons/fa";

export const Drivers = () => {
  const auth = useAuthUser();
  // Fetching users as driver
  const {
    data: usersData,
    error,
    isLoading,
    isError,
  } = useQuery(["users", 10], FetchUsers);

  if (localStorage.getItem("token") && auth()) {
    if (isError) {
      return <div>{error.message}</div>;
    } else if (isLoading) {
      return (
        <div className="loading-io">
          <div className="loadingio-spinner-ripple-bc4s1fo5ntn">
            <div className="ldio-c0sicszbk9i">
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <>
          <Container fluid>
            <Row>
              {/* SIDEBAR */}
              <Col
                xs="auto"
                className="d-none d-lg-block d-flex min-vh-100 px-4"
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
                        bc={<FaUserTie />}
                        parentLink={"/data-pengemudi"}
                      />
                    ))}
                  </Col>
                </Row>
                {/* NAVBAR */}
                <main className="min-vh-100 px-2 mt-4">
                  <Row>
                    <Col>
                      <Card>
                        <Card.Body>
                          <Card.Title className="fs-4 p-4 fw-semibold color-primary">
                            Data Pengemudi
                          </Card.Title>

                          <Table bordered hover responsive>
                            <thead>
                              <tr>
                                <th>No</th>
                                <th>NAMA PENGEMUDI</th>
                                <th>PERAN</th>
                              </tr>
                            </thead>
                            <tbody>
                              {usersData?.map((users, index) =>
                                users.role.map((userAsDriver) => {
                                  return userAsDriver.name == "Driver" ? (
                                    <tr>
                                      <td key={users.user_id}>{index + 1}</td>
                                      <td>{users.name}</td>
                                      <td>{userAsDriver.name}</td>
                                    </tr>
                                  ) : null;
                                })
                              )}
                            </tbody>
                          </Table>
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
        </>
      );
    }
  } else {
    return <Navigate to="/silakend-login" />;
  }
};
