import React, { useState } from "react";

// Cookies JS
import Cookies from "js-cookie";

import { SecuringPage } from "../../functions/Securing/SecuringPage";

// Fetch Requirements
import axios from "axios";
import { useQuery } from "react-query";
import FetchVehicles from "../../consAPI/FetchVehicles";

// Redirecting
import { useNavigate, Navigate, NavLink } from "react-router-dom";

// Bootstrap components
import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Breadcrumb from "react-bootstrap/Breadcrumb";

// Components
import { Aside } from "../../components/aside/Aside";
import { NavTop } from "../../components/navtop/NavTop";
import { Footer } from "../../components/footer/Footer";

// icons
import { FaArrowLeft } from "react-icons/fa";
import { BiCog } from "react-icons/bi";
import { FiChevronRight } from "react-icons/fi";

// React Notification
import swal from "sweetalert";

// For checking user have done in authentication
import { useAuthUser } from "react-auth-kit";

export const CreateVM = () => {
  // Get access token
  const token = Cookies.get("token");

  const auth = useAuthUser();
  const navigate = useNavigate();

  // Body for store
  const [vehicleMData, setVehicleMData] = useState({
    vehicle_id: "",
    date: "",
    category: "",
    description: "",
    total_cost: "",
  });

  // Store new vehicle maintenance data
  const postNewVehicleM = async (e) => {
    e.preventDefault();
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    if (
      vehicleMData.vehicle_id !== "" &&
      vehicleMData.date !== "" &&
      vehicleMData.category !== "" &&
      vehicleMData.description !== "" &&
      vehicleMData.total_cost !== ""
    ) {
      try {
        await axios
          .post(
            "http://silakend-server-realtime.test/api/vehiclemaintenances",
            vehicleMData,
            config
          )
          .then((response) => {
            if (response.status === 200) {
              const { msg } = response.data;
              navigate(-1);
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

  // Fetching requirement data
  const { data: vehiclesData } = useQuery("vehicles", FetchVehicles);

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
                    parentLink={-1}
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
                            <h3 className="main__title">Perbaikan Kendaraan</h3>
                            <Breadcrumb className="breadcrumb__item mt-3">
                              <Breadcrumb.Item
                                className="breadcrumb__item"
                                href="#"
                              >
                                <div className="d-flex justify-content-center align-items-center gap-2">
                                  <NavLink
                                    to={-1}
                                    className="d-flex justify-content-center align-items-center text-muted gap-2"
                                  >
                                    <BiCog className="fs-5" />
                                    Data
                                  </NavLink>

                                  <FiChevronRight className="fs-6 breadcrumb__divider" />
                                  <span className="color-primary">
                                    Tambah Data Perbaikan Kendaraan
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
                        <Row>
                          <Col>
                            <Form onSubmit={postNewVehicleM}>
                              <Form.Group className="mb-3">
                                <Form.Label>Kendaraan</Form.Label>
                                <Form.Select
                                  required
                                  style={{
                                    backgroundColor: "#F5F7FC",
                                    border: "none",
                                    padding: "17px",
                                  }}
                                  aria-label="Default select example"
                                  onChange={(e) =>
                                    setVehicleMData({
                                      ...vehicleMData,
                                      vehicle_id: e.target.value,
                                    })
                                  }
                                >
                                  <option>-- Pilih Kendaraan --</option>
                                  {vehiclesData?.map((vehicles) => (
                                    <option
                                      key={vehicles.vehicle_id}
                                      value={vehicles.vehicle_id}
                                    >
                                      {vehicles.name}
                                    </option>
                                  ))}
                                </Form.Select>
                              </Form.Group>

                              <Form.Group className="mb-3">
                                <Form.Label>Tanggal Perbaikan</Form.Label>

                                <Form.Control
                                  required
                                  className="input form-custom"
                                  style={{
                                    backgroundColor: "#F5F7FC",
                                    border: "none",
                                    padding: "15px",
                                  }}
                                  type="date"
                                  onChange={(e) =>
                                    setVehicleMData({
                                      ...vehicleMData,
                                      date: e.target.value,
                                    })
                                  }
                                />
                              </Form.Group>

                              <Form.Group className="mb-3">
                                <Form.Label>masukkan nama perbaikan</Form.Label>

                                <Form.Control
                                  required
                                  className="input form-custom"
                                  style={{
                                    backgroundColor: "#F5F7FC",
                                    border: "none",
                                    padding: "15px",
                                  }}
                                  type="text"
                                  onChange={(e) =>
                                    setVehicleMData({
                                      ...vehicleMData,
                                      category: e.target.value,
                                    })
                                  }
                                />
                              </Form.Group>

                              <Form.Group className="mb-3">
                                <Form.Label>deskripsi kategori</Form.Label>
                                <Form.Control
                                  required
                                  as="textarea"
                                  rows={3}
                                  className="input form-custom"
                                  style={{
                                    backgroundColor: "#F5F7FC",
                                    border: "none",
                                    padding: "15px",
                                  }}
                                  type="text"
                                  onChange={(e) =>
                                    setVehicleMData({
                                      ...vehicleMData,
                                      description: e.target.value,
                                    })
                                  }
                                />
                              </Form.Group>

                              <Form.Group className="mb-4">
                                <Form.Label>Jumlah Pengeluaran</Form.Label>
                                <InputGroup>
                                  <InputGroup.Text
                                    style={{
                                      border: "none",
                                    }}
                                    id="basic-addon2"
                                  >
                                    Rp.
                                  </InputGroup.Text>
                                  <Form.Control
                                    required
                                    className="input form-custom"
                                    style={{
                                      backgroundColor: "#F5F7FC",
                                      border: "none",
                                      padding: "15px",
                                    }}
                                    type="number"
                                    onChange={(e) =>
                                      setVehicleMData({
                                        ...vehicleMData,
                                        total_cost: e.target.value,
                                      })
                                    }
                                  />
                                </InputGroup>
                              </Form.Group>
                              <Form.Group>
                                <Button
                                  className="btn-post"
                                  type="submit"
                                  onClick={postNewVehicleM}
                                >
                                  Tambah
                                </Button>
                              </Form.Group>
                            </Form>
                          </Col>
                        </Row>
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
