import React from "react";

// fetch data requirement
// import { useQuery } from "react-query";

// bootstrap components
import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";

// Components
import { Aside } from "./../../components/aside/Aside";
import { NavTop } from "../../components/navtop/NavTop";
import { Footer } from "../../components/footer/Footer";

// icons
import { CgHomeAlt } from "react-icons/cg";
import { HiClipboardCopy } from "react-icons/hi";
import { AiFillDashboard } from "react-icons/ai";
import { RiUserReceivedFill } from "react-icons/ri";
import { FaUserClock } from "react-icons/fa";

// Navigating
import { Navigate } from "react-router-dom";

// For checking user have done in authentication
import { useAuthUser } from "react-auth-kit";

// Custom Style
import "../CustomStyles/dash.css";

export const Dashboard = () => {
  const auth = useAuthUser();
  if (localStorage.getItem("token") && auth()) {
    return (
      <>
        <Container fluid>
          <Row>
            <Col xs="auto" className="d-none d-lg-block d-flex min-vh-100 px-4">
              <Aside />
            </Col>
            <Col>
              {/* NAVBAR */}
              <Row>
                <Col>
                  {["end"].map((placement, idx) => (
                    <NavTop
                      key={idx}
                      placement={placement}
                      name={placement}
                      bc={<CgHomeAlt />}
                    />
                  ))}
                </Col>
              </Row>
              {/* NAVBAR */}

              <main className="px-2 d-flex flex-column gap-4 mb-3 min-vh-100">
                <Row>
                  <Col>
                    <Card>
                      <Card.Body className="p-0">
                        <div className="fw-semibold color-primary fs-6 p-3 mb-1">
                          Order 7 Hari Ke Depan
                        </div>
                        <div className="w-full">
                          <Table borderless responsive>
                            <thead>
                              <tr>
                                <th align="center">Tanggal Pinjam</th>
                                <th>Nama Peminjam</th>
                                <th>Kendaraan</th>
                                <th>Dari</th>
                                <th>Tujuan</th>
                                <th>Pengemudi</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                              </tr>
                              <tr>
                                <td>2</td>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

                <Row className="gap-3">
                  <Col>
                    <Card className="primary">
                      <Card.Body>
                        <Container>
                          <Row>
                            <Col md={6} className="py-3 mx-auto ">
                              <div className="primary-icon fs-2">
                                <HiClipboardCopy className="ms-1" />
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <div className="fw-semibold p-1 fs-3">20</div>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <div className="fw-light p-1 mb-3">
                                Jumlah Order Kendaraan Tahun 2022
                              </div>
                            </Col>
                          </Row>
                        </Container>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card className="success">
                      <Card.Body>
                        <Container>
                          <Row>
                            <Col md={6} className="py-3 mx-auto fs-2">
                              <div className="success-icon fs-2 ">
                                <AiFillDashboard />
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <div className="fw-semibold p-1 fs-3">36</div>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <div className="fw-light p-1 mb-3">
                                Jumlah Kilometer Tempuh Kendaraan Tahun 2022
                              </div>
                            </Col>
                          </Row>
                        </Container>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card className="warning">
                      <Card.Body>
                        <Container>
                          <Row>
                            <Col md={6} className="py-3 mx-auto ">
                              <div className="warning-icon fs-2 ">
                                <RiUserReceivedFill />
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <div className="fw-semibold p-1 fs-3">46</div>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <div className="fw-light p-1 mb-3">
                                Jumlah Order Supir Tahun 2022
                              </div>
                            </Col>
                          </Row>
                        </Container>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card className="info">
                      <Card.Body>
                        <Container>
                          <Row>
                            <Col md={6} className="py-3 mx-auto ">
                              <div className="info-icon fs-2 ">
                                <FaUserClock />
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <div className="fw-semibold p-1 fs-3">56</div>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <div className="fw-light p-1">
                                Jumlah Kilometer Tempuh Supir Tahun 2022
                              </div>
                            </Col>
                          </Row>
                        </Container>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Card>
                      <Card.Body>
                        <div className="fw-semibold color-primary p-1 mb-3">
                          Jumlah Order Per-Unit Kerja Tahun 2022
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Card>
                      <Card.Body>
                        <div className="fw-semibold color-primary fs-6 p-1 mb-3">
                          Jumlah Kilometer Order Per-Unit Kerja Tahun 2022
                        </div>
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
      </>
    );
  } else {
    return <Navigate to="/silakend-login" />;
  }
};
