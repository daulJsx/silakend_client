import React, { useState } from "react";

// Functions
import { SecuringPage } from "../../functions/Securing/SecuringPage";

// Cookies JS
import Cookies from "js-cookie";

// Fetch Requirements
import axios from "axios";

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

export const UpdateRole = () => {
  // Get access token
  const token = Cookies.get("token");

  const auth = useAuthUser();
  const navigate = useNavigate();

  // Initialize newest role id
  const roleId = localStorage.getItem("roleId");

  // Get the JSON object from local storage
  const roleString = localStorage.getItem("roleToMap");
  // Parse the JSON string into a JavaScript object
  const roleToMap = JSON.parse(roleString);

  // if update necessary
  const [currentRoleName] = [roleToMap].map((name) => name.name);
  const [currentRoleLevel] = [roleToMap].map((level) => level.level);

  // handle value changes
  const [newRoleName, setNewRoleName] = useState("");
  const [newRoleLevel, setNewRoleLevel] = useState("");

  // Body for update
  const updateRole = {
    name: newRoleName === "" ? currentRoleName : newRoleName,
    level: newRoleLevel === "" ? currentRoleLevel : newRoleLevel,
  };

  const updateCurrentRole = async (e) => {
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
              `https://silakend-server.xyz/api/roles/${roleId}`,
              updateRole,
              config
            )
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
        swal("Data peran aman!");
      }
    });
  };

  return token ? (
    auth().user_level === 1 ? (
      roleId ? (
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
                      title={"Edit Peran Pengguna"}
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
                      <Form onSubmit={updateCurrentRole}>
                        <Card.Body>
                          <Card.Title className="fs-4 p-4 mb-4 fw-semibold color-primary">
                            Silahkan Ubah Data Peran Disini
                          </Card.Title>

                          <Container>
                            <Row>
                              <Col>
                                {roleToMap
                                  ? [roleToMap].map((currentRole) => (
                                      <>
                                        <Form.Group className="mb-3">
                                          <Form.Label>Nama Peran</Form.Label>
                                          <Form.Control
                                            required
                                            placeholder={currentRole.name}
                                            className="input form-custom"
                                            type="text"
                                            onChange={(e) =>
                                              setNewRoleName(e.target.value)
                                            }
                                          />
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                          <Form.Label>Level</Form.Label>
                                          <Form.Control
                                            required
                                            placeholder={currentRole.level}
                                            className="input form-custom"
                                            type="number"
                                            onChange={(e) =>
                                              setNewRoleLevel(e.target.value)
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
                            onClick={updateCurrentRole}
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
        <Navigate to="/data-peran" />
      )
    ) : (
      SecuringPage()
    )
  ) : (
    <Navigate to="/silakend-login" />
  );
};
