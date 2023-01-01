import React, { useState } from "react";

// Fetch Requirements
import axios from "axios";
import { useQuery } from "react-query";
import FetchVM from "../../consAPI/FetchVM";

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

export const CreateVMDetail = () => {
  const auth = useAuthUser();
  const navigate = useNavigate();

  // Body for store
  const [newVehicleMDetail, setNewVehicleMDetail] = useState({
    maintenance_id: "",
    item_name: "",
    item_qty: "",
    item_unit: "",
    item_price: "",
    price_total: "",
  });

  function handleError(error) {
    swal("Ups!", error.response.data.msg, "error");
  }

  // Store new vehicle data
  const postNewVehicleMD = async () => {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    if (
      newVehicleMDetail.maintenance_id ||
      newVehicleMDetail.item_name ||
      newVehicleMDetail.item_qty ||
      newVehicleMDetail.item_unit ||
      newVehicleMDetail.item_price ||
      newVehicleMDetail.price_total != ""
    ) {
      await axios
        .post(
          "https://silakend-server.xyz/api/vehiclemaintenancedetails",
          newVehicleMDetail,
          config
        )
        .then((response) => {
          if (response.status === 200) {
            navigate("/rincian-perbaikan");
            swal({
              title: "Berhasil!",
              text: "Data Rincian Perbaikan Kendaraan Telah Dibuat",
              icon: "success",
              button: "Tutup",
            });
          }
        })
        .catch((error) => {
          handleError(error);
        });
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
  const { data: vehicleMaintenances } = useQuery(
    "vehicleMaintenances",
    FetchVM
  );

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
                            setNewVehicleMDetail({
                              ...newVehicleMDetail,
                              maintenance_id: e.target.value,
                            })
                          }
                        >
                          <option>-- Pilih Kategori --</option>
                          {vehicleMaintenances?.map((vmd) => (
                            <option
                              key={vmd.maintenance_id}
                              value={vmd.maintenance_id}
                            >
                              {vmd.category}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>

                      <Form.Group>
                        <Form.Label>nama spare part</Form.Label>

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
                            setNewVehicleMDetail({
                              ...newVehicleMDetail,
                              item_name: e.target.value,
                            })
                          }
                        />
                      </Form.Group>

                      <Form.Group>
                        <Form.Label>jumlah spare part</Form.Label>

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
                            setNewVehicleMDetail({
                              ...newVehicleMDetail,
                              item_qty: e.target.value,
                            })
                          }
                        />
                      </Form.Group>

                      <Form.Group>
                        <Form.Label>satuan spare part</Form.Label>
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
                            setNewVehicleMDetail({
                              ...newVehicleMDetail,
                              item_unit: e.target.value,
                            })
                          }
                        />
                      </Form.Group>

                      <Form.Group>
                        <Form.Label>harga spare part</Form.Label>
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
                              setNewVehicleMDetail({
                                ...newVehicleMDetail,
                                item_price: e.target.value,
                              })
                            }
                          />
                        </InputGroup>
                      </Form.Group>

                      <Form.Group>
                        <Form.Label>harga total</Form.Label>
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
                              setNewVehicleMDetail({
                                ...newVehicleMDetail,
                                price_total: e.target.value,
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
                        onClick={postNewVehicleMD}
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
