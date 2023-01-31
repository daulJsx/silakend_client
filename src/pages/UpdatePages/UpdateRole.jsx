import React, { useState } from "react";

// Functions
import { SecuringPage } from "../../functions/Securing/SecuringPage";

// Cookies JS
import Cookies from "js-cookie";

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
import { CgUserList } from "react-icons/cg";
import { FiChevronRight } from "react-icons/fi";

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
                const { msg } = response.data;
                navigate(-1);
                swal({
                  title: msg,
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

              <main className="px-2 min-vh-100 mt-4">
                <Row>
                  <Col>
                    <Card className="shadow rounded bg__primary">
                      <Card.Header>
                        <Container>
                          <Row className="gap-3 mt-4">
                            <Col>
                              <h3 className="main__title">Peran Pengguna</h3>
                              <Breadcrumb className="breadcrumb__item mt-3">
                                <Breadcrumb.Item className="breadcrumb__item">
                                  <div className="d-flex text-muted justify-content-center align-items-center gap-2 breadcrumb__text">
                                    <NavLink
                                      to={"/data-peran"}
                                      className="d-flex justify-content-center align-items-center text-muted gap-2"
                                    >
                                      <CgUserList className="fs-5" />
                                      Data
                                    </NavLink>

                                    <FiChevronRight className="fs-6 breadcrumb__divider" />
                                    <span className="color-primary">
                                      Edit Peran
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
                          <Form onSubmit={updateCurrentRole}>
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

                                    <Form.Group className="mb-4">
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

                            <Form.Group>
                              <Button
                                className="btn-post"
                                onClick={updateCurrentRole}
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
        <Navigate to="/data-peran" />
      )
    ) : (
      SecuringPage()
    )
  ) : (
    <Navigate to="/silakend-login" />
  );
};
