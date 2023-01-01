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

export const CreateVM = () => {
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

  // Store new vehicle data
  const postNewVehicleM = async () => {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    if (
      vehicleMData.vehicle_id ||
      vehicleMData.date ||
      vehicleMData.category ||
      vehicleMData.description ||
      vehicleMData.total_cost != ""
    ) {
      try {
        await axios
          .post(
            "https://silakend-server.xyz/api/vehiclemaintenances",
            vehicleMData,
            config
          )
          .then((response) => {
            if (response.status === 200) {
              navigate("/kategori-perbaikan");
              swal({
                title: "Berhasil!",
                text: "Data Kategori Perbaikan Telah Dibuat",
                icon: "success",
                button: "Tutup",
              });
            }
          });
      } catch (error) {
        const e = swal({
          title: "Gagal!",
          text: "Error harap dilaporkan!",
          icon: "error",
          button: "Tutup",
        });
        throw e;
      }
    } else {
      swal({
        title: "Peringatan",
        text: "Harap isi semua data!",
        icon: "warning",
        button: "Tutup",
      });
    }
  };

  // Fetching requirement data
  const { data: vehiclesData } = useQuery("vehicles", FetchVehicles);

  if (localStorage.getItem("token") && auth()) {
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
                    title={"Tambah Data Kategori Perbaikan Kendaraan"}
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
                      Silahkan Buat Kategori Perbaikan Kendaraan Disini
                    </Card.Title>
                    <Card.Body className="d-flex flex-column gap-3">
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

                      <Form.Group>
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

                      <Form.Group>
                        <Form.Label>masukkan nama kategori</Form.Label>

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

                      <Form.Group>
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
                    </Card.Body>
                    <Card.Footer>
                      <Button
                        className="btn-post"
                        type="submit"
                        onClick={postNewVehicleM}
                      >
                        Tambah
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
    return <Navigate to="/silakend-login" />;
  }
};
