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
import { UpdateVUAsUser } from "../../functions/Update/UpdateVUAsUser";

// Navigating
import { NavLink } from "react-router-dom";
import { Navigate } from "react-router-dom";

// Bootstrap components
import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

// Components
import { AsideUser } from "../../components/aside/AsideUser";
import { NavTop } from "../../components/navtop/NavTop";
import { Footer } from "../../components/footer/Footer";

// icons
import { HiOutlineClipboardList } from "react-icons/hi";
import { FaInfo } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";

import toast, { Toaster } from "react-hot-toast";

export const UserVUsages = () => {
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
        <Toaster position="bottom-right" reverseOrder={false} />
        <Row>
          <Col xs="auto" className="d-none d-lg-block d-flex min-vh-100 px-4">
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
                            Data Pengajuan Peminjaman Kendaraan Dinas Anda
                          </span>
                        </Card.Title>

                        <Table bordered hover responsive>
                          <thead>
                            <tr>
                              <th>No</th>
                              <th>KATEGORI PEMINJAMAN</th>
                              <th>DESTINASI</th>
                              <th>WAKTU PINJAM</th>
                              <th>EDIT</th>
                              <th>RINCIAN</th>
                              <th>BATALKAN PENGAJUAN</th>
                            </tr>
                          </thead>
                          <tbody>
                            {ordersData.map((orders, index) => {
                              return orders.status !== "CANCELED" ? (
                                <tr key={orders.usage_id}>
                                  <td>{index + 1}</td>
                                  <td>{orders.category.name}</td>
                                  <td>{orders.destination}</td>
                                  <td>
                                    {orders.start_date} s/d {orders.end_date}
                                  </td>
                                  <td>
                                    <NavLink
                                      to={
                                        "/user/data-pengajuan-peminjaman/edit-pengajuan"
                                      }
                                    >
                                      <Button
                                        className="btn btn-edit"
                                        onClick={() => GetOrderId(orders)}
                                      >
                                        <AiFillEdit className="fs-6" />
                                      </Button>
                                    </NavLink>
                                  </td>
                                  <td align="center">
                                    <NavLink
                                      to={
                                        "/user/data-pengajuan-peminjaman/rincian-peminjaman"
                                      }
                                    >
                                      <Button
                                        onClick={() => GetOrderId(orders)}
                                        className="btn btn-detail"
                                      >
                                        <FaInfo className="fs-6" />
                                      </Button>
                                    </NavLink>
                                  </td>
                                  <td align="center" className="bg-danger">
                                    <Button
                                      className="btn-danger btn-delete"
                                      onClick={() =>
                                        UpdateVUAsUser(orders, auth().user_id)
                                      }
                                    >
                                      Batalkan
                                    </Button>
                                  </td>
                                </tr>
                              ) : null;
                            })}
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
    )
  ) : (
    <Navigate to="/silakend-login" />
  );
};
