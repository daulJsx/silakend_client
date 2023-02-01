import React, { useState, useEffect } from "react";

// Cookies JS
import Cookies from "js-cookie";

// Interceptors
import axios from "axios";

// Functions
import { SecuringPage } from "../../functions/Securing/SecuringPage";

// Navigating
import { NavLink } from "react-router-dom";

// For checking user have done in authentication
import { useAuthUser } from "react-auth-kit";
import { Navigate } from "react-router-dom";

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
import { FiChevronRight } from "react-icons/fi";
import { FaArrowLeft } from "react-icons/fa";
import { FiClock } from "react-icons/fi";

// React Notification
import swal from "sweetalert";

export const VUHistoryDetail = () => {
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
            `http://silakend-server-realtime.test/api/vehicleusages/${usageId}`,
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
                        parentLink={-1}
                      />
                    ))}
                  </Col>
                </Row>
                {/* NAVBAR */}

                <main className="px-2 min-vh-100 mt-4">
                  <Row>
                    <Col>
                      <Card className="shadow bg__primary">
                        <Card.Header>
                          <Container>
                            <Row className="gap-3 mt-4">
                              <Col>
                                <h3 className="main__title">
                                  Riwayat Peminjaman Kendaraan Dinas
                                </h3>
                                <Breadcrumb className="breadcrumb__item mt-3">
                                  <Breadcrumb.Item className="breadcrumb__item">
                                    <div className="d-flex justify-content-center align-items-center gap-2">
                                      <NavLink
                                        to={-1}
                                        className="d-flex justify-content-center align-items-center text-muted gap-2"
                                      >
                                        <FiClock className="fs-5" />
                                        Data
                                      </NavLink>

                                      <FiChevronRight className="fs-6 breadcrumb__divider" />
                                      <span className="color-primary">
                                        Rincian
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
                              {vUsageToMap != ""
                                ? vUsageToMap.map((currentUsage) => (
                                    <>
                                      <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                      >
                                        <div className="ms-2 me-auto">
                                          <div className="list__title">
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
                                          <div className="list__title">
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
                                          <div className="list__title">
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
                                          <div className="list__title">
                                            JUMLAH PERSONIL
                                          </div>
                                          {currentUsage.personel_count} Orang
                                        </div>
                                      </ListGroup.Item>

                                      <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                      >
                                        <div className="ms-2 me-auto">
                                          <div className="list__title">
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
                                          <div className="list__title">
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
                                          <div className="list__title">
                                            PENGEMUDI
                                          </div>
                                          {currentUsage.driver ? (
                                            currentUsage.driver.name
                                          ) : (
                                            <p className="list__title">
                                              Belum ada pengemudi yang
                                              ditugaskan
                                            </p>
                                          )}
                                        </div>
                                      </ListGroup.Item>

                                      <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                      >
                                        <div className="ms-2 me-auto">
                                          <div className="list__title">
                                            KENDARAAN
                                          </div>
                                          {currentUsage.vehicle ? (
                                            currentUsage.vehicle.name
                                          ) : (
                                            <p className="list__title">
                                              Belum ada kendaraan yang
                                              ditugaskan
                                            </p>
                                          )}
                                        </div>
                                      </ListGroup.Item>

                                      <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                      >
                                        <div className="ms-2 me-auto">
                                          <div className="list__title">
                                            WAKTU BERANGKAT
                                          </div>
                                          {currentUsage.depart_date &&
                                          currentUsage.depart_time ? (
                                            <>
                                              {currentUsage.depart_date} PUKUL{" "}
                                              {currentUsage.depart_time}
                                            </>
                                          ) : (
                                            <p className="list__title">
                                              Waktu berangkat belum ditentukan
                                            </p>
                                          )}
                                        </div>
                                      </ListGroup.Item>

                                      <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                      >
                                        <div className="ms-2 me-auto">
                                          <div className="list__title">
                                            WAKTU PULANG
                                          </div>
                                          {currentUsage.arrive_date &&
                                          currentUsage.arrive_time ? (
                                            <>
                                              {currentUsage.arrive_date} PUKUL{" "}
                                              {currentUsage.arrive_time}
                                            </>
                                          ) : (
                                            <p className="list__title">
                                              Waktu pulang belum ditentukan
                                            </p>
                                          )}
                                        </div>
                                      </ListGroup.Item>

                                      <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                      >
                                        <div className="ms-2 me-auto">
                                          <div className="list__title">
                                            ODOMETER
                                          </div>
                                          {currentUsage.distance_count_out &&
                                          currentUsage.distance_count_in ? (
                                            <>
                                              <div>
                                                Jumlah Kilometer Pergi :{" "}
                                                {currentUsage.distance_count_out.toLocaleString(
                                                  "id-ID"
                                                )}{" "}
                                                KM
                                              </div>
                                              <div>
                                                Jumlah Kilometer Pulang :{" "}
                                                {currentUsage.distance_count_in
                                                  ? currentUsage.distance_count_in.toLocaleString(
                                                      "id-ID"
                                                    )
                                                  : null}{" "}
                                                KM
                                              </div>
                                            </>
                                          ) : (
                                            <p className="list__title">
                                              Odometer belum dimasukkan dalam
                                              pengajuan ini
                                            </p>
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
        <Navigate to="/riwayat-peminjaman" />
      )
    ) : (
      SecuringPage()
    )
  ) : (
    <Navigate to="/silakend-login" />
  );
};
