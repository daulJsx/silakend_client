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
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

// Bootstrap components
import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
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
              `https://silakend-server.xyz/api/vehiclemaintenances/${maintenanceId}`,
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
                      title={"Tambah Data Perbaikan Kendaraan"}
                      parentLink={"/perbaikan-kendaraan"}
                    />
                  ))}
                </Col>
              </Row>
              {/* NAVBAR */}
              <main className="min-vh-100 px-2 mt-4">
                <Row>
                  <Col>
                    <Card>
                      <Form onSubmit={handleUpdateVM}>
                        <Card.Title className="fs-4 p-4 mb-4 fw-semibold color-primary">
                          Silahkan Buat Data Perbaikan Kendaraan Baru Disini
                        </Card.Title>
                        <Card.Body className="d-flex flex-column gap-3">
                          {VMToMap != ""
                            ? [VMToMap].map((currentVM) => (
                                <>
                                  <Form.Group>
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
                                      <option>{currentVM.vehicle.name}</option>
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

                                  <Form.Group>
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

                                  <Form.Group>
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

                                  <Form.Group>
                                    <Form.Label>deskripsi kategori</Form.Label>
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

                                  <Form.Group>
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
                                </>
                              ))
                            : null}
                        </Card.Body>
                        <Card.Footer>
                          <Button
                            className="btn-post"
                            type="submit"
                            onClick={handleUpdateVM}
                          >
                            Simpan
                          </Button>
                        </Card.Footer>
                      </Form>
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
