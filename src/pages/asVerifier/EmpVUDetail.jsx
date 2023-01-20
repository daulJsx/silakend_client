import React, { useState, useEffect } from "react";

// Cookies JS
import Cookies from "js-cookie";

// Interceptors
import axios from "axios";

// For checking user have done in authentication
import { useAuthUser } from "react-auth-kit";
import { Navigate } from "react-router-dom";

// Function
import { ApproveVU } from "../../functions/Update/ApproveVU";
import { RejectVU } from "../../functions/Update/RejectVU";

// bootstrap components
import { Container, Row, Col, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

// Components
import { AsideVerifier } from "../../components/aside/AsideVerifier";
import { NavTop } from "../../components/navtop/NavTop";
import { Footer } from "../../components/footer/Footer";

// icons
import { FaArrowLeft } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";
import { FiXCircle } from "react-icons/fi";

// React Notification
import swal from "sweetalert";

export const EmpVUDetail = () => {
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
            <Col xs="auto" className="d-none d-lg-block d-flex min-vh-100 px-4">
              <AsideVerifier />
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
                      title={"Rincian Data Peminjaman"}
                      parentLink={"/verifier/pengajuan-pegawai"}
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
                        ? vUDetail.map((vu, index) => (
                            <>
                              <Card.Title className="fs-4 p-4 fw-semibold color-primary">
                                Rincian Data Peminjaman
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
                                        <div className="fw-bold">PEMINJAM</div>
                                        {vu.user !== null ? vu.user.name : null}
                                      </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item
                                      key={index}
                                      as="li"
                                      className="d-flex justify-content-between align-items-start"
                                    >
                                      <div className="ms-2 me-auto">
                                        <div className="fw-bold">
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
                                        <div className="fw-bold">
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
                                        <div className="fw-bold">
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
                                        <div className="fw-bold">DESTINASI</div>
                                        {vu.destination}
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
                                        {vu.start_date} s/d {vu.end_date}
                                      </div>
                                    </ListGroup.Item>

                                    <ListGroup.Item
                                      as="li"
                                      className="d-flex justify-content-between align-items-start"
                                    >
                                      <div className="ms-2 me-auto">
                                        <div className="fw-bold">STATUS</div>
                                        {vu.status === "CANCELED" ? (
                                          <p>Dibatalkan oleh peminjam</p>
                                        ) : (
                                          vu.status
                                        )}
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

                                        {vu.status_description ? (
                                          vu.status_description
                                        ) : (
                                          <p>Belum ada keterangan</p>
                                        )}
                                      </div>
                                    </ListGroup.Item>

                                    {vu.vehicle && vu.driver ? (
                                      <>
                                        <ListGroup.Item
                                          as="li"
                                          className="d-flex justify-content-between align-items-start"
                                        >
                                          <div className="ms-2 me-auto">
                                            <div className="fw-bold">
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
                                            <div className="fw-bold">
                                              KENDARAAN
                                            </div>
                                            {vu.vehicle.name}
                                          </div>
                                        </ListGroup.Item>
                                      </>
                                    ) : null}
                                  </>
                                </ListGroup>
                              </Card.Body>
                              {vu.status === "WAITING" ? (
                                <Card.Footer className="d-flex gap-2">
                                  <Button
                                    onClick={() => ApproveVU(vu)}
                                    variant="success"
                                  >
                                    <div className="d-flex gap-2">
                                      Approve
                                      <FiCheckCircle className="fs-4" />
                                    </div>
                                  </Button>

                                  <Button
                                    onClick={() => RejectVU(vu)}
                                    variant="danger"
                                  >
                                    <div className="d-flex gap-2">
                                      Reject
                                      <FiXCircle className="fs-4" />
                                    </div>
                                  </Button>
                                </Card.Footer>
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
      <Navigate to="/verifier/pengajuan-pegawai" />
    )
  ) : (
    <Navigate to="/silakend-login" />
  );
};
