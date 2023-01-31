import React, { useState, useEffect } from "react";

// Cookies JS
import Cookies from "js-cookie";

// Interceptors
import axios from "axios";

// For checking user have done in authentication
import { useAuthUser } from "react-auth-kit";
import { Navigate, NavLink } from "react-router-dom";

// Functions
import { SecuringPage } from "../../functions/Securing/SecuringPage";
import { DoneVU } from "../../functions/Update/DoneVU";
import { ProgressVU } from "../../functions/Update/ProgressVU";

// Bootstrap components
import { Container, Row, Col, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Breadcrumb from "react-bootstrap/Breadcrumb";

// Components
import { AsideDriver } from "../../components/aside/AsideDriver";
import { NavTop } from "../../components/navtop/NavTop";
import { Footer } from "../../components/footer/Footer";

// icons
import { FaArrowLeft } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";
import { TbSteeringWheel } from "react-icons/tb";

// React Notification
import swal from "sweetalert";

export const TaskInfo = () => {
  // Get access token
  const token = Cookies.get("token");

  const auth = useAuthUser();

  // Initialize newest maintenance id
  const usageId = localStorage.getItem("usage_id");

  // initialize the loading
  const [isLoading, setIsLoading] = useState(true);

  // catch the fetching vehicle details
  const [vUDetail, setVUDetail] = useState(null);

  useEffect(() => {
    const accessToken = Cookies.get("token");

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    async function fetchVUById() {
      try {
        await axios
          .get(
            `https://silakend-server.xyz/api/vehicleusages/${usageId}`,
            config
          )
          .then((response) => {
            if (response.status === 200) {
              setIsLoading(false);
              const vUDetail = response.data;

              if (vUDetail.length !== 0) {
                setVUDetail(vUDetail);
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

    fetchVUById();
  }, []);

  return token ? (
    auth().user_level === 4 ? (
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
                <AsideDriver />
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
                        title={"Rincian Tugas"}
                        parentLink={"/driver/tugas-masuk"}
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
                                <h3 className="main__title">
                                  Daftar Tugas Masuk
                                </h3>
                                <Breadcrumb className="breadcrumb__item mt-3">
                                  <Breadcrumb.Item className="breadcrumb__item">
                                    <div className="d-flex text-muted justify-content-center align-items-center gap-2 breadcrumb__text">
                                      <NavLink
                                        to={-1}
                                        className="d-flex justify-content-center align-items-center text-muted gap-2"
                                      >
                                        <TbSteeringWheel className="fs-5" />
                                        Data
                                      </NavLink>

                                      <FiChevronRight className="fs-6 breadcrumb__divider" />
                                      <span className="color-primary">
                                        Rincian Tugas
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
                              {vUDetail !== null
                                ? vUDetail.map((userOrder, index) => (
                                    <>
                                      <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                      >
                                        <div className="ms-2 me-auto">
                                          <div className="list__title">
                                            PEMINJAM
                                          </div>

                                          {userOrder.user
                                            ? userOrder.user.name
                                            : null}
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
                                          {userOrder.usage_description}
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
                                          {userOrder.category.name}
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
                                          {userOrder.personel_count} Orang
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
                                          {userOrder.destination}
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
                                          {userOrder.start_date} s/d{" "}
                                          {userOrder.end_date}
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
                                          {userOrder.driver ? (
                                            userOrder.driver.name
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
                                          {userOrder.vehicle ? (
                                            userOrder.vehicle.name
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
                                          {userOrder.depart_date &&
                                          userOrder.depart_time ? (
                                            <>
                                              {userOrder.depart_date} PUKUL{" "}
                                              {userOrder.depart_time}
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
                                          {userOrder.arrive_date &&
                                          userOrder.arrive_time ? (
                                            <>
                                              {userOrder.arrive_date} PUKUL{" "}
                                              {userOrder.arrive_time}
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
                                          {userOrder.distance_count_out &&
                                          userOrder.distance_count_in ? (
                                            <>
                                              {" "}
                                              <div>
                                                Jumlah Kilometer Pergi :{" "}
                                                {userOrder.distance_count_out.toLocaleString(
                                                  "id-ID"
                                                )}{" "}
                                                KM
                                              </div>
                                              <div>
                                                Jumlah Kilometer Pulang :{" "}
                                                {userOrder.distance_count_in
                                                  ? userOrder.distance_count_in.toLocaleString(
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

                                      <ListGroup.Item
                                        as="li"
                                        variant={
                                          userOrder.status === "CANCELED" ||
                                          userOrder.status === "REJECTED"
                                            ? "danger"
                                            : userOrder.status === "WAITING"
                                            ? "warning"
                                            : userOrder.status === "READY"
                                            ? "primary"
                                            : userOrder.status === "APPROVED"
                                            ? "info"
                                            : userOrder.status === "PROGRESS"
                                            ? "secondary"
                                            : "success"
                                        }
                                        className="d-flex justify-content-between align-items-start"
                                      >
                                        <div className="ms-2 me-auto">
                                          <div className="list__title">
                                            STATUS
                                          </div>
                                          {userOrder.status === "CANCELED"
                                            ? `Dibatalkan peminjam karena ${userOrder.status_description}`
                                            : userOrder.status === "REJECTED"
                                            ? `Ditolak karena ${userOrder.status_description}`
                                            : userOrder.status === "WAITING"
                                            ? "Diajukan"
                                            : userOrder.status === "READY"
                                            ? "Siap Berangkat"
                                            : userOrder.status === "APPROVED"
                                            ? "Disetujui"
                                            : userOrder.status === "PROGRESS"
                                            ? "Berlangsung"
                                            : "Selesai"}
                                        </div>
                                      </ListGroup.Item>

                                      {userOrder.status === "READY" ? (
                                        <Row>
                                          <Col md={6}>
                                            <Button
                                              onClick={() =>
                                                ProgressVU(userOrder)
                                              }
                                              className="btn__primary mt-4"
                                            >
                                              <div className="d-flex gap-2">
                                                Konfirmasi Keberangkatan
                                                <FiCheckCircle className="fs-4" />
                                              </div>
                                            </Button>
                                          </Col>
                                        </Row>
                                      ) : userOrder.status === "PROGRESS" ? (
                                        <Row>
                                          <Col md={2}>
                                            <Button
                                              onClick={() => DoneVU(userOrder)}
                                              className="btn__primary"
                                            >
                                              <div className="d-flex gap-2">
                                                Selesaikan
                                                <FiCheckCircle className="fs-4" />
                                              </div>
                                            </Button>
                                          </Col>
                                        </Row>
                                      ) : null}
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
        <Navigate to="/driver/tugas-masuk" />
      )
    ) : (
      SecuringPage()
    )
  ) : (
    <Navigate to="/silakend-login" />
  );
};
