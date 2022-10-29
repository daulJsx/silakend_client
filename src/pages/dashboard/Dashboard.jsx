import React from "react";

import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";

// Components
import { Aside } from "./../../components/aside/Aside";
import { NavTop } from "../../components/navtop/NavTop";

import "./dash.css";

function Dashboard() {
  return (
    <Container fluid>
      <Row>
        {/* SIDEBAR */}
        <Col
          xs="auto"
          className="sidebar d-none d-lg-block d-md-block d-xl-block d-flex min-vh-100 px-4"
        >
          <Aside />
        </Col>
        {/* SIDEBAR */}

        <Col>
          {/* NAVBAR */}
          <Row>
            <Col>
              <NavTop />
            </Col>
          </Row>
          {/* NAVBAR */}
          <Container fluid>
            <Row>
              <Col>
                <main className="min-vh-100">
                  <Card>
                    <Card.Body>This is some text within a card body.</Card.Body>
                  </Card>
                </main>
              </Col>
            </Row>
            <Row>
              <Col>
                <footer>
                  <nav className="footer sticky-bottom text-center">
                    this is footer
                  </nav>
                </footer>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
