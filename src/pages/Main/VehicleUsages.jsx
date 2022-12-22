import React, { useState } from "react";

// fetch data requirement
import { useQuery } from "react-query";
import FetchVehicleUsages from "../../consAPI/FetchVehicleUsages";
import axios from "axios";

// Secured the page
import { useIsAuthenticated } from "react-auth-kit";
import { redirect } from "react-router-dom";

// Navigating
import { NavLink } from "react-router-dom";

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
import GetVechileUsagesById from "../../components/popup/GetVechileUsagesById";

// Icons
import { HiClipboardCopy } from "react-icons/hi";
import { AiFillPlusCircle } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import { FaInfo } from "react-icons/fa";

// CSS
import "../CustomStyles/vechiles.css";

export const VehicleUsages = () => {
  // Fetching orders data
  const {
    data: ordersData,
    error,
    isLoading,
    isError,
  } = useQuery("orders", FetchVehicleUsages);

  const [currentOrder, setCurrentOrder] = useState("");

  //   Launch the pop up
  const [modalShow, setModalShow] = useState(false);

  const handleInfoOrder = (orderId) => {
    // setCurrentOrder(orderId);
    // setModalShow(true);

    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };

    try {
      const response = axios
        .get(`http://silakend-server.xyz/api/vehicleusages/${orderId}`, config)
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

  if (useIsAuthenticated()) {
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
                        bc={<HiClipboardCopy />}
                        parentLink={"/order-peminjaman"}
                      />
                    ))}
                  </Col>
                </Row>
                {/* NAVBAR */}
                <Container fluid>
                  <Row>
                    <Col>
                      <main className="min-vh-100">
                        <Card>
                          <Card.Body className="p-0">
                            <Card.Title className="fs-3 p-4">
                              <NavLink to={"/order-peminjaman/buat-order"}>
                                <Button className="btn btn-add">
                                  Buat Order Baru
                                  <AiFillPlusCircle className="fs-3 ms-2" />
                                </Button>
                              </NavLink>
                              {/* Roles */}
                            </Card.Title>
                            <div className="w-full">
                              {/* <DataTable columns={columns} data={usersData} /> */}
                              <Table borderless hover size="sm" responsive>
                                <thead>
                                  <tr>
                                    <th>No</th>
                                    <th>PEMINJAM</th>
                                    <th>TANGGAL PINJAM</th>
                                    <th>ALASAN PEMINJAMAN</th>
                                    <th>KETERANGAN</th>
                                    <th>DESTINASI</th>
                                    <th>KATEGORI</th>
                                    {/* <th>PENGEMUDI</th> */}
                                    {/* <th>KENDARAAN</th> */}
                                    <th>AKSI</th>
                                    <th>Lihat Rincian</th>
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
                                            orders.status === "CANCELED"
                                              ? "danger"
                                              : orders.status === "WAITING"
                                              ? "warning"
                                              : "success"
                                          }
                                        >
                                          {orders.status === "CANCELED"
                                            ? "Batal"
                                            : orders.status === "WAITING"
                                            ? "Pending"
                                            : "Selesai"}
                                        </Badge>
                                      </td>
                                      <td>{orders.destination}</td>
                                      <td>{orders.category.name}</td>
                                      {/* <td>{orders.driver}</td> */}
                                      {/* <td>{orders.vehicle}</td> */}

                                      <td className="d-flex gap-1">
                                        <NavLink to={"/edit-pengguna"}>
                                          <Button className="btn btn-edit">
                                            <AiFillEdit className="fs-6" />
                                          </Button>
                                        </NavLink>
                                        <Button className="btn-danger btn-delete">
                                          <FaTrashAlt className="fs-6" />
                                        </Button>
                                      </td>
                                      <td align="center">
                                        <>
                                          <Button
                                            onClick={() => {
                                              handleInfoOrder(orders.usage_id);
                                            }}
                                            className="btn-info"
                                          >
                                            <FaInfo className="fs-6" />
                                          </Button>
                                          <GetVechileUsagesById
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
                            </div>
                          </Card.Body>
                        </Card>
                      </main>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Footer />
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>
          </Container>
        </>
      );
    }
  } else {
    return redirect("/silakend-login");
  }
};
