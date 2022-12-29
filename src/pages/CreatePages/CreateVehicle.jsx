import React, { useState } from "react";

// Fetch Requirements
import axios from "axios";
import FetchVCategories from "../../consAPI/FetchVCategories";
import { useQuery } from "react-query";

// Secured the page
import { useIsAuthenticated } from "react-auth-kit";
import { redirect } from "react-router-dom";

// Redirecting
import { useNavigate } from "react-router-dom";

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

export const CreateVehicle = () => {
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

  if (useIsAuthenticated()) {
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
              <Container fluid>
                <Row>
                  <Col>
                    <main className="min-vh-100">
                      <Card>
                        <Card.Body>
                          <Card.Title className="fs-4 p-4 fw-semibold color-primary">
                            Silahkan Tambahkan Data Kendaraan Dinas Baru Disini
                          </Card.Title>

                          <Container>
                            <Row>
                              <Col>
                                <Form.Group className="mb-3 form-floating">
                                  <Form.Control
                                    required
                                    className="input form-custom"
                                    name="name"
                                    type="text"
                                    id="name"
                                    placeholder="Nama Kendaraan"
                                    onChange={(e) =>
                                      setVehicleData({
                                        ...vehicleData,
                                        name: e.target.value,
                                      })
                                    }
                                  />
                                  <Form.Label
                                    className="color-primary"
                                    for="name"
                                  >
                                    Nama Kendaraan
                                  </Form.Label>
                                </Form.Group>

                                <Form.Group className="mb-3 form-floating">
                                  <Form.Control
                                    required
                                    className="input form-custom"
                                    name="license_number"
                                    type="text"
                                    id="license_number"
                                    placeholder="Nomor Polisi"
                                    onChange={(e) =>
                                      setVehicleData({
                                        ...vehicleData,
                                        license_number: e.target.value,
                                      })
                                    }
                                  />
                                  <Form.Label
                                    className="color-primary"
                                    for="license_number"
                                  >
                                    Nomor Polisi
                                  </Form.Label>
                                </Form.Group>

                                <Form.Group className="mb-3 form-floating">
                                  <Form.Control
                                    required
                                    className="input form-custom"
                                    name="year"
                                    type="text"
                                    id="year"
                                    placeholder="Tahun Pembuatan"
                                    onChange={(e) =>
                                      setVehicleData({
                                        ...vehicleData,
                                        year: e.target.value,
                                      })
                                    }
                                  />
                                  <Form.Label
                                    className="color-primary"
                                    for="year"
                                  >
                                    Tahun Pembuatan
                                  </Form.Label>
                                </Form.Group>

                                <Form.Group className="mb-3 form-floating">
                                  <Form.Control
                                    required
                                    className="input form-custom"
                                    name="distance_count"
                                    type="number"
                                    id="distance_count"
                                    placeholder="Dalam satuan KM"
                                    onChange={(e) =>
                                      setVehicleData({
                                        ...vehicleData,
                                        distance_count: e.target.value,
                                      })
                                    }
                                  />
                                  <Form.Label
                                    className="color-primary"
                                    for="distance_count"
                                  >
                                    Jumlah Kilometer Tempuh (Dalam satuan KM)
                                  </Form.Label>
                                </Form.Group>
                              </Col>
                              <Col>
                                <Form.Group className="mb-3">
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

                                <Form.Group className="mb-3 form-floating">
                                  <Form.Control
                                    className="input form-custom"
                                    name="tax_date"
                                    type="date"
                                    id="tax_date"
                                    placeholder="Waktu Pajak"
                                    onChange={(e) =>
                                      setVehicleData({
                                        ...vehicleData,
                                        tax_date: e.target.value,
                                      })
                                    }
                                  />
                                  <Form.Label
                                    className="color-primary"
                                    for="tax_date"
                                  >
                                    Waktu Pajak
                                  </Form.Label>
                                </Form.Group>

                                <Form.Group className="mb-3 form-floating">
                                  <Form.Control
                                    required
                                    className="input form-custom"
                                    name="valid_date"
                                    type="date"
                                    id="valid_date"
                                    placeholder="Tanggal Berlaku"
                                    onChange={(e) =>
                                      setVehicleData({
                                        ...vehicleData,
                                        valid_date: e.target.value,
                                      })
                                    }
                                  />
                                  <Form.Label
                                    className="color-primary"
                                    for="valid_date"
                                  >
                                    Tanggal Berlaku
                                  </Form.Label>
                                </Form.Group>
                              </Col>
                            </Row>
                          </Container>
                        </Card.Body>
                        <Card.Footer>
                          <Container>
                            <Button
                              className="btn-post"
                              onClick={postNewVehicle}
                              type="submit"
                            >
                              Tambahkan
                            </Button>
                          </Container>
                        </Card.Footer>
                      </Card>
                    </main>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Footer />
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </>
    );
  } else {
    return redirect("/silakend-login");
  }
};
