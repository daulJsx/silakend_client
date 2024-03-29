import React, { useState } from "react";

// Cookies JS
import Cookies from "js-cookie";

// Functions
import { SecuringPage } from "../../functions/Securing/SecuringPage";

// Fetch Requirements
import axios from "axios";
import { useQuery } from "react-query";
import FetchVM from "../../consAPI/FetchVM";

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
import { FiChevronRight } from "react-icons/fi";
import { FiList } from "react-icons/fi";

// React Notification
import swal from "sweetalert";

// For checking user have done in authentication
import { useAuthUser } from "react-auth-kit";

export const UpdateVMDetail = () => {
  // Get access token
  const token = Cookies.get("token");

  const auth = useAuthUser();
  const navigate = useNavigate();

  // Initialize newest maintenance id
  const detailId = localStorage.getItem("detailId");

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
  const updateVehicleMD = async (e) => {
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
              `https://708c-180-244-139-240.ap.ngrok.io/api/vehiclemaintenancedetails/${detailId}`,
              currentVehicleMDetail,
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
        swal("Data rincian aman!");
      }
    });
  };

  // Fetching requirement data
  const { data: vehicleMaintenances } = useQuery(
    "vehicleMaintenances",
    FetchVM
  );

  return token ? (
    auth().user_level === 1 || auth().user_level === 2 ? (
      detailId ? (
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

              <main className="px-2 min-vh-100 mt-4">
                <Row>
                  <Col>
                    <Card className="shadow rounded bg__primary">
                      <Card.Header>
                        <Container>
                          <Row className="gap-3 mt-4">
                            <Col>
                              <h3 className="main__title">
                                Data Rincian Perbaikan
                              </h3>
                              <Breadcrumb className="breadcrumb__item mt-3">
                                <Breadcrumb.Item
                                  className="breadcrumb__item"
                                  href="#"
                                >
                                  <div className="d-flex justify-content-center align-items-center gap-2">
                                    <NavLink
                                      to={
                                        "/perbaikan-kendaraan/rincian-perbaikan-kendaraan"
                                      }
                                      className="d-flex justify-content-center align-items-center text-muted gap-2"
                                    >
                                      <FiList className="fs-5" />
                                      Data
                                    </NavLink>

                                    <FiChevronRight className="fs-6 breadcrumb__divider" />
                                    <span className="color-primary">
                                      Edit Rincian Perbaikan
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
                              <Form onSubmit={updateVehicleMD}>
                                {VMDToMap != ""
                                  ? [VMDToMap].map((currentVMD) => (
                                      <>
                                        <Form.Group className="mb-3">
                                          <Form.Label>
                                            nama spare part
                                          </Form.Label>

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

                                        <Form.Group className="mb-3">
                                          <Form.Label>
                                            jumlah spare part
                                          </Form.Label>

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

                                        <Form.Group className="mb-3">
                                          <Form.Label>
                                            satuan spare part
                                          </Form.Label>
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

                                        <Form.Group className="mb-3">
                                          <Form.Label>
                                            harga spare part
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
                                              placeholder={
                                                currentVMD.item_price
                                              }
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

                                        <Form.Group className="mb-4">
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
                                              placeholder={
                                                currentVMD.price_total
                                              }
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
                                <Form.Group>
                                  <Button
                                    className="btn-post"
                                    type="submit"
                                    onClick={updateVehicleMD}
                                  >
                                    Simpan
                                  </Button>
                                </Form.Group>
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
