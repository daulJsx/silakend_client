import React from "react";

// Cookies JS
import Cookies from "js-cookie";

// fetch data requirement
import { useQuery } from "react-query";

import FetchVehicles from "../../consAPI/FetchVehicles";

// Navigating
import { NavLink } from "react-router-dom";
import { Navigate } from "react-router-dom";

// Bootstrap components
import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Breadcrumb from "react-bootstrap/Breadcrumb";

// Components
import { Aside } from "../../components/aside/Aside";
import { NavTop } from "../../components/navtop/NavTop";
import { Footer } from "../../components/footer/Footer";

// Icons
import { RiCarLine } from "react-icons/ri";
import { HiPlusSm } from "react-icons/hi";
import { AiFillEdit } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import { FaInfo } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";

// Functions
import { GetVehicleById } from "../../functions/GetVehicleById";
import { DeleteVehicle } from "../../functions/Delete/DeleteVehicle";
import { SecuringPage } from "../../functions/Securing/SecuringPage";

// For checking user have done in authentication
import { useAuthUser } from "react-auth-kit";

export const Vehicles = () => {
  const auth = useAuthUser();

  // Get access token
  const token = Cookies.get("token");

  // Fetching vehicles data
  const {
    data: vehiclesData,
    error,
    isLoading,
    isError,
  } = useQuery("vehicles", FetchVehicles);

  const handleInfoVehicle = (vehicleId) => {
    const vehicle_id = vehicleId;

    localStorage.setItem("vehicle_id", vehicle_id);
  };

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
                      bc={<RiCarLine />}
                      parentLink={"/data-kendaraan"}
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
                              <h3 className="main__title">Kendaraan Dinas</h3>
                              <Breadcrumb className="breadcrumb__item mt-3">
                                <Breadcrumb.Item
                                  className="breadcrumb__item"
                                  href="#"
                                >
                                  <div className="d-flex color-primary justify-content-center align-items-center gap-2 breadcrumb__text">
                                    <RiCarLine className="fs-5" />
                                    Data
                                    <FiChevronRight className="fs-6 breadcrumb__divider" />
                                  </div>
                                </Breadcrumb.Item>
                              </Breadcrumb>
                            </Col>
                            <Col md={2} className="me-2">
                              <NavLink to={"/data-kendaraan/tambah-kendaraan"}>
                                <Button className="btn btn-add side-menu d-flex gap-1 align-items-center justify-content-senter">
                                  Tambah
                                  <HiPlusSm className="fs-3" />
                                </Button>
                              </NavLink>
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
                                    <th>NAMA KENDARAAN</th>
                                    <th>NO POLISI</th>
                                    <th>TAHUN PEMBUATAN</th>
                                    <th>WAKTU PAJAK</th>
                                    <th>KATEGORI</th>
                                    <th align="center">AKSI</th>
                                    <th align="center">RINCIAN</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {vehiclesData?.map((vehicles, index) => (
                                    <tr key={vehicles.vehicle_id}>
                                      <td>{index + 1}</td>
                                      <td>{vehicles.name}</td>
                                      <td>{vehicles.license_number}</td>
                                      <td>{vehicles.year}</td>
                                      <td>{vehicles.tax_date}</td>
                                      <td>{vehicles.category.name}</td>
                                      <td>
                                        <div className="d-flex gap-1 justify-content-center">
                                          <NavLink
                                            to={
                                              "/data-kendaraan/edit-kendaraan"
                                            }
                                          >
                                            <Button
                                              className="btn btn-edit"
                                              onClick={() =>
                                                GetVehicleById(vehicles)
                                              }
                                            >
                                              <AiFillEdit className="fs-6" />
                                            </Button>
                                          </NavLink>
                                          <Button
                                            className="btn-danger btn-delete"
                                            onClick={() =>
                                              DeleteVehicle(vehicles.vehicle_id)
                                            }
                                          >
                                            <FaTrashAlt className="fs-6" />
                                          </Button>
                                        </div>
                                      </td>
                                      <td align="center">
                                        <NavLink
                                          to={
                                            "/data-kendaraan/rincian-kendaraan"
                                          }
                                        >
                                          <Button
                                            onClick={() => {
                                              handleInfoVehicle(
                                                vehicles.vehicle_id
                                              );
                                            }}
                                            className="btn-info btn-detail"
                                          >
                                            <FaInfo className="fs-6" />
                                          </Button>
                                        </NavLink>
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
