import React, { useState } from "react";

// Cookies JS
import Cookies from "js-cookie";

// Fetch Requirements
import axios from "axios";
import FetchVCategories from "../../consAPI/FetchVCategories";
import { useQuery } from "react-query";

// Redirecting
import { useNavigate, NavLink, Navigate } from "react-router-dom";

// Bootstrap components
import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { InputGroup } from "react-bootstrap";
import Breadcrumb from "react-bootstrap/Breadcrumb";

// Components
import { Aside } from "../../components/aside/Aside";
import { NavTop } from "../../components/navtop/NavTop";
import { Footer } from "../../components/footer/Footer";

// icons
import { FaArrowLeft } from "react-icons/fa";
import { RiCarLine } from "react-icons/ri";
import { FiChevronRight } from "react-icons/fi";

// React Notification
import swal from "sweetalert";

// For checking user have done in authentication
import { useAuthUser } from "react-auth-kit";

import { SecuringPage } from "../../functions/Securing/SecuringPage";

export const CreateVehicle = () => {
  // Get access token
  const token = Cookies.get("token");

  const auth = useAuthUser();
  const navigate = useNavigate();

  // Fetch all vehicle category
  const { data: vCategoriesData } = useQuery("vcategories", FetchVCategories);

  // Body for store
  const [vehicleData, setVehicleData] = useState({
    name: "",
    year: "",
    tax_date: "",
    valid_date: "",
    license_number: "",
    distance_count: "",
    vcategory_id: "",
  });

  // Store new vehicle data
  const postNewVehicle = async (e) => {
    e.preventDefault();
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    if (
      vehicleData.name !== "" &&
      vehicleData.year !== "" &&
      vehicleData.tax_date !== "" &&
      vehicleData.valid_date !== "" &&
      vehicleData.license_number !== "" &&
      vehicleData.distance_count !== "" &&
      vehicleData.vcategory_id !== ""
    ) {
      try {
        await axios
          .post("http://silakend-server-realtime.test/api/vehicles", vehicleData, config)
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
                    title={"Tambah Data Kendaraan Dinas"}
                    parentLink={"/data-kendaraan"}
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
                            <h3 className="main__title">Kendaraan Dinas</h3>
                            <Breadcrumb className="breadcrumb__item mt-3">
                              <Breadcrumb.Item className="breadcrumb__item">
                                <div className="d-flex text-muted justify-content-center align-items-center gap-2 breadcrumb__text">
                                  <NavLink
                                    to={"/data-kendaraan"}
                                    className="d-flex justify-content-center align-items-center text-muted gap-2"
                                  >
                                    <RiCarLine className="fs-5" />
                                    Data
                                  </NavLink>

                                  <FiChevronRight className="fs-6 breadcrumb__divider" />
                                  <span className="color-primary">
                                    Tambah Kendaraan
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
                        <Form onSubmit={postNewVehicle}>
                          <Form.Group className="mb-3">
                            <Form.Label>Nama Kendaraan</Form.Label>
                            <Form.Control
                              required
                              className="input form-custom"
                              type="text"
                              onChange={(e) =>
                                setVehicleData({
                                  ...vehicleData,
                                  name: e.target.value,
                                })
                              }
                            />
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>Nomor Polisi</Form.Label>
                            <Form.Control
                              required
                              className="input form-custom"
                              type="text"
                              onChange={(e) =>
                                setVehicleData({
                                  ...vehicleData,
                                  license_number: e.target.value,
                                })
                              }
                            />
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>Tahun Pembuatan</Form.Label>
                            <Form.Control
                              required
                              className="input form-custom"
                              type="text"
                              onChange={(e) =>
                                setVehicleData({
                                  ...vehicleData,
                                  year: e.target.value,
                                })
                              }
                            />
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>Jumlah Kilometer Tempuh</Form.Label>
                            <InputGroup>
                              <Form.Control
                                required
                                className="input form-custom"
                                type="number"
                                onChange={(e) =>
                                  setVehicleData({
                                    ...vehicleData,
                                    distance_count: e.target.value,
                                  })
                                }
                              />
                              <InputGroup.Text style={{ border: "none" }}>
                                KM
                              </InputGroup.Text>
                            </InputGroup>
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Kategori Kendaraan</Form.Label>
                            <Form.Select
                              style={{
                                backgroundColor: "#F5F7FC",
                                border: "none",
                                padding: "17px",
                              }}
                              aria-label="Default select example"
                              onChange={(e) =>
                                setVehicleData({
                                  ...vehicleData,
                                  vcategory_id: e.target.value,
                                })
                              }
                            >
                              <option>-- Pilih Kategori Kendaraan --</option>
                              {vCategoriesData?.map((vcategories) => (
                                <option
                                  key={vcategories.vcategory_id}
                                  value={vcategories.vcategory_id}
                                >
                                  {vcategories.name}
                                </option>
                              ))}
                            </Form.Select>
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>Tanggal Pajak</Form.Label>
                            <Form.Control
                              className="input form-custom"
                              type="date"
                              onChange={(e) =>
                                setVehicleData({
                                  ...vehicleData,
                                  tax_date: e.target.value,
                                })
                              }
                            />
                          </Form.Group>

                          <Form.Group className="mb-4">
                            <Form.Label>Tanggal Berlaku</Form.Label>
                            <Form.Control
                              required
                              className="input form-custom"
                              type="date"
                              onChange={(e) =>
                                setVehicleData({
                                  ...vehicleData,
                                  valid_date: e.target.value,
                                })
                              }
                            />
                          </Form.Group>

                          <Form.Group>
                            <Button
                              className="btn-post"
                              onClick={postNewVehicle}
                              type="submit"
                            >
                              Tambah
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
      SecuringPage()
    )
  ) : (
    <Navigate to="/silakend-login" />
  );
};
