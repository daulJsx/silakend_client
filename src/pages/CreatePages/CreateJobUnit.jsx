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

export const CreateJobUnit = () => {
  // Get access token
  const token = Cookies.get("token");

  const auth = useAuthUser();
  const navigate = useNavigate();

  // Body for store
  const [newJobUnit, setNewJobUnit] = useState({
    name: "",
    unit_account: "",
  });

  const postNewJobUnit = async (e) => {
    e.preventDefault();

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    if (newJobUnit.name !== "" && newJobUnit.unit_account !== "") {
      try {
        await axios
          .post("https://silakend-server.xyz/api/jobunits", newJobUnit, config)
          .then((response) => {
            if (response.status === 200) {
              navigate("/unit-kerja");
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
                      title={"Tambah Data Unit Kerja"}
                      parentLink={"/unit-kerja"}
                    />
                  ))}
                </Col>
              </Row>
              {/* NAVBAR */}
              <main className="min-vh-10 px-2 mt-4">
                <Row>
                  <Col>
                    <Card>
                      <Form onSubmit={postNewJobUnit}>
                        <Card.Body>
                          <Card.Title className="fs-4 p-4 mb-4 fw-semibold color-primary">
                            Silahkan Tambah Data Unit Kerja Baru Disini
                          </Card.Title>

                          <Container>
                            <Row>
                              <Col>
                                <Form.Group className="mb-3">
                                  <Form.Label>Nama Unit Kerja</Form.Label>
                                  <Form.Control
                                    required
                                    className="input form-custom"
                                    type="text"
                                    onChange={(e) =>
                                      setNewJobUnit({
                                        ...newJobUnit,
                                        name: e.target.value,
                                      })
                                    }
                                  />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                  <Form.Label>Kode Unit Kerja</Form.Label>
                                  <Form.Control
                                    required
                                    className="input form-custom"
                                    type="text"
                                    onChange={(e) =>
                                      setNewJobUnit({
                                        ...newJobUnit,
                                        unit_account: e.target.value,
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
                            onClick={postNewJobUnit}
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
