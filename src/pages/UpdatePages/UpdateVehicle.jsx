import React, { useState, useEffect } from "react";

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

// Components
import { Aside } from "../../components/aside/Aside";
import { NavTop } from "../../components/navtop/NavTop";
import { Footer } from "../../components/footer/Footer";

// icons
import { FaArrowLeft } from "react-icons/fa";

// React Notification
import swal from "sweetalert";

export const UpdateVehicle = () => {
  const navigate = useNavigate();

  //   Change vehicle dynamically
  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [taxDate, setTaxDate] = useState("");
  const [validDate, setValidDate] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [distanceCount, setDistanceCount] = useState("");
  const [vCatId, setVCatId] = useState("");

  //   Load current vehicle data on this page
  useEffect(() => {
    setId(localStorage.getItem("vehicleId"));
    setName(localStorage.getItem("vehicleName"));
    setYear(localStorage.getItem("year"));
    setTaxDate(localStorage.getItem("taxDate"));
    setValidDate(localStorage.getItem("validDate"));
    setLicenseNumber(localStorage.getItem("licenseNumber"));
    setDistanceCount(localStorage.getItem("distanceCount"));
    setVCatId(localStorage.getItem("vcatId"));
  }, []);

  // Fetch all vehicle category
  const { data: vCategoriesData } = useQuery("vcategories", FetchVCategories);

  // Body for store
  const body = {
    name: name,
    year: year,
    tax_date: taxDate,
    valid_date: validDate,
    license_number: licenseNumber,
    distance_count: distanceCount,
    vcategory_id: vCatId,
  };

  // Update current vehicle data
  const handleUpdateV = async () => {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    swal({
      title: "Yakin?",
      text: "Pastikan kembali perubahan data kendaraan",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const response = await axios
            .put(`https://silakend-server.xyz/api/vehicles/${id}`, body, config)
            .then((response) => {
              navigate("/data-kendaraan");
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
            });
        } catch (e) {
          const error = swal("Ups!", "Anda belum merubah apapun", "error");
          throw error;
        }
      } else {
        swal("Data kendaraan aman!");
      }
    });
  };

  if (localStorage.getItem("token")) {
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
                                    value={name}
                                    className="input form-custom"
                                    name="name"
                                    type="text"
                                    id="name"
                                    placeholder="Nama Kendaraan"
                                    onChange={(e) => setName(e.target.value)}
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
                                    value={licenseNumber}
                                    className="input form-custom"
                                    name="license_number"
                                    type="text"
                                    id="license_number"
                                    placeholder="Nomor Polisi"
                                    onChange={(e) =>
                                      setLicenseNumber(e.target.value)
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
                                    value={year}
                                    className="input form-custom"
                                    name="year"
                                    type="text"
                                    id="year"
                                    placeholder="Tahun Pembuatan"
                                    onChange={(e) => setYear(e.target.value)}
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
                                    value={distanceCount}
                                    className="input form-custom"
                                    name="distance_count"
                                    type="number"
                                    id="distance_count"
                                    placeholder="Dalam satuan KM"
                                    onChange={(e) =>
                                      setDistanceCount(e.target.value)
                                    }
                                  />
                                  <Form.Label
                                    className="color-primary"
                                    for="distance_count"
                                  >
                                    Jumlah Kilometer Tempuh
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
                                    onChange={(e) => setVCatId(e.target.value)}
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
                                    value={taxDate}
                                    name="tax_date"
                                    type="date"
                                    id="tax_date"
                                    placeholder="Nama Kendaraan"
                                    onChange={(e) => setTaxDate(e.target.value)}
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
                                    value={validDate}
                                    className="input form-custom"
                                    name="valid_date"
                                    type="date"
                                    id="valid_date"
                                    placeholder="Nama Kendaraan"
                                    onChange={(e) =>
                                      setValidDate(e.target.value)
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
                              onClick={handleUpdateV}
                              type="submit"
                            >
                              Simpan
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
    return <Navigate to="/silakend-login" />;
  }
};
