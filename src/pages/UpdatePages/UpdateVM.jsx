import React, { useState } from "react";

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

  // Fetching requirement data
  const { data: vehiclesData } = useQuery("vehicles", FetchVehicles);

  // Initialize newest maintenance id
  const [maintenanceId, setMaintenanceId] = useState(
    localStorage.getItem("maintenanceId")
  );

  // Get the JSON object from local storage
  const VMString = localStorage.getItem("VMToMap");
  // Parse the JSON string into a JavaScript object
  const VMToMap = JSON.parse(VMString);

  // Update current vehicle data
  const handleUpdateVM = async () => {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
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
          const response = await axios
            .put(
              `https://silakend-server.xyz/api/vehiclemaintenances/${maintenanceId}`,
              vehicleMData,
              config
            )
            .then((response) => {
              navigate("/perbaikan-kendaraan");
              if (response.status === 200) {
                swal({
                  title: "Berhasil!",
                  text: response.data.msg,
                  icon: "success",
                  button: "Tutup",
                });
                const updateVM = response.data;
                return updateVM;
              }
            });
        } catch (e) {
          const error = swal("Ups!", "Anda belum merubah apapun", "error");
          throw error;
        }
      } else {
        swal("Data perbaikan aman!");
      }
    });
  };

  if (localStorage.getItem("token") && auth()) {
    if (localStorage.getItem("maintenanceId")) {
      return (
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
                      parentLink={"/kategori-perbaikan"}
                    />
                  ))}
                </Col>
              </Row>
              {/* NAVBAR */}
              <main className="min-vh-100 px-2 mt-4">
                <Row>
                  <Col>
                    <Card>
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
                                      setVehicleMData({
                                        ...vehicleMData,
                                        vehicle_id: e.target.value,
                                      })
                                    }
                                  >
                                    <option>{currentVM.vehicle_id}</option>
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
                                      setVehicleMData({
                                        ...vehicleMData,
                                        date: e.target.value,
                                      })
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
                                      setVehicleMData({
                                        ...vehicleMData,
                                        category: e.target.value,
                                      })
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
                                      setVehicleMData({
                                        ...vehicleMData,
                                        description: e.target.value,
                                      })
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
                                        setVehicleMData({
                                          ...vehicleMData,
                                          total_cost: e.target.value,
                                        })
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
      );
    } else {
      return <Navigate to="/perbaikan-kendaraan" />;
    }
  } else {
    return <Navigate to="/silakend-login" />;
  }
};
