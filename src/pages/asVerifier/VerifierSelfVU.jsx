import React, { useEffect } from "react";

// Push notify
import Push from "push.js";

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

// Navigating
import { NavLink } from "react-router-dom";
import { Navigate } from "react-router-dom";

// Bootstrap components
import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Breadcrumb from "react-bootstrap/Breadcrumb";

// Components
import { AsideVerifier } from "../../components/aside/AsideVerifier";
import { NavTop } from "../../components/navtop/NavTop";
import { Footer } from "../../components/footer/Footer";

// icons
import { FiChevronRight } from "react-icons/fi";
import { HiOutlineClipboardList } from "react-icons/hi";
import { FaInfo } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";

export const VerifierSelfVU = () => {
  // Listener
  // useEffect(() => {
  //   window.Echo.channel("vehicleusage").listen("VehicleUsageUpdate", (e) => {
  //     Push.create("Info Data Peminjaman", {
  //       body: e.vehicleUsage,
  //       icon: "/polman.ico",
  //       timeout: 4000,
  //       onClick: function () {
  //         window.focus();
  //         this.close();
  //       },
  //     });
  //     // Setelah tampil, refetch data
  //     FetchVehicleUsages();
  //   });
  // }, []);
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
            <AsideVerifier />
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
                    bc={<HiOutlineClipboardList />}
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
                              Pengajuan Peminjaman Kendaraan Dinas Anda
                            </h3>
                            <Breadcrumb className="breadcrumb__item mt-3">
                              <Breadcrumb.Item className="breadcrumb__item">
                                <div className="d-flex color-primary justify-content-center align-items-center gap-2 breadcrumb__text">
                                  <HiOutlineClipboardList className="fs-5" />
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
                                  <th>KATEGORI PEMINJAMAN</th>
                                  <th>DESTINASI</th>
                                  <th>WAKTU PINJAM</th>
                                  <th>STATUS</th>
                                  <th>EDIT</th>
                                  <th>RINCIAN</th>
                                </tr>
                              </thead>
                              <tbody>
                                {ordersData.map((orders) => {
                                  const startDate = new Date(orders.start_date);
                                  const endDate = new Date(orders.end_date);

                                  // Date formatter
                                  const startOptions = {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  };
                                  const endOptions = {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  };

                                  const formattedStartDate =
                                    startDate.toLocaleDateString(
                                      "id-ID",
                                      startOptions
                                    );
                                  const formattedEndDate =
                                    endDate.toLocaleDateString(
                                      "id-ID",
                                      endOptions
                                    );
                                  return orders.status !== "DONE" &&
                                    orders.user.name === auth().user_name ? (
                                    <tr key={orders.usage_id}>
                                      <td>{(index += 1)}</td>
                                      <td>{orders.category.name}</td>
                                      <td>{orders.destination}</td>
                                      <td>
                                        {formattedStartDate} -{" "}
                                        {formattedEndDate}
                                      </td>
                                      <td>
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

                                      <td>
                                        {orders.status === "APPROVED" ? (
                                          <NavLink
                                            to={
                                              "/verifier/pengajuan-saya/edit-pengajuan"
                                            }
                                          >
                                            <Button
                                              className="btn-warning btn-edit"
                                              onClick={() => GetOrderId(orders)}
                                            >
                                              <AiFillEdit className="fs-6" />
                                            </Button>
                                          </NavLink>
                                        ) : null}
                                      </td>

                                      <td>
                                        <NavLink
                                          to={
                                            "/verifier/pengajuan-saya/rincian-pengajuan"
                                          }
                                        >
                                          <Button
                                            onClick={() => GetOrderId(orders)}
                                            className="btn btn-detail position-relative"
                                          >
                                            {orders.status === "READY" ? (
                                              <Badge
                                                className="position-absolute top-0 start-100 translate-middle rounded-pill"
                                                bg="danger"
                                              >
                                                !
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
    <Navigate to="/silakend-login" />
  );
};
