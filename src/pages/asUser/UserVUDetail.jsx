import React, { useState, useEffect } from "react";

// Cookies JS
import Cookies from "js-cookie";

// Interceptors
import axios from "axios";

// For checking user have done in authentication
import { useAuthUser } from "react-auth-kit";
import { Navigate } from "react-router-dom";

// bootstrap components
import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

// Components
import { AsideUser } from "../../components/aside/AsideUser";
import { NavTop } from "../../components/navtop/NavTop";
import { Footer } from "../../components/footer/Footer";

// icons
import { FaArrowLeft } from "react-icons/fa";

// React Notification
import swal from "sweetalert";

export const UserVUDetail = () => {
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
            <Col
              xs="auto"
              className="sidebar d-none d-lg-block d-flex min-vh-100 px-4"
            >
              <AsideUser />
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
                      parentLink={"/user/data-pengajuan-peminjaman"}
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
                        Rincian Data Peminjaman Anda
                      </Card.Title>
                      <Card.Body className="d-flex flex-column gap-3">
                        <ListGroup as="ol" numbered className="mb-2">
                          {vUDetail !== null
                            ? vUDetail.map((userOrder, index) => (
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
                                      <div className="fw-bold">DESTINASI</div>
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
                                      <div className="fw-bold">STATUS</div>
                                      {userOrder.status}
                                    </div>
                                  </ListGroup.Item>

                                  <ListGroup.Item
                                    as="li"
                                    className="d-flex justify-content-between align-items-start"
                                  >
                                    <div className="ms-2 me-auto">
                                      <div className="fw-bold">KETERANGAN</div>
                                      {userOrder.status_description ? (
                                        userOrder.status_description
                                      ) : (
                                        <p>Belum ada keterangan</p>
                                      )}
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
      <Navigate to="/user/data-pengajuan-peminjaman" />
    )
  ) : (
    <Navigate to="/silakend-login" />
  );
};
