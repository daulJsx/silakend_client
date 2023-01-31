import React, { useState, useEffect } from "react";

// Cookies JS
import Cookies from "js-cookie";

// Interceptors
import axios from "axios";

// Functions
import { SecuringPage } from "../../functions/Securing/SecuringPage";

// For checking user have done in authentication
import { useAuthUser } from "react-auth-kit";

// Navigating
import { NavLink, Navigate } from "react-router-dom";

// bootstrap components
import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Breadcrumb from "react-bootstrap/Breadcrumb";

// Components
import { Aside } from "./../../components/aside/Aside";
import { NavTop } from "../../components/navtop/NavTop";
import { Footer } from "../../components/footer/Footer";

// icons
import { FaArrowLeft } from "react-icons/fa";
import { RiCarLine } from "react-icons/ri";
import { FiChevronRight } from "react-icons/fi";

// React Notification
import swal from "sweetalert";

export const VehicleDetail = () => {
  // Get access token
  const token = Cookies.get("token");

  const auth = useAuthUser();

  // Initialize newest maintenance id
  const vehicleId = localStorage.getItem("vehicle_id");

  // initialize the loading
  const [isLoading, setIsLoading] = useState(true);

  // catch the fetching vehicle details
  const [vehicleDetail, setVehicleDetail] = useState(null);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    async function fetchData() {
      try {
        await axios
          .get(`http://silakend-server-realtime.test/api/vehicles/${vehicleId}`, config)
          .then((response) => {
            if (response.status === 200) {
              setIsLoading(false);
              const vehicleDetail = response.data;
              if (vehicleDetail.length !== 0) {
                setVehicleDetail(vehicleDetail);
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

  return token ? (
    auth().user_level === 1 || auth().user_level === 2 ? (
      vehicleId ? (
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
                        title={"Rincian Data Kendaraan"}
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
                                  <Breadcrumb.Item className="breadcrumb__item">
                                    <div className="d-flex text-muted justify-content-center align-items-center gap-2 breadcrumb__text">
                                      <NavLink
                                        to={"/data-kendaraan"}
                                        className="d-flex justify-content-center align-items-center text-muted gap-2"
                                      >
                                        <RiCarLine className="fs-5" />
                                        Data
                                      </NavLink>

                                      <FiChevronRight className="fs-6 breadcrumb__divider" />
                                      <span className="color-primary">
                                        Rincian Kendaraan
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
                              {vehicleDetail !== null
                                ? vehicleDetail.map((currentVehicle) => (
                                    <>
                                      <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                      >
                                        <div className="ms-2 me-auto">
                                          <div className="list__title">
                                            nama kendaraan
                                          </div>
                                          {currentVehicle.name}
                                        </div>
                                      </ListGroup.Item>

                                      <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                      >
                                        <div className="ms-2 me-auto">
                                          <div className="list__title">
                                            tahun pembuatan
                                          </div>
                                          {currentVehicle.year}
                                        </div>
                                      </ListGroup.Item>

                                      <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                      >
                                        <div className="ms-2 me-auto">
                                          <div className="list__title">
                                            nomor polisi
                                          </div>
                                          {currentVehicle.license_number}
                                        </div>
                                      </ListGroup.Item>

                                      <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                      >
                                        <div className="ms-2 me-auto">
                                          <div className="list__title">
                                            waktu pajak
                                          </div>
                                          {currentVehicle.tax_date}
                                        </div>
                                      </ListGroup.Item>

                                      <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                      >
                                        <div className="ms-2 me-auto">
                                          <div className="list__title">
                                            waktu valid
                                          </div>
                                          {currentVehicle.valid_date}
                                        </div>
                                      </ListGroup.Item>

                                      <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                      >
                                        <div className="ms-2 me-auto">
                                          <div className="list__title">
                                            jumlah kilometer tempuh
                                          </div>
                                          {currentVehicle.distance_count
                                            ? currentVehicle.distance_count.toLocaleString(
                                                "id-ID"
                                              )
                                            : null}{" "}
                                          KM
                                        </div>
                                      </ListGroup.Item>

                                      <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                      >
                                        <div className="ms-2 me-auto">
                                          <div className="list__title">
                                            kategori kendaraan
                                          </div>
                                          {currentVehicle.category.name}
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
        <Navigate to="/data-kendaraan" />
      )
    ) : (
      SecuringPage()
    )
  ) : (
    <Navigate to="/silakend-login" />
  );
};
