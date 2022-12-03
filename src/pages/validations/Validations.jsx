import React from "react";

// bootstrap components
import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";

// Components
import { Aside } from "./../../components/aside/Aside";
import { NavTop } from "../../components/navtop/NavTop";
import { Footer } from "../../components/footer/Footer";
import { BsCheckCircleFill } from "react-icons/bs";

export const Validations = () => {
  return (
    <Container fluid>
      <main className="orders-page">
        <Row>
          <Col
            xs="auto"
            className="d-none d-lg-block d-md-block d-xl-block d-flex min-vh-100 px-4"
          >
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
                    bc={<BsCheckCircleFill />}
                  />
                ))}
              </Col>
            </Row>
            {/* NAVBAR */}
            <Container fluid>
              <Row>
                <Col>
                  <main className="min-vh-100">
                    <Card className="p-2">
                      <Card.Body>Halaman validasi order masuk</Card.Body>
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
      </main>
    </Container>
  );
};
