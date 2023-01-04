import React, { useState } from "react";

// Fetch Requirements
import axios from "axios";
import FetchVCategories from "../../consAPI/FetchVCategories";
import { useQuery } from "react-query";

// Redirecting
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

// Bootstrap components
import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { InputGroup } from "react-bootstrap";

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

export const CreateVehicle = () => {
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
  const postNewVehicle = async () => {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    if (
      vehicleData.name ||
      vehicleData.year ||
      vehicleData.tax_date ||
      vehicleData.valid_date ||
      vehicleData.license_number ||
      vehicleData.distance_count ||
      vehicleData.vcategory_id != ""
    ) {
      try {
        await axios
          .post("https://silakend-server.xyz/api/vehicles", vehicleData, config)
          .then((response) => {
            if (response.status === 200) {
              navigate("/data-kendaraan");
              swal({
                title: "Berhasil!",
                text: "Data Kendaraan Ditambahkan",
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

  if (localStorage.getItem("token") && auth()) {
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
                      title={"Tambah Data Kendaraan Dinas"}
                      parentLink={"/data-kendaraan"}
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
                          Silahkan Tambah Data Kendaraan Dinas Baru Disini
                        </Card.Title>

                        <Container>
                          <Row>
                            <Col>
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
                            </Col>
                            <Col>
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
                                  <option>
                                    -- Pilih Kategori Kendaraan --
                                  </option>
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

                              <Form.Group className="mb-3">
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
                            </Col>
                          </Row>
                        </Container>
                      </Card.Body>
                      <Card.Footer>
                        <Button
                          className="btn-post"
                          onClick={postNewVehicle}
                          type="submit"
                        >
                          Tambahkan
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
    return <Navigate to="/silakend-login" />;
  }
};
