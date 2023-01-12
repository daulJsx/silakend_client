import React, { useState } from "react";

// Fetch Requirements
import axios from "axios";

// Cookies JS
import Cookies from "js-cookie";

// Redirecting
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

// Bootstrap components
import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// Components
import { Aside } from "../../components/aside/Aside";
import { NavTop } from "../../components/navtop/NavTop";
import { Footer } from "../../components/footer/Footer";

// icons
import { FaArrowLeft } from "react-icons/fa";

// React Notification
import swal from "sweetalert";

// For checking user have done in authentication
import { useAuthUser } from "react-auth-kit";

import { SecuringPage } from "../../functions/Securing/SecuringPage";

export const CreateRole = () => {
  // Get access token
  const token = Cookies.get("token");

  const auth = useAuthUser();
  const navigate = useNavigate();

  // Body for store
  const [newRole, setNewRole] = useState({
    name: "",
    level: "",
  });

  const postNewRole = async (e) => {
    e.preventDefault();

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    if (newRole.name !== "" || newRole.level !== "") {
      try {
        await axios
          .post("https://silakend-server.xyz/api/roles", newRole, config)
          .then((response) => {
            if (response.status === 200) {
              navigate("/data-peran");
              swal({
                title: "Berhasil!",
                text: response.data.msg,
                icon: "success",
                button: "Tutup",
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
        button: "Tutup",
      });
    }
  };

  {
    return token ? (
      auth().user_level === 1 ? (
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
                      title={"Tambah Peran Pengguna"}
                      parentLink={"/data-peran"}
                    />
                  ))}
                </Col>
              </Row>
              {/* NAVBAR */}
              <main className="min-vh-10 px-2 mt-4">
                <Row>
                  <Col>
                    <Card>
                      <Form onSubmit={postNewRole}>
                        <Card.Body>
                          <Card.Title className="fs-4 p-4 mb-4 fw-semibold color-primary">
                            Silahkan Tambah Peran Baru Untuk Pengguna Disini
                          </Card.Title>

                          <Container>
                            <Row>
                              <Col>
                                <Form.Group className="mb-3">
                                  <Form.Label>Nama Peran</Form.Label>
                                  <Form.Control
                                    required
                                    className="input form-custom"
                                    type="text"
                                    onChange={(e) =>
                                      setNewRole({
                                        ...newRole,
                                        name: e.target.value,
                                      })
                                    }
                                  />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                  <Form.Label>level</Form.Label>
                                  <Form.Control
                                    required
                                    className="input form-custom"
                                    type="number"
                                    onChange={(e) =>
                                      setNewRole({
                                        ...newRole,
                                        level: e.target.value,
                                      })
                                    }
                                  />
                                </Form.Group>
                              </Col>
                            </Row>
                          </Container>
                        </Card.Body>
                        <Card.Footer>
                          <Button
                            className="btn-post"
                            onClick={postNewRole}
                            type="submit"
                          >
                            Tambahkan
                          </Button>
                        </Card.Footer>
                      </Form>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Footer />
                  </Col>
                </Row>
              </main>
            </Col>
          </Row>
        </Container>
      ) : (
        SecuringPage()
      )
    ) : (
      <Navigate to="/silakend-login" />
    );
  }
};
