import React, { useState, useEffect } from "react";

// Cookies JS
import Cookies from "js-cookie";

// Interceptors
import axios from "axios";

// Functions
import { DeleteVMD } from "../../functions/Delete/DeleteVMDetail";
import { SecuringPage } from "../../functions/Securing/SecuringPage";

// For checking user have done in authentication
import { useAuthUser } from "react-auth-kit";
import { Navigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

// bootstrap components
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Alert from "react-bootstrap/Alert";
import Breadcrumb from "react-bootstrap/Breadcrumb";

// Components
import { Aside } from "./../../components/aside/Aside";
import { NavTop } from "../../components/navtop/NavTop";
import { Footer } from "../../components/footer/Footer";

// icons
import { FaArrowLeft } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { HiPlusSm } from "react-icons/hi";
import { BiCog } from "react-icons/bi";
import { FiChevronRight } from "react-icons/fi";
import { FiList } from "react-icons/fi";

// React Notification
import swal from "sweetalert";

export const VehicleMaintenancesDetail = () => {
  // Get access token
  const token = Cookies.get("token");

  const auth = useAuthUser();

  // Initialize newest maintenance id
  const maintenanceId = localStorage.getItem("maintenanceId");

  // initialize the loading
  const [isLoading, setIsLoading] = useState(true);

  // catch the fetching maintenance details where maintenance_id
  const [maintenanceDetails, setMaintenanceDetails] = useState(null);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    async function fetchData() {
      try {
        await axios
          .get(
            `https://silakend-server.xyz/api/maintenancedetails/${maintenanceId}`,
            config
          )
          .then((response) => {
            if (response.status === 200) {
              setIsLoading(false);
              const maintenanceDetails = response.data;
              if (maintenanceDetails.length !== 0) {
                setMaintenanceDetails(maintenanceDetails);
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

    fetchData();
  }, []);

  // Get the JSON object from local storage
  const VMString = localStorage.getItem("VMToMap");
  // Parse the JSON string into a JavaScript object
  const VMToMap = JSON.parse(VMString);

  // get vm by id
  function GetVMDId(VMDId) {
    let { detail_id } = VMDId;
    localStorage.setItem("detailId", detail_id);
    localStorage.setItem("VMDToMap", JSON.stringify(VMDId));
  }

  return token ? (
    auth().user_level === 1 || auth().user_level === 2 ? (
      maintenanceId ? (
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
                        parentLink={-1}
                      />
                    ))}
                  </Col>
                </Row>
                {/* NAVBAR */}

                <main className="px-2 min-vh-100 mt-4">
                  {maintenanceDetails === null ? (
                    <Alert className="alert__customPrimary d-flex align-items-center bd-highlight">
                      <div className="me-auto">
                        Data perbaikan ini belum ada rincian!
                      </div>

                      <div className="bd-highlight">
                        <NavLink
                          to={
                            "/perbaikan-kendaraan/rincian-perbaikan-kendaraan/tambah-rincian"
                          }
                        >
                          <Button className="btn__primary" size="sm">
                            Tambah Rincian <FaPlus />
                          </Button>
                        </NavLink>
                      </div>
                    </Alert>
                  ) : null}
                  <Row>
                    <Col>
                      <Card className="shadow bg__primary">
                        <Card.Header>
                          <Container>
                            <Row className="gap-3 mt-4">
                              <Col>
                                <h3 className="main__title">
                                  Perbaikan Kendaraan
                                </h3>
                                <Breadcrumb className="breadcrumb__item mt-3">
                                  <Breadcrumb.Item className="breadcrumb__item">
                                    <div className="d-flex justify-content-center align-items-center gap-2">
                                      <NavLink
                                        to={-1}
                                        className="d-flex justify-content-center align-items-center text-muted gap-2"
                                      >
                                        <BiCog className="fs-5" />
                                        Data
                                      </NavLink>

                                      <FiChevronRight className="fs-6 breadcrumb__divider" />
                                      <span className="color-primary">
                                        Rincian Perbaikan
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
                              {VMToMap != ""
                                ? [VMToMap].map((currentVM) => (
                                    <>
                                      <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                      >
                                        <div className="ms-2 me-auto">
                                          <div className="list__title">
                                            KENDARAAN
                                          </div>
                                          {currentVM.vehicle.name}
                                        </div>
                                      </ListGroup.Item>
                                      <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                      >
                                        <div className="ms-2 me-auto">
                                          <div className="list__title">
                                            JENIS PERBAIKAN
                                          </div>
                                          {currentVM.category}
                                        </div>
                                      </ListGroup.Item>
                                      <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                      >
                                        <div className="ms-2 me-auto">
                                          <div className="list__title">
                                            TANGGAL
                                          </div>
                                          {currentVM.date}
                                        </div>
                                      </ListGroup.Item>
                                      <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                      >
                                        <div className="ms-2 me-auto">
                                          <div className="list__title">
                                            DESKRIPSI
                                          </div>
                                          {currentVM.description}
                                        </div>
                                      </ListGroup.Item>
                                      <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                      >
                                        <div className="ms-2 me-auto">
                                          <div className="list__title">
                                            PENGELUARAN
                                          </div>
                                          {currentVM.total_cost.toLocaleString(
                                            "id-ID",
                                            {
                                              style: "currency",
                                              currency: "IDR",
                                            }
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

                  {maintenanceDetails !== null ? (
                    <Row>
                      <Col>
                        <Card className="shadow rounded bg__primary mt-3">
                          <Card.Header>
                            <Container>
                              <Row className="gap-3 mt-4">
                                <Col>
                                  <h3 className="main__title">
                                    Data Rincian Perbaikan
                                  </h3>
                                  <Breadcrumb className="breadcrumb__item mt-3">
                                    <Breadcrumb.Item className="breadcrumb__item">
                                      <div className="d-flex justify-content-center align-items-center gap-2">
                                        <NavLink
                                          to={
                                            "/perbaikan-kendaraan/rincian-perbaikan-kendaraan"
                                          }
                                          className="d-flex justify-content-center align-items-center color-primary gap-2"
                                        >
                                          <FiList className="fs-5" />
                                          Data
                                        </NavLink>

                                        <FiChevronRight className="fs-6 breadcrumb__divider" />
                                      </div>
                                    </Breadcrumb.Item>
                                  </Breadcrumb>
                                </Col>
                                <Col md={2} className="me-2">
                                  <NavLink
                                    to={
                                      "/perbaikan-kendaraan/rincian-perbaikan-kendaraan/tambah-rincian"
                                    }
                                  >
                                    <Button className="btn btn-add side-menu d-flex gap-1 align-items-center justify-content-senter">
                                      Tambah
                                      <HiPlusSm className="fs-3" />
                                    </Button>
                                  </NavLink>
                                </Col>
                              </Row>
                            </Container>
                          </Card.Header>
                          <Card.Body className="px-4 mb-3">
                            <Container
                              className="p-4"
                              style={{
                                background: "#fff",
                                borderRadius: "10px",
                              }}
                            >
                              <Row>
                                <Col>
                                  <Table hover responsive>
                                    <thead>
                                      <tr>
                                        <th>No</th>
                                        <th>SPARE PART</th>
                                        <th>JUMLAH SPARE PART</th>
                                        <th>SATUAN</th>
                                        <th>HARGA SPARE PART</th>
                                        <th>HARGA TOTAL</th>
                                        <th>AKSI</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {maintenanceDetails.map((vmd, index) => (
                                        <tr>
                                          <td key={vmd.detail_id}>
                                            {index + 1}
                                          </td>
                                          <td>{vmd.item_name}</td>
                                          <td>{vmd.item_qty}</td>
                                          <td>{vmd.item_unit}</td>
                                          <td>
                                            {vmd.item_price
                                              ? vmd.item_price.toLocaleString(
                                                  "id-ID",
                                                  {
                                                    style: "currency",
                                                    currency: "IDR",
                                                  }
                                                )
                                              : null}
                                          </td>
                                          <td>
                                            {vmd.price_total
                                              ? vmd.price_total.toLocaleString(
                                                  "id-ID",
                                                  {
                                                    style: "currency",
                                                    currency: "IDR",
                                                  }
                                                )
                                              : null}
                                          </td>
                                          <td>
                                            <div className="d-flex gap-1 justify-content-center">
                                              <NavLink
                                                to={
                                                  "/perbaikan-kendaraan/rincian-perbaikan-kendaraan/edit-rincian"
                                                }
                                              >
                                                <Button
                                                  className="btn-warning btn-edit"
                                                  onClick={() => GetVMDId(vmd)}
                                                >
                                                  <AiFillEdit className="fs-6" />
                                                </Button>
                                              </NavLink>

                                              <Button
                                                onClick={() =>
                                                  DeleteVMD(vmd.detail_id)
                                                }
                                                className="btn-danger btn-delete"
                                              >
                                                <FaTrashAlt className="fs-6" />
                                              </Button>
                                            </div>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </Table>
                                </Col>
                              </Row>
                            </Container>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  ) : null}
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
        <Navigate to="/perbaikan-kendaraan" />
      )
    ) : (
      SecuringPage()
    )
  ) : (
    <Navigate to="/silakend-login" />
  );
};
