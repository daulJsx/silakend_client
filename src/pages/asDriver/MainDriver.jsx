import React from "react";

// Cookies JS
import Cookies from "js-cookie";

// Fetching requirement
import { useQuery } from "react-query";

// Fetch data
import FetchVehicleUsages from "../../consAPI/FetchVehicleUsages";

// For checking user have done in authentication
import { useAuthUser } from "react-auth-kit";

// Functions
import { GetOrderId } from "../../functions/GetOrderId";
import { SecuringPage } from "../../functions/Securing/SecuringPage";

// Navigating
import { NavLink, Navigate } from "react-router-dom";

// Bootstrap components
import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Badge from "react-bootstrap/Badge";
import Breadcrumb from "react-bootstrap/Breadcrumb";

// Components
import { AsideDriver } from "../../components/aside/AsideDriver";
import { NavTop } from "../../components/navtop/NavTop";
import { Footer } from "../../components/footer/Footer";

// icons
import { FiChevronRight } from "react-icons/fi";
import { TbSteeringWheel } from "react-icons/tb";
import { FaInfo } from "react-icons/fa";

export const MainDriver = () => {
  // Get access token
  const token = Cookies.get("token");

  const auth = useAuthUser();

  // Fetching orders data
  const {
    data: ordersData,
    error,
    isLoading,
    isError,
  } = useQuery("orders", FetchVehicleUsages);

  // Numbering row
  let index = 0;

  return token ? (
    isError ? (
      <div>{error.message}</div>
    ) : auth().user_level === 4 ? (
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
            <Col xs="auto" className="d-none d-lg-block d-flex min-vh-100 px-4">
              <AsideDriver />
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
                      bc={<TbSteeringWheel />}
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
                          <Row className="gap-3 mt-4 me-3">
                            <Col>
                              <h3 className="main__title">
                                Daftar Tugas Masuk
                              </h3>
                              <Breadcrumb className="breadcrumb__item mt-3">
                                <Breadcrumb.Item className="breadcrumb__item">
                                  <div className="d-flex color-primary justify-content-center align-items-center gap-2 breadcrumb__text">
                                    <TbSteeringWheel className="fs-5" />
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
                              {ordersData.length === 0 ? (
                                <Alert
                                  className="alert__customPrimary"
                                  style={{ border: "none" }}
                                >
                                  <p>Belum ada tugas masuk.</p>
                                </Alert>
                              ) : (
                                <Table hover responsive>
                                  <thead>
                                    <tr>
                                      <th>No</th>
                                      <th>PEMINJAM</th>
                                      <th>DESTINASI</th>
                                      <th>WAKTU PINJAM</th>
                                      <th>STATUS</th>

                                      <th>RINCIAN</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {ordersData.map((orders) => {
                                      return orders.status !== "DONE" ? (
                                        <tr key={orders.usage_id}>
                                          <td>{(index += 1)}</td>
                                          <td>{orders.user.name}</td>
                                          <td>{orders.destination}</td>
                                          <td>
                                            {orders.start_date} s/d{" "}
                                            {orders.end_date}
                                          </td>
                                          <td align="center">
                                            <Badge
                                              bg={
                                                orders.status === "CANCELED" ||
                                                orders.status === "REJECTED"
                                                  ? "danger"
                                                  : orders.status === "WAITING"
                                                  ? "warning"
                                                  : orders.status === "READY"
                                                  ? "primary"
                                                  : orders.status === "APPROVED"
                                                  ? "info"
                                                  : orders.status === "PROGRESS"
                                                  ? "secondary"
                                                  : "success"
                                              }
                                            >
                                              {orders.status === "CANCELED"
                                                ? "Batal"
                                                : orders.status === "REJECTED"
                                                ? "Ditolak"
                                                : orders.status === "WAITING"
                                                ? "Diajukan"
                                                : orders.status === "READY"
                                                ? "Siap Berangkat"
                                                : orders.status === "APPROVED"
                                                ? "Disetujui"
                                                : orders.status === "PROGRESS"
                                                ? "Berlangsung"
                                                : "Selesai"}
                                            </Badge>
                                          </td>

                                          <td align="center">
                                            <NavLink
                                              to={
                                                "/driver/tugas-masuk/rincian-tugas"
                                              }
                                            >
                                              <Button
                                                onClick={() =>
                                                  GetOrderId(orders)
                                                }
                                                className="btn btn-detail position-relative"
                                              >
                                                {orders.status === "PROGRESS" ||
                                                orders.status === "READY" ? (
                                                  <Badge
                                                    className="position-absolute top-0 start-100 translate-middle p-2 border border-light rounded-circle"
                                                    bg="danger"
                                                  >
                                                    <span class="visually-hidden">
                                                      New alerts
                                                    </span>
                                                  </Badge>
                                                ) : null}
                                                <FaInfo className="fs-6" />
                                              </Button>
                                            </NavLink>
                                          </td>
                                        </tr>
                                      ) : null;
                                    })}
                                  </tbody>
                                </Table>
                              )}
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
