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

export const VehicleUsageDetail = () => {
  // Get access token
  const token = Cookies.get("token");

  const auth = useAuthUser();

  // Initialize newest usage id
  const usageId = localStorage.getItem("usage_id");

  // initialize the loading
  const [isLoading, setIsLoading] = useState(true);

  // catch the current user from fetchCurrentUsage
  const [vUsageToMap, setVUsageToMap] = useState(null);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    async function fetchCurrentUsage() {
      try {
        await axios
          .get(
            `https://silakend-server.xyz/api/vehicleusages/${usageId}`,
            config
          )
          .then((response) => {
            if (response.status === 200) {
              setIsLoading(false);
              const currentUsage = response.data;
              if (currentUsage.length !== 0) {
                setVUsageToMap(currentUsage);
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

    fetchCurrentUsage();
  }, []);

  {
    return token ? (
      auth().user_level === 1 || auth().user_level === 2 ? (
        usageId ? (
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
                          title={"Rincian Pengajuan Peminjaman"}
                          parentLink={"/pengajuan-peminjaman"}
                        />
                      ))}
                    </Col>
                  </Row>
                  {/* NAVBAR */}
                  <main className="min-vh-100 px-2 mt-4 d-flex flex-column gap-2">
                    <Row>
                      <Col>
                        <Card>
                          <Card.Title className="fs-4 p-4 fw-semibold color-primary">
                            Rincian Pengajuan Peminjaman
                          </Card.Title>
                          <Card.Body className="d-flex flex-column gap-3">
                            <ListGroup as="ol" numbered className="mb-2">
                              {vUsageToMap != ""
                                ? vUsageToMap.map((currentUsage) => (
                                    <>
                                      <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                      >
                                        <div className="ms-2 me-auto">
                                          <div className="fw-bold">
                                            PEMINJAM
                                          </div>
                                          {currentUsage.user.name}
                                        </div>
                                      </ListGroup.Item>

                                      <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                      >
                                        <div className="ms-2 me-auto">
                                          <div className="fw-bold">
                                            PENGEMUDI
                                          </div>
                                          {currentUsage.driver.name}
                                        </div>
                                      </ListGroup.Item>

                                      <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                      >
                                        <div className="ms-2 me-auto">
                                          <div className="fw-bold">
                                            KENDARAAN
                                          </div>
                                          {currentUsage.vehicle.name}
                                        </div>
                                      </ListGroup.Item>

                                      <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                      >
                                        <div className="ms-2 me-auto">
                                          <div className="fw-bold">
                                            KEPERLUAN
                                          </div>
                                          {currentUsage.usage_description}
                                        </div>
                                      </ListGroup.Item>

                                      <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                      >
                                        <div className="ms-2 me-auto">
                                          <div className="fw-bold">
                                            KATEGORI PEMINJAMAN
                                          </div>
                                          {currentUsage.category.name}
                                        </div>
                                      </ListGroup.Item>

                                      <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                      >
                                        <div className="ms-2 me-auto">
                                          <div className="fw-bold">
                                            JUMLAH PERSONIL
                                          </div>
                                          {currentUsage.personel_count}
                                        </div>
                                      </ListGroup.Item>

                                      <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                      >
                                        <div className="ms-2 me-auto">
                                          <div className="fw-bold">
                                            DESTINASI
                                          </div>
                                          {currentUsage.destination}
                                        </div>
                                      </ListGroup.Item>

                                      <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                      >
                                        <div className="ms-2 me-auto">
                                          <div className="fw-bold">
                                            TANGGAL PEMINJAMAN
                                          </div>
                                          {currentUsage.start_date} s/d{" "}
                                          {currentUsage.end_date}
                                        </div>
                                      </ListGroup.Item>

                                      <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                      >
                                        <div className="ms-2 me-auto">
                                          <div className="fw-bold">
                                            WAKTU KEBERANGKATAN
                                          </div>
                                          {currentUsage.depart_date} PUKUL{" "}
                                          {currentUsage.depart_time}
                                        </div>
                                      </ListGroup.Item>

                                      <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                      >
                                        <div className="ms-2 me-auto">
                                          <div className="fw-bold">
                                            WAKTU KEPULANGAN
                                          </div>
                                          {currentUsage.arrive_date} PUKUL{" "}
                                          {currentUsage.arrive_time}
                                        </div>
                                      </ListGroup.Item>

                                      <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                      >
                                        <div className="ms-2 me-auto">
                                          <div className="fw-bold">
                                            ODOMETER
                                          </div>
                                          <div>
                                            Jumlah Kilometer Pergi :{" "}
                                            {currentUsage.distance_count_out} KM
                                          </div>
                                          <div>
                                            Jumlah Kilometer Pulang :{" "}
                                            {currentUsage.distance_count_in} KM
                                          </div>
                                        </div>
                                      </ListGroup.Item>

                                      <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                      >
                                        <div className="ms-2 me-auto">
                                          <div className="fw-bold">STATUS</div>
                                          {currentUsage.status} (
                                          {currentUsage.status_description})
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
          <Navigate to="/pengajuan-peminjaman" />
        )
      ) : (
        SecuringPage()
      )
    ) : (
      <Navigate to="/silakend-login" />
    );
  }
};
