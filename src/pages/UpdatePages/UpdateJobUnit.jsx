import React, { useState } from "react";

// Cookies JS
import Cookies from "js-cookie";

// Fetch Requirements
import axios from "axios";

// Functions
import { SecuringPage } from "../../functions/Securing/SecuringPage";

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
              `https://silakend-server.xyz/api/jobunits/${unitId}`,
              updateJUnit,
              config
            )
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
                      title={"Edit Data Unit Kerja"}
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
                      <Form onSubmit={updateJobUnit}>
                        <Card.Body>
                          <Card.Title className="fs-4 p-4 mb-4 fw-semibold color-primary">
                            Silahkan Ubah Data Unit Kerja Disini
                          </Card.Title>

                          <Container>
                            <Row>
                              <Col>
                                {jobUnitToMap
                                  ? [jobUnitToMap].map((currentJobUnit) => (
                                      <>
                                        <Form.Group className="mb-3">
                                          <Form.Label>
                                            Nama Unit Kerja
                                          </Form.Label>
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

                                        <Form.Group className="mb-3">
                                          <Form.Label>
                                            Kode Unit Kerja
                                          </Form.Label>
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
                              </Col>
                            </Row>
                          </Container>
                        </Card.Body>
                        <Card.Footer>
                          <Button
                            className="btn-post"
                            onClick={updateJobUnit}
                            type="submit"
                          >
                            Simpan
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
        <Navigate to="/unit-kerja" />
      )
    ) : (
      SecuringPage()
    )
  ) : (
    <Navigate to="/silakend-login" />
  );
};
