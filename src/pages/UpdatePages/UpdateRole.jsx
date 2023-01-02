import React, { useState } from "react";

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
  const auth = useAuthUser();
  const navigate = useNavigate();

  // Initialize newest maintenance id
  const [roleId, setRoleId] = useState(localStorage.getItem("roleId"));

  // Get the JSON object from local storage
  const roleString = localStorage.getItem("roleToMap");
  // Parse the JSON string into a JavaScript object
  const roleToMap = JSON.parse(roleString);

  // Body for store
  const [updateRole, setUpdateRole] = useState({
    name: "",
    level: "",
  });

  // Store new vehicle data
  function handleError(error) {
    if (error.response.data.message) {
      swal("Ups!", error.response.data.message, "error");
    } else {
      swal("Ups!", error.response.data.msg, "error");
    }
  }

  const updateCurrentRole = async () => {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    if (updateRole.name || updateRole.level != "") {
      swal({
        title: "Yakin?",
        text: "Pastikan kembali perubahan data",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          await axios
            .put(
              `https://silakend-server.xyz/api/roles/${roleId}`,
              updateRole,
              config
            )
            .then((response) => {
              navigate("/data-peran");
              if (response.status === 200) {
                swal({
                  title: "Berhasil!",
                  text: response.data.msg,
                  icon: "success",
                  button: "Tutup",
                });
                const updateV = response.data;
                return updateV;
              }
            })
            .catch((error) => {
              handleError(error);
            });
        } else {
          swal("Data peran aman!");
        }
      });
    } else {
      swal({
        title: "Peringatan",
        text: "Harap ubah data",
        icon: "warning",
        button: "Tutup",
      });
    }
  };

  if (localStorage.getItem("token") && auth()) {
    if (localStorage.getItem("roleId")) {
      return (
        <>
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
                                              setUpdateRole({
                                                ...updateRole,
                                                name: e.target.value,
                                              })
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
                                              setUpdateRole({
                                                ...updateRole,
                                                level: e.target.value,
                                              })
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
        </>
      );
    } else {
      return <Navigate to="/unit-kerja" />;
    }
  } else {
    return <Navigate to="/silakend-login" />;
  }
};
