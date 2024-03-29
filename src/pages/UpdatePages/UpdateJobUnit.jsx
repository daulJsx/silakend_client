import React, { useState } from "react";

// Cookies JS
import Cookies from "js-cookie";

// Fetch Requirements
import axios from "axios";

// Functions
import { SecuringPage } from "../../functions/Securing/SecuringPage";

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
import { RiCommunityLine } from "react-icons/ri";
import { FiChevronRight } from "react-icons/fi";

// React Notification
import swal from "sweetalert";

// For checking user have done in authentication
import { useAuthUser } from "react-auth-kit";

export const UpdateJobUnit = () => {
  // Get access token
  const token = Cookies.get("token");

  const auth = useAuthUser();
  const navigate = useNavigate();

  // Initialize newest maintenance id
  const unitId = localStorage.getItem("unitId");

  // Get the JSON object from local storage
  const jUnitString = localStorage.getItem("jobUnitToMap");
  // Parse the JSON string into a JavaScript object
  const jobUnitToMap = JSON.parse(jUnitString);

  // Handle changes
  const [newJUName, setNewJUName] = useState("");
  const [newJUCode, setNewJUCode] = useState("");

  // if update necessary
  const [currentJUName] = [jobUnitToMap].map((name) => name.name);
  const [currentJUCode] = [jobUnitToMap].map((code) => code.unit_account);

  // Body for store
  const updateJUnit = {
    name: newJUName === "" ? currentJUName : newJUName,
    unit_account: newJUCode === "" ? currentJUCode : newJUCode,
  };

  // update function
  const updateJobUnit = async (e) => {
    e.preventDefault();

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    swal({
      title: "Yakin?",
      text: "Pastikan kembali perubahan data",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          await axios
            .put(
              `https://708c-180-244-139-240.ap.ngrok.io/api/jobunits/${unitId}`,
              updateJUnit,
              config
            )
            .then((response) => {
              if (response.status === 200) {
                const { msg } = response.data;
                navigate("/unit-kerja");
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
        swal("Data unit kerja aman!");
      }
    });
  };

  return token ? (
    auth().user_level === 1 ? (
      unitId ? (
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
                      parentLink={"/unit-kerja"}
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
                              <h3 className="main__title">Unit Kerja</h3>
                              <Breadcrumb className="breadcrumb__item mt-3">
                                <Breadcrumb.Item className="breadcrumb__item">
                                  <div className="d-flex text-muted justify-content-center align-items-center gap-2 breadcrumb__text">
                                    <NavLink
                                      to={"/unit-kerja"}
                                      className="d-flex justify-content-center align-items-center text-muted gap-2"
                                    >
                                      <RiCommunityLine className="fs-5" />
                                      Data
                                    </NavLink>

                                    <FiChevronRight className="fs-6 breadcrumb__divider" />
                                    <span className="color-primary">
                                      Edit Unit Kerja
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
                          <Form onSubmit={updateJobUnit}>
                            {jobUnitToMap
                              ? [jobUnitToMap].map((currentJobUnit) => (
                                  <>
                                    <Form.Group className="mb-3">
                                      <Form.Label>Nama Unit Kerja</Form.Label>
                                      <Form.Control
                                        required
                                        placeholder={currentJobUnit.name}
                                        className="input form-custom"
                                        type="text"
                                        onChange={(e) =>
                                          setNewJUName(e.target.value)
                                        }
                                      />
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                      <Form.Label>Kode Unit Kerja</Form.Label>
                                      <Form.Control
                                        required
                                        placeholder={
                                          currentJobUnit.unit_account
                                        }
                                        className="input form-custom"
                                        type="text"
                                        onChange={(e) =>
                                          setNewJUCode(e.target.value)
                                        }
                                      />
                                    </Form.Group>
                                  </>
                                ))
                              : null}

                            <Form.Group>
                              <Button
                                className="btn-post"
                                onClick={updateJobUnit}
                                type="submit"
                              >
                                Simpan
                              </Button>
                            </Form.Group>
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
        <Navigate to="/unit-kerja" />
      )
    ) : (
      SecuringPage()
    )
  ) : (
    <Navigate to="/silakend-login" />
  );
};
