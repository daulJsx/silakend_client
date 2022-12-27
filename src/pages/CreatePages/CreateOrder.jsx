import React from "react";

// // Axios
// import axios from "axios";

// // Fetch Requirements
// import { useQuery } from "react-query";

// Secured the page
import { useIsAuthenticated } from "react-auth-kit";
import { redirect } from "react-router-dom";

// Bootstrap components
import { Container, Row, Col } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";

// Components
import { Aside } from "../../components/aside/Aside";
import { NavTop } from "../../components/navtop/NavTop";
import { Footer } from "../../components/footer/Footer";

// icons
import { FaArrowLeft } from "react-icons/fa";

export const CreateOrder = () => {
  if (useIsAuthenticated()) {
    return (
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
                    title={"Tambah Data Orderan Baru"}
                    parentLink={"/order-peminjaman"}
                  />
                ))}
              </Col>
            </Row>
            {/* NAVBAR */}
            <Container fluid>
              <Row>
                <Col>
                  <main className="min-vh-100">
                    <Card>
                      <Card.Title className="fs-4 color-primary p-4">
                        Silahkan Tambahkan Order Baru Disini
                      </Card.Title>
                      <Card.Body className="p-0"></Card.Body>
                      <Card.Footer>
                        <Container>
                          <Button className="btn-post" type="submit">
                            Tambah
                          </Button>
                        </Container>
                      </Card.Footer>
                    </Card>
                  </main>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Footer />
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    );
  } else {
    return redirect("/silakend-login");
  }
};
