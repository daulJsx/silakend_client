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

export const UpdateVMDetail = () => {
  const auth = useAuthUser();
  const navigate = useNavigate();

  // Initialize newest maintenance id
  const [detailId, setDetailId] = useState(localStorage.getItem("detailId"));

  // Get the JSON object from local storage
  const VMDString = localStorage.getItem("VMDToMap");
  // Parse the JSON string into a JavaScript object
  const VMDToMap = JSON.parse(VMDString);

  // Body for store
  const [currentVehicleMDetail, setCurrentVehicleMDetail] = useState({
    maintenance_id: "",
    item_name: "",
    item_qty: "",
    item_unit: "",
    item_price: "",
    price_total: "",
  });

  function handleError(error) {
    if (error.response.data.message) {
      swal("Ups!", error.response.data.message, "error");
    } else {
      swal("Ups!", error.response.data.msg, "error");
    }
  }

  // Store new vehicle data
  const updateVehicleMD = async () => {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    if (
      currentVehicleMDetail.maintenance_id ||
      currentVehicleMDetail.item_name ||
      currentVehicleMDetail.item_qty ||
      currentVehicleMDetail.item_unit ||
      currentVehicleMDetail.item_price ||
      currentVehicleMDetail.price_total != ""
    ) {
      await axios
        .put(
          `https://silakend-server.xyz/api/vehiclemaintenancedetails/${detailId}`,
          currentVehicleMDetail,
          config
        )
        .then((response) => {
          if (response.status === 200) {
            navigate("/rincian-perbaikan");
            swal({
              title: "Berhasil!",
              text: response.data.msg,
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
    if (detailId != "") {
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
                      parentLink={"/rincian-perbaikan"}
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
                        Silahkan Edit Rincian Perbaikan Kendaraan Disini
                      </Card.Title>
                      <Card.Body className="d-flex flex-column gap-3">
                        {VMDToMap != ""
                          ? [VMDToMap].map((currentVMD) => (
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
                                      setCurrentVehicleMDetail({
                                        ...currentVehicleMDetail,
                                        maintenance_id: e.target.value,
                                      })
                                    }
                                  >
                                    <option>{currentVMD.maintenance_id}</option>
                                    {vehicleMaintenances?.map((vm) => {
                                      return vm.maintenance_id !=
                                        currentVMD.maintenance_id ? (
                                        <option
                                          key={vm.maintenance_id}
                                          value={vm.maintenance_id}
                                        >
                                          {vm.category}
                                        </option>
                                      ) : null;
                                    })}
                                  </Form.Select>
                                </Form.Group>

                                <Form.Group>
                                  <Form.Label>nama spare part</Form.Label>

                                  <Form.Control
                                    required
                                    placeholder={currentVMD.item_name}
                                    className="input form-custom"
                                    style={{
                                      backgroundColor: "#F5F7FC",
                                      border: "none",
                                      padding: "15px",
                                    }}
                                    type="text"
                                    onChange={(e) =>
                                      setCurrentVehicleMDetail({
                                        ...currentVehicleMDetail,
                                        item_name: e.target.value,
                                      })
                                    }
                                  />
                                </Form.Group>

                                <Form.Group>
                                  <Form.Label>jumlah spare part</Form.Label>

                                  <Form.Control
                                    required
                                    placeholder={currentVMD.item_qty}
                                    className="input form-custom"
                                    style={{
                                      backgroundColor: "#F5F7FC",
                                      border: "none",
                                      padding: "15px",
                                    }}
                                    type="number"
                                    onChange={(e) =>
                                      setCurrentVehicleMDetail({
                                        ...currentVehicleMDetail,
                                        item_qty: e.target.value,
                                      })
                                    }
                                  />
                                </Form.Group>

                                <Form.Group>
                                  <Form.Label>satuan spare part</Form.Label>
                                  <Form.Control
                                    required
                                    placeholder={currentVMD.item_unit}
                                    className="input form-custom"
                                    style={{
                                      backgroundColor: "#F5F7FC",
                                      border: "none",
                                      padding: "15px",
                                    }}
                                    type="text"
                                    onChange={(e) =>
                                      setCurrentVehicleMDetail({
                                        ...currentVehicleMDetail,
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
                                      placeholder={currentVMD.item_price}
                                      className="input form-custom"
                                      style={{
                                        backgroundColor: "#F5F7FC",
                                        border: "none",
                                        padding: "15px",
                                      }}
                                      type="number"
                                      onChange={(e) =>
                                        setCurrentVehicleMDetail({
                                          ...currentVehicleMDetail,
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
                                      placeholder={currentVMD.price_total}
                                      className="input form-custom"
                                      style={{
                                        backgroundColor: "#F5F7FC",
                                        border: "none",
                                        padding: "15px",
                                      }}
                                      type="number"
                                      onChange={(e) =>
                                        setCurrentVehicleMDetail({
                                          ...currentVehicleMDetail,
                                          price_total: e.target.value,
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
                          onClick={updateVehicleMD}
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
      return <Navigate to="/rincian-perbaikan" />;
    }
  } else {
    return <Navigate to="/silakend-login" />;
  }
};
