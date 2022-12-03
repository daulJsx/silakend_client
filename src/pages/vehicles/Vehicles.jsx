import React from "react";

// fetch data requirement
// import { useQuery } from "react-query";
// import Fetch from "./../consAPI/Fetch";

// bootstrap components
import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";

// Components
import { Aside } from "./../../components/aside/Aside";
import { NavTop } from "../../components/navtop/NavTop";
import { Footer } from "../../components/footer/Footer";

// icons
import { AiFillCar } from "react-icons/ai";

export const Vehicles = () => {
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
                    bc={<AiFillCar />}
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
                      <Card.Body>Halaman data kendaraan</Card.Body>
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
