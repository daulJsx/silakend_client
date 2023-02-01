import React, { useState, useEffect } from "react";

// Cookies JS
import Cookies from "js-cookie";

// Interceptors
import axios from "axios";

// For checking user have done in authentication
import { useAuthUser } from "react-auth-kit";
import { Navigate, NavLink, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
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
            `http://silakend-server-realtime.test/api/vehicleusages/${usageId}`,
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
                        parentLink={-1}
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
                                ? vUDetail.map((vu, index) => {
                                    const startDate = new Date(vu.start_date);
                                    const endDate = new Date(vu.end_date);

                                    // Date formatter
                                    const startOptions = {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    };
                                    const endOptions = {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    };

                                    const formattedStartDate =
                                      startDate.toLocaleDateString(
                                        "id-ID",
                                        startOptions
                                      );
                                    const formattedEndDate =
                                      endDate.toLocaleDateString(
                                        "id-ID",
                                        endOptions
                                      );
                                    return (
                                      <>
                                        <ListGroup.Item
                                          key={index}
                                          as="li"
                                          className="d-flex justify-content-between align-items-start"
                                        >
                                          <div className="ms-2 me-auto">
                                            <div className="list__title">
                                              KATEGORI PEMINJAMAN
                                            </div>
                                            {vu.category !== null
                                              ? vu.category.name
                                              : null}
                                          </div>
                                        </ListGroup.Item>

                                        <ListGroup.Item
                                          as="li"
                                          className="d-flex justify-content-between align-items-start"
                                        >
                                          <div className="ms-2 me-auto">
                                            <div className="list__title">
                                              PEMINJAM
                                            </div>
                                            {vu.user.name}
                                          </div>
                                        </ListGroup.Item>

                                        <ListGroup.Item
                                          as="li"
                                          className="d-flex justify-content-between align-items-start"
                                        >
                                          <div className="ms-2 me-auto">
                                            <div className="list__title">
                                              DESKRIPSI PEMINJAMAN
                                            </div>
                                            {vu.usage_description}
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
                                            {vu.personel_count} Orang
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
                                            {vu.destination}
                                          </div>
                                        </ListGroup.Item>

                                        <ListGroup.Item
                                          as="li"
                                          className="d-flex justify-content-between align-items-start"
                                        >
                                          <div className="ms-2 me-auto">
                                            <div className="list__title">
                                              WAKTU PEMINJAMAN
                                            </div>
                                            {formattedStartDate} -{" "}
                                            {formattedEndDate}
                                          </div>
                                        </ListGroup.Item>

                                        <ListGroup.Item
                                          as="li"
                                          variant={
                                            vu.status === "CANCELED" ||
                                            vu.status === "REJECTED"
                                              ? "danger"
                                              : vu.status === "WAITING"
                                              ? "warning"
                                              : vu.status === "READY"
                                              ? "primary"
                                              : vu.status === "APPROVED"
                                              ? "info"
                                              : vu.status === "PROGRESS"
                                              ? "secondary"
                                              : "success"
                                          }
                                          className="d-flex justify-content-between align-items-start"
                                        >
                                          <div className="ms-2 me-auto">
                                            <div className="list__title">
                                              STATUS
                                            </div>
                                            {vu.status === "CANCELED"
                                              ? `Dibatalkan peminjam karena ${vu.status_description}`
                                              : vu.status === "REJECTED"
                                              ? `Ditolak karena ${vu.status_description}`
                                              : vu.status === "WAITING"
                                              ? "Diajukan"
                                              : vu.status === "READY"
                                              ? "Siap Berangkat"
                                              : vu.status === "APPROVED"
                                              ? "Disetujui"
                                              : vu.status === "PROGRESS"
                                              ? "Berlangsung"
                                              : "Selesai"}
                                          </div>
                                        </ListGroup.Item>

                                        {vu.vehicle && vu.driver ? (
                                          <>
                                            <ListGroup.Item
                                              as="li"
                                              className="d-flex justify-content-between align-items-start position-relative"
                                            >
                                              <div className="ms-2 me-auto">
                                                <div className="list__title">
                                                  PENGEMUDI
                                                </div>
                                                {vu.driver.name}
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
                                                {vu.vehicle.name}
                                              </div>
                                            </ListGroup.Item>
                                          </>
                                        ) : null}

                                        {vu.depart_date && vu.depart_time ? (
                                          <ListGroup.Item
                                            as="li"
                                            className="d-flex justify-content-between align-items-start"
                                          >
                                            <div className="ms-2 me-auto">
                                              <div className="list__title">
                                                WAKTU BERANGKAT
                                              </div>
                                              {vu.depart_date} PUKUL{" "}
                                              {vu.depart_time}
                                            </div>
                                          </ListGroup.Item>
                                        ) : null}

                                        {vu.distance_count_out &&
                                        vu.distance_count_in ? (
                                          <>
                                            <ListGroup.Item
                                              as="li"
                                              className="d-flex justify-content-between align-items-start"
                                            >
                                              <div className="ms-2 me-auto">
                                                <div className="list__title">
                                                  ODOMETER PERGI
                                                </div>
                                                {vu.distance_count_out}
                                              </div>
                                            </ListGroup.Item>

                                            <ListGroup.Item
                                              as="li"
                                              className="d-flex justify-content-between align-items-start"
                                            >
                                              <div className="ms-2 me-auto">
                                                <div className="list__title">
                                                  ODOMETER PULANG
                                                </div>
                                                {vu.distance_count_in}
                                              </div>
                                            </ListGroup.Item>
                                          </>
                                        ) : null}

                                        {vu.arrive_date && vu.arrive_time ? (
                                          <ListGroup.Item
                                            as="li"
                                            className="d-flex justify-content-between align-items-start"
                                          >
                                            <div className="ms-2 me-auto">
                                              <div className="list__title">
                                                WAKTU PULANG
                                              </div>
                                              {vu.arrive_date} PUKUL{" "}
                                              {vu.arrive_time}
                                            </div>
                                          </ListGroup.Item>
                                        ) : null}

                                        {vu.status === "READY" ? (
                                          <Row>
                                            <Col md={6}>
                                              <Button
                                                onClick={() =>
                                                  ProgressVU(vu, navigate)
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
                                        ) : vu.status === "PROGRESS" ? (
                                          <Row>
                                            <Col md={2}>
                                              <Button
                                                onClick={() =>
                                                  DoneVU(vu, navigate)
                                                }
                                                className="btn__primary mt-4"
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
                                    );
                                  })
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
