import React, { useState } from "react";

// Cookies JS
import Cookies from "js-cookie";

// Functions
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

export const UpdateVM = () => {
  // Get access token
  const token = Cookies.get("token");

  const auth = useAuthUser();
  const navigate = useNavigate();

  // Initialize newest maintenance id
  const maintenanceId = localStorage.getItem("maintenanceId");

  // Get the JSON object from local storage
  const VMString = localStorage.getItem("VMToMap");
  // Parse the JSON string into a JavaScript object
  const VMToMap = JSON.parse(VMString);

  // if update necessary
  const [currentVehicleId] = [VMToMap].map((vId) => vId.vehicle_id);
  const [currentDate] = [VMToMap].map((date) => date.date);
  const [currentDesc] = [VMToMap].map((desc) => desc.description);
  const [currentCategory] = [VMToMap].map((cat) => cat.category);
  const [currentTotalCost] = [VMToMap].map((tc) => tc.total_cost);

  // handle value changes
  const [newVehicle, setNewVehicle] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newTotalCost, setNewTotalCost] = useState("");

  // Body for store
  const vehicleMData = {
    vehicle_id: newVehicle === "" ? currentVehicleId : newVehicle,
    date: newDate === "" ? currentDate : newDate,
    category: newCategory === "" ? currentCategory : newCategory,
    description: newDesc === "" ? currentDesc : newDesc,
    total_cost: newTotalCost === "" ? currentTotalCost : newTotalCost,
  };

  // Fetching requirement data
  const { data: vehiclesData } = useQuery("vehicles", FetchVehicles);

  // Update current vehicle maintenance data
  const handleUpdateVM = async (e) => {
    e.preventDefault();

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    swal({
      title: "Yakin?",
      text: "Pastikan kembali perubahan data perbaikan",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          await axios
            .put(
              `https://708c-180-244-139-240.ap.ngrok.io/api/vehiclemaintenances/${maintenanceId}`,
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
        swal("Data perbaikan aman!");
      }
    });
  };

  return token ? (
    auth().user_level === 1 || auth().user_level === 2 ? (
      maintenanceId ? (
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
                          <Row className="gap-3 mt-4 me-3">
                            <Col>
                              <h3 className="main__title">
                                Perbaikan Kendaraan
                              </h3>
                              <Breadcrumb className="breadcrumb__item mt-3">
                                <Breadcrumb.Item className="breadcrumb__item">
                                  <div className="d-flex text-muted justify-content-center align-items-center gap-2 breadcrumb__text">
                                    <NavLink
                                      to={-1}
                                      className="d-flex justify-content-center align-items-center text-muted gap-2"
                                    >
                                      <BiCog className="fs-5" />
                                      Data
                                    </NavLink>

                                    <FiChevronRight className="fs-6 breadcrumb__divider" />
                                    <span className="color-primary">
                                      Edit Perbaikan
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
                              <Form onSubmit={handleUpdateVM}>
                                {VMToMap != ""
                                  ? [VMToMap].map((currentVM) => (
                                      <>
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
                                              setNewVehicle(e.target.value)
                                            }
                                          >
                                            <option>
                                              {currentVM.vehicle.name}
                                            </option>
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
                                          <Form.Label>
                                            Tanggal Perbaikan Saat Ini :{" "}
                                            <span className="fw-bold text-dark">
                                              {currentVM.date}
                                            </span>
                                          </Form.Label>

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
                                              setNewDate(e.target.value)
                                            }
                                          />
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                          <Form.Label>
                                            masukkan nama kategori
                                          </Form.Label>

                                          <Form.Control
                                            required
                                            placeholder={currentVM.category}
                                            className="input form-custom"
                                            style={{
                                              backgroundColor: "#F5F7FC",
                                              border: "none",
                                              padding: "15px",
                                            }}
                                            type="text"
                                            onChange={(e) =>
                                              setNewCategory(e.target.value)
                                            }
                                          />
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                          <Form.Label>
                                            deskripsi kategori
                                          </Form.Label>
                                          <Form.Control
                                            required
                                            placeholder={currentVM.description}
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
                                              setNewDesc(e.target.value)
                                            }
                                          />
                                        </Form.Group>

                                        <Form.Group className="mb-4">
                                          <Form.Label>
                                            Jumlah Pengeluaran
                                          </Form.Label>
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
                                              placeholder={currentVM.total_cost}
                                              className="input form-custom"
                                              style={{
                                                backgroundColor: "#F5F7FC",
                                                border: "none",
                                                padding: "15px",
                                              }}
                                              type="number"
                                              onChange={(e) =>
                                                setNewTotalCost(e.target.value)
                                              }
                                            />
                                          </InputGroup>
                                        </Form.Group>

                                        <Button
                                          className="btn__primary"
                                          type="submit"
                                          onClick={handleUpdateVM}
                                        >
                                          Simpan
                                        </Button>
                                      </>
                                    ))
                                  : null}
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
        <Navigate to="/perbaikan-kendaraan" />
      )
    ) : (
      SecuringPage()
    )
  ) : (
    <Navigate to="/silakend-login" />
  );
};
