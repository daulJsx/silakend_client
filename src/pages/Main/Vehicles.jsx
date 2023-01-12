import React, { useState } from "react";

// Cookies JS
import Cookies from "js-cookie";

// fetch data requirement
import { useQuery } from "react-query";
import axios from "axios";
import FetchVehicles from "../../consAPI/FetchVehicles";

// Navigating
import { NavLink } from "react-router-dom";
import { Navigate } from "react-router-dom";

// Bootstrap components
import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

// Components
import { Aside } from "../../components/aside/Aside";
import { NavTop } from "../../components/navtop/NavTop";
import { Footer } from "../../components/footer/Footer";
import InfoVehicle from "../../components/popup/InfoVehicle";

// Icons
import { RiCarLine } from "react-icons/ri";
import { HiPlusSm } from "react-icons/hi";
import { AiFillEdit } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import { FaInfo } from "react-icons/fa";

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

  // Get Vehicle By Id
  const [currentVehicle, setCurrentVehicle] = useState("");

  //   Launch the pop up
  const [modalShow, setModalShow] = useState(false);
  const handleInfoVehicle = (vehicleId) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      const response = axios
        .get(`https://silakend-server.xyz/api/vehicles/${vehicleId}`, config)
        .then((res) => {
          const vehicleById = res.data;
          setCurrentVehicle(vehicleById);
          setModalShow(true);
        });

      return response;
    } catch (error) {
      console.log(error);
    }
  };

  {
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
                        bc={<RiCarLine />}
                        parentLink={"/data-kendaraan"}
                      />
                    ))}
                  </Col>
                </Row>
                {/* NAVBAR */}

                <div className="me-1 d-flex justify-content-end">
                  <Row className="py-4 mb-2">
                    <Col>
                      <NavLink to={"/data-kendaraan/tambah-kendaraan"}>
                        <Button className="btn btn-add side-menu d-flex gap-1 align-items-center justify-content-senter">
                          Tambah Kendaraan
                          <HiPlusSm className="fs-3" />
                        </Button>
                      </NavLink>
                    </Col>
                  </Row>
                </div>

                <main className="min-vh-100 px-2">
                  <Row>
                    <Col>
                      <Card>
                        <Card.Body>
                          <Card.Title className="fs-4 p-4 fw-semibold color-primary">
                            Data Kendaraan Dinas
                          </Card.Title>

                          <Table bordered hover responsive>
                            <thead>
                              <tr>
                                <th>No</th>
                                <th>NAMA KENDARAAN</th>
                                <th>NO POLISI</th>
                                <th>TAHUN PEMBUATAN</th>
                                <th>TANGGAL PAJAK</th>
                                <th>KATEGORI</th>
                                <th align="center">AKSI</th>
                                <th align="center">RINCIAN</th>
                              </tr>
                            </thead>
                            <tbody>
                              {vehiclesData?.map((vehicles, index) => (
                                <tr>
                                  <td key={vehicles.vehicle_id}>{index + 1}</td>
                                  <td>{vehicles.name}</td>
                                  <td>{vehicles.license_number}</td>
                                  <td>{vehicles.year}</td>
                                  <td>{vehicles.tax_date}</td>
                                  <td>{vehicles.category.name}</td>
                                  <td>
                                    <div className="d-flex gap-1 justify-content-center">
                                      <NavLink
                                        to={"/data-kendaraan/edit-kendaraan"}
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
                                    <>
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

                                      <InfoVehicle
                                        currentVehicle={currentVehicle}
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
        )
      ) : (
        SecuringPage()
      )
    ) : (
      <Navigate to="/silakend-login" />
    );
  }
};
