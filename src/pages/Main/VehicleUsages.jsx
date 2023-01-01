import React, { useState } from "react";

// fetch data requirement
import { useQuery } from "react-query";
import FetchVehicleUsages from "../../consAPI/FetchVehicleUsages";
import axios from "axios";

// Navigating
import { NavLink } from "react-router-dom";
import { Navigate } from "react-router-dom";

// Bootstrap components
import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";

// Components
import { Aside } from "../../components/aside/Aside";
import { NavTop } from "../../components/navtop/NavTop";
import { Footer } from "../../components/footer/Footer";
import InfoVehicleUsage from "../../components/popup/InfoVehicleUsage";

// Icons
import { HiClipboardCopy } from "react-icons/hi";
import { HiPlusSm } from "react-icons/hi";
import { AiFillEdit } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import { FaInfo } from "react-icons/fa";

// Pass parameters
import { GetOrderId } from "../../functions/GetOrderId";
import { DeleteVU } from "../../functions/Delete/DeleteVU";

// For checking user have done in authentication
import { useAuthUser } from "react-auth-kit";

export const VehicleUsages = () => {
  const auth = useAuthUser();
  // Fetching orders data
  const {
    data: ordersData,
    error,
    isLoading,
    isError,
  } = useQuery("orders", FetchVehicleUsages);

  // Get VU By ID
  const [currentOrder, setCurrentOrder] = useState("");

  //   Launch the pop up
  const [modalShow, setModalShow] = useState(false);
  const handleInfoOrder = (orderId) => {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };

    try {
      const response = axios
        .get(`https://silakend-server.xyz/api/vehicleusages/${orderId}`, config)
        .then((res) => {
          const orderById = res.data;
          setCurrentOrder(orderById);
          setModalShow(true);
        });

      return response;
    } catch (error) {
      console.log(error);
    }
  };

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
                        bc={<HiClipboardCopy />}
                      />
                    ))}
                  </Col>
                </Row>
                {/* NAVBAR */}

                <div className="me-1 d-flex justify-content-end">
                  <Row className="py-4 mb-2">
                    <Col>
                      <NavLink to={"/order-peminjaman/buat-order"}>
                        <Button className="btn btn-add side-menu d-flex gap-1 align-items-center justify-content-senter">
                          Buat Order Baru
                          <HiPlusSm className="fs-3" />
                        </Button>
                      </NavLink>
                    </Col>
                  </Row>
                </div>

                <main className="px-2 min-vh-100">
                  <Row>
                    <Col>
                      <Card>
                        <Card.Body>
                          <Card.Title className="fs-4 p-4 fw-semibold color-primary">
                            <span className="me-2">Data Order Peminjaman</span>
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

                                  <td>
                                    <div className="d-flex gap-1 justify-content-center">
                                      <NavLink
                                        to={"/order-peminjaman/edit-order"}
                                      >
                                        <Button
                                          onClick={() => GetOrderId(orders)}
                                          className="btn btn-edit"
                                        >
                                          <AiFillEdit className="fs-6" />
                                        </Button>
                                      </NavLink>

                                      <Button
                                        onClick={() =>
                                          DeleteVU(orders.usage_id)
                                        }
                                        className="btn-danger btn-delete"
                                      >
                                        <FaTrashAlt className="fs-6" />
                                      </Button>
                                    </div>
                                  </td>
                                  <td align="center">
                                    <>
                                      <Button
                                        onClick={() => {
                                          handleInfoOrder(orders.usage_id);
                                        }}
                                        className="btn btn-detail"
                                      >
                                        <FaInfo className="fs-6" />
                                      </Button>
                                      <InfoVehicleUsage
                                        currentOrder={currentOrder}
                                        show={modalShow}
                                        onHide={() => setModalShow(false)}
                                      />
                                    </>
                                  </td>
                                </tr>
                              ))}
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
