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

// Bootstrap components
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import Breadcrumb from "react-bootstrap/Breadcrumb";

// Components
import { AsideUser } from "../../components/aside/AsideUser";
import { NavTop } from "../../components/navtop/NavTop";
import { Footer } from "../../components/footer/Footer";

// icons
import { HiOutlineClipboardList } from "react-icons/hi";
import { FiChevronRight } from "react-icons/fi";
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
  const [userOrderDetail, setuserOrderDetail] = useState(null);

  useEffect(() => {
    const accessToken = Cookies.get("token");

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    async function fetchuserOrderById() {
      try {
        await axios
          .get(
            `https://708c-180-244-139-240.ap.ngrok.io/api/vehicleusages/${usageId}`,
            config
          )
          .then((response) => {
            if (response.status === 200) {
              setIsLoading(false);
              const userOrderDetail = response.data;
              if (userOrderDetail.length !== 0) {
                setuserOrderDetail(userOrderDetail);
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

    fetchuserOrderById();
  }, []);

  return token ? (
    auth().user_level === 5 ? (
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
                                  Data Pengajuan Anda
                                </h3>

                                <Breadcrumb className="breadcrumb__item mt-3">
                                  <Breadcrumb.Item className="breadcrumb__item">
                                    <div className="d-flex text-muted justify-content-center align-items-center gap-2 breadcrumb__text">
                                      <NavLink
                                        to={-1}
                                        className="d-flex justify-content-center align-items-center text-muted gap-2"
                                      >
                                        <HiOutlineClipboardList className="fs-5" />
                                        Data
                                      </NavLink>

                                      <FiChevronRight className="fs-6 breadcrumb__divider" />
                                      <span className="color-primary">
                                        Rincian Pengajuan
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
                              {userOrderDetail !== null
                                ? userOrderDetail.map((userOrder, index) => {
                                    const startDate = new Date(
                                      userOrder.start_date
                                    );
                                    const endDate = new Date(
                                      userOrder.end_date
                                    );

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
                                            <div className="list__title">
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
                                              WAKTU PEMINJAMAN
                                            </div>
                                            {formattedStartDate} -{" "}
                                            {formattedEndDate}
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

                                        {userOrder.vehicle &&
                                        userOrder.driver ? (
                                          <>
                                            <ListGroup.Item
                                              as="li"
                                              className="d-flex justify-content-between align-items-start position-relative"
                                            >
                                              <div className="ms-2 me-auto">
                                                <div className="list__title">
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
                                                <div className="list__title">
                                                  KENDARAAN
                                                </div>
                                                {userOrder.vehicle.name}
                                              </div>
                                            </ListGroup.Item>
                                          </>
                                        ) : null}

                                        {userOrder.depart_date &&
                                        userOrder.depart_time ? (
                                          <ListGroup.Item
                                            as="li"
                                            className="d-flex justify-content-between align-items-start"
                                          >
                                            <div className="ms-2 me-auto">
                                              <div className="list__title">
                                                WAKTU BERANGKAT
                                              </div>
                                              {userOrder.depart_date} PUKUL{" "}
                                              {userOrder.depart_time}
                                            </div>
                                          </ListGroup.Item>
                                        ) : null}

                                        {userOrder.distance_count_out &&
                                        userOrder.distance_count_in ? (
                                          <>
                                            <ListGroup.Item
                                              as="li"
                                              className="d-flex justify-content-between align-items-start"
                                            >
                                              <div className="ms-2 me-auto">
                                                <div className="list__title">
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
                                                <div className="list__title">
                                                  ODOMETER PULANG
                                                </div>
                                                {userOrder.distance_count_in}
                                              </div>
                                            </ListGroup.Item>
                                          </>
                                        ) : null}

                                        {userOrder.arrive_date &&
                                        userOrder.arrive_time ? (
                                          <ListGroup.Item
                                            as="li"
                                            className="d-flex justify-content-between align-items-start"
                                          >
                                            <div className="ms-2 me-auto">
                                              <div className="list__title">
                                                WAKTU PULANG
                                              </div>
                                              {userOrder.arrive_date} PUKUL{" "}
                                              {userOrder.arrive_time}
                                            </div>
                                          </ListGroup.Item>
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
        <Navigate to="/user/pengajuan-saya" />
      )
    ) : (
      SecuringPage()
    )
  ) : (
    <Navigate to="/silakend-login" />
  );
};
