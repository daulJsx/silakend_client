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

  // if update necessary
  const [currentItemName] = [VMDToMap].map((itemName) => itemName.item_name);
  const [currentItemQty] = [VMDToMap].map((itemQty) => itemQty.item_qty);
  const [currentItemUnit] = [VMDToMap].map((itemUnit) => itemUnit.item_unit);
  const [currentItemPrice] = [VMDToMap].map(
    (itemPrice) => itemPrice.item_price
  );
  const [currentPriceTotal] = [VMDToMap].map((pt) => pt.price_total);

  // handle value changes
  const [newItemName, setNewItemName] = useState("");
  const [newItemQty, setNewItemQty] = useState("");
  const [newItemUnit, setNewItemUnit] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");
  const [newPriceTotal, setNewPriceTotal] = useState("");

  // Body for store
  const currentVehicleMDetail = {
    maintenance_id: localStorage.getItem("maintenanceId"),
    item_name: newItemName === "" ? currentItemName : newItemName,
    item_qty: newItemQty === "" ? currentItemQty : newItemQty,
    item_unit: newItemUnit === "" ? currentItemUnit : newItemUnit,
    item_price: newItemPrice === "" ? currentItemPrice : newItemPrice,
    price_total: newPriceTotal === "" ? currentPriceTotal : newPriceTotal,
  };

  // Store new vehicle data
  const updateVehicleMD = async () => {
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
        await axios
          .put(
            `https://silakend-server.xyz/api/vehiclemaintenancedetails/${detailId}`,
            currentVehicleMDetail,
            config
          )
          .then((response) => {
            if (response.status === 200) {
              navigate("/perbaikan-kendaraan/rincian-perbaikan-kendaraan/");
              swal({
                title: "Berhasil!",
                text: response.data.msg,
                icon: "success",
                button: "Tutup",
              });
            }
          })
          .catch((error) => {
            if (error.response.data.message) {
              swal("Ups!", error.response.data.message, "error");
            } else {
              swal("Ups!", error.response.data.msg, "error");
            }
          });
      } else {
        swal("Data perbaikan aman!");
      }
    });
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
                      title={"Edit Data Rincian Perbaikan Kendaraan"}
                      parentLink={
                        "/perbaikan-kendaraan/rincian-perbaikan-kendaraan"
                      }
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
                                      setNewItemName(e.target.value)
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
                                      setNewItemQty(e.target.value)
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
                                      setNewItemUnit(e.target.value)
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
                                        setNewItemPrice(e.target.value)
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
                                        setNewPriceTotal(e.target.value)
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
