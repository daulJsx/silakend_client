import React, { useState } from "react";

// Fetching requirement
import { useQuery } from "react-query";

// Fetch data
import FetchVehicleUsages from "../../consAPI/FetchVehicleUsages";

// For checking user have done in authentication
import { useAuthUser } from "react-auth-kit";

// Navigating
import { NavLink } from "react-router-dom";
import { Navigate } from "react-router-dom";

// Bootstrap components
import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Alert from "react-bootstrap/Alert";

// Components
import { AsideUser } from "../../components/aside/AsideUser";
import { NavTop } from "../../components/navtop/NavTop";
import { Footer } from "../../components/footer/Footer";

// icons
import { HiOutlineClipboardList } from "react-icons/hi";
import { FaInfo } from "react-icons/fa";

export const UserVUsages = () => {
  const auth = useAuthUser();

  // Fetching orders data
  const {
    data: ordersData,
    error,
    isLoading,
    isError,
  } = useQuery("orders", FetchVehicleUsages);

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
              <Col
                xs="auto"
                className="d-none d-lg-block d-flex min-vh-100 px-4"
              >
                <AsideUser />
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
                        bc={<HiOutlineClipboardList />}
                      />
                    ))}
                  </Col>
                </Row>
                {/* NAVBAR */}

                <main className="px-2 min-vh-100">
                  <Row>
                    <Col>
                      {ordersData.length === 0 ? (
                        <Alert variant="warning" style={{ border: "none" }}>
                          <Alert.Heading>
                            Anda Belum Mengajukan Peminjaman Kendaraan Dinas
                          </Alert.Heading>
                          <p>
                            Silahkan buat pengajuan kendaraan pada halaman buat
                            pengajuan.
                          </p>
                        </Alert>
                      ) : (
                        <Card>
                          <Card.Body>
                            <Card.Title className="fs-4 p-4 fw-semibold color-primary">
                              <span className="me-2">
                                Data Pengajuan Peminjaman Kendaraan Dinas
                              </span>
                            </Card.Title>

                            <Table bordered hover responsive>
                              <thead>
                                <tr>
                                  <th>No</th>
                                  <th>PEMINJAM</th>
                                  <th>TANGGAL PINJAM</th>
                                  <th>ALASAN PEMINJAMAN</th>
                                  <th>STATUS</th>
                                  <th>AKSI</th>
                                  <th>RINCIAN</th>
                                </tr>
                              </thead>
                              <tbody>
                                {ordersData?.map((orders, index) => (
                                  <tr>
                                    <td key={orders.usage_id}>{index + 1}</td>
                                    <td>{orders.user.name}</td>
                                    <td>{orders.start_date}</td>
                                    <td>{orders.usage_description}</td>
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
                                          ? "Verifying"
                                          : orders.status === "READY"
                                          ? "Siap berangkat"
                                          : orders.status === "APPROVED"
                                          ? "Disetujui"
                                          : orders.status === "PROGRESS"
                                          ? "Berlangsung"
                                          : "Selesai"}
                                      </Badge>
                                    </td>

                                    <td align="center">
                                      <>
                                        <NavLink
                                          to={
                                            "/user/pengajuan-peminjaman/rincian-pengajuan"
                                          }
                                        >
                                          <Button
                                            //  onClick={() => GetOrderId(orders)}
                                            className="btn btn-detail"
                                          >
                                            <FaInfo className="fs-6" />
                                          </Button>
                                        </NavLink>
                                      </>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                          </Card.Body>
                        </Card>
                      )}
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
