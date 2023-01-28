import React, { useState, useEffect } from "react";

// Cookies JS
import Cookies from "js-cookie";

// Interceptors
import axios from "axios";

// Functions
import { SecuringPage } from "../../functions/Securing/SecuringPage";

// For checking user have done in authentication
import { useAuthUser } from "react-auth-kit";
import { Navigate } from "react-router-dom";

// bootstrap components
import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

// Components
import { Aside } from "./../../components/aside/Aside";
import { NavTop } from "../../components/navtop/NavTop";
import { Footer } from "../../components/footer/Footer";

// icons
import { FaArrowLeft } from "react-icons/fa";

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
          .get(`https://silakend-server.xyz/api/vehicles/${vehicleId}`, config)
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

                <main className="min-vh-100 px-2 mt-3 d-flex flex-column gap-2">
                  <Row>
                    <Col>
                      <Card>
                        <Card.Title className="fs-4 p-4 fw-semibold color-primary">
                          Rincian Data Kendaraan
                        </Card.Title>
                        <Card.Body className="d-flex flex-column gap-3">
                          <ListGroup as="ol" numbered className="mb-2">
                            {vehicleDetail !== null
                              ? vehicleDetail.map((currentVehicle) => (
                                  <>
                                    <ListGroup.Item
                                      as="li"
                                      className="d-flex justify-content-between align-items-start"
                                    >
                                      <div className="ms-2 me-auto">
                                        <div className="fw-bold">
                                          NAMA KENDARAAN
                                        </div>
                                        {currentVehicle.name}
                                      </div>
                                    </ListGroup.Item>

                                    <ListGroup.Item
                                      as="li"
                                      className="d-flex justify-content-between align-items-start"
                                    >
                                      <div className="ms-2 me-auto">
                                        <div className="fw-bold">
                                          TAHUN PEMBUATAN
                                        </div>
                                        {currentVehicle.year}
                                      </div>
                                    </ListGroup.Item>

                                    <ListGroup.Item
                                      as="li"
                                      className="d-flex justify-content-between align-items-start"
                                    >
                                      <div className="ms-2 me-auto">
                                        <div className="fw-bold">
                                          NOMOR POLISI
                                        </div>
                                        {currentVehicle.license_number}
                                      </div>
                                    </ListGroup.Item>

                                    <ListGroup.Item
                                      as="li"
                                      className="d-flex justify-content-between align-items-start"
                                    >
                                      <div className="ms-2 me-auto">
                                        <div className="fw-bold">
                                          WAKTU PAJAK
                                        </div>
                                        {currentVehicle.tax_date}
                                      </div>
                                    </ListGroup.Item>

                                    <ListGroup.Item
                                      as="li"
                                      className="d-flex justify-content-between align-items-start"
                                    >
                                      <div className="ms-2 me-auto">
                                        <div className="fw-bold">
                                          WAKTU VALID
                                        </div>
                                        {currentVehicle.valid_date}
                                      </div>
                                    </ListGroup.Item>

                                    <ListGroup.Item
                                      as="li"
                                      className="d-flex justify-content-between align-items-start"
                                    >
                                      <div className="ms-2 me-auto">
                                        <div className="fw-bold">
                                          JUMLAH KILOMETER TEMPUH
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
                                        <div className="fw-bold">
                                          KATEGORI KENDARAAN
                                        </div>
                                        {currentVehicle.category.name}
                                      </div>
                                    </ListGroup.Item>
                                  </>
                                ))
                              : null}
                          </ListGroup>
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
