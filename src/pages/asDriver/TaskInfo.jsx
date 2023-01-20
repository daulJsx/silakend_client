import React, { useState, useEffect } from "react";

// Cookies JS
import Cookies from "js-cookie";

// Interceptors
import axios from "axios";

// For checking user have done in authentication
import { useAuthUser } from "react-auth-kit";
import { Navigate } from "react-router-dom";

// Functions
import { SecuringPage } from "../../functions/Securing/SecuringPage";
import { DoneVU } from "../../functions/Update/DoneVU";
import { ProgressVU } from "../../functions/Update/ProgressVU";

// Bootstrap components
import { Container, Row, Col, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

// Components
import { AsideDriver } from "../../components/aside/AsideDriver";
import { NavTop } from "../../components/navtop/NavTop";
import { Footer } from "../../components/footer/Footer";

// icons
import { FaArrowLeft } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";

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

                <main className="min-vh-100 px-2 mt-4 d-flex flex-column gap-2">
                  <Row>
                    <Col>
                      <Card>
                        {vUDetail !== null
                          ? vUDetail.map((userOrder, index) => (
                              <>
                                <Card.Title className="fs-4 p-4 fw-semibold color-primary">
                                  Rincian Tugas
                                </Card.Title>
                                <Card.Body className="d-flex flex-column gap-3">
                                  <ListGroup as="ol" numbered className="mb-2">
                                    <>
                                      <ListGroup.Item
                                        key={index}
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                      >
                                        <div className="ms-2 me-auto">
                                          <div className="fw-bold">
                                            KATEGORI PEMINJAMAN
                                          </div>
                                          {userOrder.category !== null
                                            ? userOrder.category.name
                                            : null}
                                        </div>
                                      </ListGroup.Item>

                                      <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                      >
                                        <div className="ms-2 me-auto">
                                          <div className="fw-bold">
                                            DESKRIPSI PEMINJAMAN
                                          </div>
                                          {userOrder.usage_description}
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
                                          {userOrder.personel_count} Orang
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
                                          {userOrder.destination}
                                        </div>
                                      </ListGroup.Item>

                                      <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                      >
                                        <div className="ms-2 me-auto">
                                          <div className="fw-bold">
                                            WAKTU PEMINJAMAN
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
                                          <div className="fw-bold">STATUS</div>
                                          {userOrder.status}
                                        </div>
                                      </ListGroup.Item>

                                      <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                      >
                                        <div className="ms-2 me-auto">
                                          <div className="fw-bold">
                                            KETERANGAN
                                          </div>
                                          {userOrder.status_description ? (
                                            userOrder.status_description
                                          ) : (
                                            <p>Belum ada keterangan</p>
                                          )}
                                        </div>
                                      </ListGroup.Item>

                                      {userOrder.vehicle && userOrder.driver ? (
                                        <>
                                          <ListGroup.Item
                                            as="li"
                                            className="d-flex justify-content-between align-items-start"
                                          >
                                            <div className="ms-2 me-auto">
                                              <div className="fw-bold">
                                                PENGEMUDI
                                              </div>
                                              {userOrder.driver.name}
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
                                              {userOrder.vehicle.name}
                                            </div>
                                          </ListGroup.Item>
                                        </>
                                      ) : null}

                                      <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                      >
                                        <div className="ms-2 me-auto">
                                          <div className="fw-bold">
                                            WAKTU KEBERANGKATAN
                                          </div>
                                          {userOrder.depart_date ||
                                          userOrder.depart_time ? (
                                            <>
                                              {userOrder.depart_date} PUKUL{" "}
                                              {userOrder.depart_time}
                                            </>
                                          ) : (
                                            <p>
                                              Waktu keberangkatan belum
                                              dimasukkan untuk pengajuan ini
                                            </p>
                                          )}
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
                                          {userOrder.arrive_date ||
                                          userOrder.arrive_time ? (
                                            <>
                                              {userOrder.arrive_date} PUKUL{" "}
                                              {userOrder.arrive_time}
                                            </>
                                          ) : (
                                            <p>
                                              Waktu kepulangan belum dimasukkan
                                              untuk pengajuan ini
                                            </p>
                                          )}
                                        </div>
                                      </ListGroup.Item>

                                      {userOrder.distance_count_out &&
                                      userOrder.distance_count_in ? (
                                        <>
                                          <ListGroup.Item
                                            as="li"
                                            className="d-flex justify-content-between align-items-start"
                                          >
                                            <div className="ms-2 me-auto">
                                              <div className="fw-bold">
                                                ODOMETER PERGI
                                              </div>
                                              {userOrder.distance_count_out}
                                            </div>
                                          </ListGroup.Item>

                                          <ListGroup.Item
                                            as="li"
                                            className="d-flex justify-content-between align-items-start"
                                          >
                                            <div className="ms-2 me-auto">
                                              <div className="fw-bold">
                                                ODOMETER PULANG
                                              </div>
                                              {userOrder.distance_count_in}
                                            </div>
                                          </ListGroup.Item>
                                        </>
                                      ) : null}
                                    </>
                                  </ListGroup>
                                </Card.Body>

                                {userOrder.status === "READY" ? (
                                  <>
                                    <Card.Footer>
                                      <Button
                                        onClick={() => ProgressVU(userOrder)}
                                        variant="success"
                                      >
                                        <div className="d-flex gap-2">
                                          Konfirmasi Keberangkatan
                                          <FiCheckCircle className="fs-4" />
                                        </div>
                                      </Button>
                                    </Card.Footer>
                                  </>
                                ) : userOrder.status === "PROGRESS" ? (
                                  <>
                                    <Card.Footer>
                                      <Button
                                        onClick={() => DoneVU(userOrder)}
                                        variant="success"
                                      >
                                        <div className="d-flex gap-2">
                                          Selesaikan
                                          <FiCheckCircle className="fs-4" />
                                        </div>
                                      </Button>
                                    </Card.Footer>
                                  </>
                                ) : null}
                              </>
                            ))
                          : null}
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
