import React, { useState } from "react";

// Cookies JS
import Cookies from "js-cookie";

import { SecuringPage } from "../../functions/Securing/SecuringPage";

// Fetch Requirements
import axios from "axios";

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

export const CreateVMDetail = () => {
  // Get access token
  const token = Cookies.get("token");

  const auth = useAuthUser();
  const navigate = useNavigate();

  const maintenanceId = localStorage.getItem("maintenanceId");
  // Body for store
  const [newVehicleMDetail, setNewVehicleMDetail] = useState({
    maintenance_id: maintenanceId,
    item_name: "",
    item_qty: "",
    item_unit: "",
    item_price: "",
    price_total: "",
  });

  // Store new vehicle data
  const postNewVehicleMD = async (e) => {
    e.preventDefault();

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    if (
      newVehicleMDetail.maintenance_id !== "" &&
      newVehicleMDetail.item_name !== "" &&
      newVehicleMDetail.item_qty !== "" &&
      newVehicleMDetail.item_unit !== "" &&
      newVehicleMDetail.item_price !== "" &&
      newVehicleMDetail.price_total !== ""
    ) {
      try {
        await axios
          .post(
            "https://silakend-server.xyz/api/vehiclemaintenancedetails",
            newVehicleMDetail,
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
        if (error.response.data.message) {
          swal("Ups!", "Something wnt wrong", "error");
        } else {
          swal("Ups!", error.response.data.msg, "error");
        }
      }
    } else {
      swal({
        title: "Peringatan",
        text: "Harap isi semua data!",
        icon: "warning",
        button: false,
        timer: 2000,
      });
    }
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
                      title={"Tambah Data Rincian Perbaikan Kendaraan"}
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
                                      Tambah Rincian Perbaikan
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
                              <Form onSubmit={postNewVehicleMD}>
                                <Form.Group className="mb-3">
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

                                <Form.Group className="mb-3">
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

                                <Form.Group className="mb-3">
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

                                <Form.Group className="mb-3">
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
                                <Form.Group>
                                  <Button
                                    className="btn-post"
                                    onClick={postNewVehicleMD}
                                    type="submit"
                                  >
                                    Tambah
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
