import React, { useState } from "react";

// Cookies JS
import Cookies from "js-cookie";

import { SecuringPage } from "../../functions/Securing/SecuringPage";

// Fetch Requirements
import axios from "axios";

// Redirecting
import { useNavigate, Navigate, NavLink } from "react-router-dom";

// Bootstrap components
import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Breadcrumb from "react-bootstrap/Breadcrumb";

// Components
import { Aside } from "../../components/aside/Aside";
import { NavTop } from "../../components/navtop/NavTop";
import { Footer } from "../../components/footer/Footer";

// icons
import { FaArrowLeft } from "react-icons/fa";
import { RiCarWashingLine } from "react-icons/ri";
import { FiChevronRight } from "react-icons/fi";

// React Notification
import swal from "sweetalert";

// For checking user have done in authentication
import { useAuthUser } from "react-auth-kit";

export const CreateVehicleCat = () => {
  // Get access token
  const token = Cookies.get("token");

  const auth = useAuthUser();
  const navigate = useNavigate();

  // Body for store
  const [newVehicleCat, setNewVehicleCat] = useState({
    name: "",
  });

  const postNewVehicleCat = async (e) => {
    e.preventDefault();

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    if (newVehicleCat.name !== "") {
      try {
        await axios
          .post(
            "https://708c-180-244-139-240.ap.ngrok.io/api/vehiclecategories",
            newVehicleCat,
            config
          )
          .then((response) => {
            if (response.status === 200) {
              const { msg } = response.data;
              navigate("/kategori-kendaraan");
              swal({
                text: msg,
                icon: "success",
                button: false,
                timer: 2000,
              });
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
    } else {
      swal({
        title: "Peringatan",
        text: "Harap isi semua data!",
        icon: "warning",
        button: false,
        timer: 2000,
      });
    }
  };

  return token ? (
    auth().user_level === 1 || auth().user_level === 2 ? (
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
                    parentLink={"/kategori-kendaraan"}
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
                            <h3 className="main__title">Kategori Kendaraan</h3>
                            <Breadcrumb className="breadcrumb__item mt-3">
                              <Breadcrumb.Item className="breadcrumb__item">
                                <div className="d-flex text-muted justify-content-center align-items-center gap-2 breadcrumb__text">
                                  <NavLink
                                    to={"/kategori-kendaraan"}
                                    className="d-flex justify-content-center align-items-center text-muted gap-2"
                                  >
                                    <RiCarWashingLine className="fs-5" />
                                    Data
                                  </NavLink>

                                  <FiChevronRight className="fs-6 breadcrumb__divider" />
                                  <span className="color-primary">
                                    Tambah Kategori
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
                        <Form onSubmit={postNewVehicleCat}>
                          <Card.Body>
                            <Container>
                              <Form.Group className="mb-3">
                                <Form.Label>Nama kategori</Form.Label>
                                <Form.Control
                                  required
                                  className="input form-custom"
                                  type="text"
                                  onChange={(e) =>
                                    setNewVehicleCat({
                                      ...newVehicleCat,
                                      name: e.target.value,
                                    })
                                  }
                                />
                              </Form.Group>

                              <Form.Group>
                                <Button
                                  className="btn-post"
                                  onClick={postNewVehicleCat}
                                  type="submit"
                                >
                                  Tambah
                                </Button>
                              </Form.Group>
                            </Container>
                          </Card.Body>
                        </Form>
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
    ) : (
      SecuringPage()
    )
  ) : (
    <Navigate to="/silakend-login" />
  );
};
