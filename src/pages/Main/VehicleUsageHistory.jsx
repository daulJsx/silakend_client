import React from "react";

// fetch data requirement
import { useQuery } from "react-query";
import FetchVehicleUsages from "../../consAPI/FetchVehicleUsages";

// Cookies JS
import Cookies from "js-cookie";

// Navigating
import { NavLink } from "react-router-dom";
import { Navigate } from "react-router-dom";

// Bootstrap components
import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { Breadcrumb } from "react-bootstrap";

// Components
import { Aside } from "../../components/aside/Aside";
import { NavTop } from "../../components/navtop/NavTop";
import { Footer } from "../../components/footer/Footer";

// Icons
import { FiClock } from "react-icons/fi";
import { FaInfo } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import { AiFillEdit } from "react-icons/ai";

// Functions
import { GetOrderId } from "../../functions/GetOrderId";
import { SecuringPage } from "../../functions/Securing/SecuringPage";

// For checking user have done in authentication
import { useAuthUser } from "react-auth-kit";

export const VehicleUsageHistory = () => {
  const auth = useAuthUser();
  // Fetching orders data
  const {
    data: ordersData,
    error,
    isLoading,
    isError,
  } = useQuery("orders", FetchVehicleUsages);

  // Get access token
  const token = Cookies.get("token");

  // Numbering row
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
            <Col xs="auto" className="d-none d-lg-block d-flex min-vh-100 px-4">
              <Aside />
            </Col>
            <Col>
              {/* NAVBAR */}
              <Row>
                <Col>
                  {["end"].map((placement, idx) => (
                    <NavTop
                      key={idx}
                      placement={placement}
                      name={placement}
                      bc={<FiClock />}
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
                              <h3 className="main__title">
                                Riwayat Peminjaman Kendaraan Dinas
                              </h3>
                              <Breadcrumb className="breadcrumb__item mt-3">
                                <Breadcrumb.Item
                                  className="breadcrumb__item"
                                  href="#"
                                >
                                  <div className="d-flex color-primary justify-content-center align-items-center gap-2 breadcrumb__text">
                                    <FiClock className="fs-5" />
                                    Data
                                    <FiChevronRight className="fs-6 breadcrumb__divider" />
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
                          <Row>
                            <Col>
                              <Table hover responsive>
                                <thead>
                                  <tr>
                                    <th>No</th>
                                    <th>PEMINJAM</th>
                                    <th>WAKTU PINJAM</th>
                                    <th>STATUS</th>
                                    <th>RINCIAN</th>
                                    {auth().user_level === 1 ? (
                                      <th>EDIT</th>
                                    ) : null}
                                  </tr>
                                </thead>
                                <tbody>
                                  {ordersData?.map((orders) => {
                                    return orders.status === "DONE" ? (
                                      <tr key={orders.usage_id}>
                                        <td>{(index += 1)}</td>
                                        <td>{orders.user.name}</td>
                                        <td>
                                          {orders.start_date} s/d{" "}
                                          {orders.end_date}
                                        </td>

                                        <td>
                                          <Badge bg={"success"}>
                                            {orders.status}
                                          </Badge>
                                        </td>

                                        <td>
                                          <>
                                            <NavLink
                                              to={
                                                "/riwayat-peminjaman/rincian-peminjaman"
                                              }
                                            >
                                              <Button
                                                onClick={() =>
                                                  GetOrderId(orders)
                                                }
                                                className="btn btn-detail"
                                              >
                                                <FaInfo className="fs-6" />
                                              </Button>
                                            </NavLink>
                                          </>
                                        </td>
                                        {auth().user_level === 1 ? (
                                          <td>
                                            {orders.status !== "CANCELED" ? (
                                              <NavLink
                                                to={
                                                  "/pengajuan-peminjaman/edit-data-pengajuan"
                                                }
                                              >
                                                <Button
                                                  onClick={() =>
                                                    GetOrderId(orders)
                                                  }
                                                  className="btn-warning btn-edit position-relative"
                                                >
                                                  <AiFillEdit className="fs-6" />
                                                </Button>
                                              </NavLink>
                                            ) : null}
                                          </td>
                                        ) : null}
                                      </tr>
                                    ) : null;
                                  })}
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
