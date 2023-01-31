import React, { useState } from "react";

// Cookies JS
import Cookies from "js-cookie";

// Axios
import axios from "axios";

// Fetch Requirements
import { useQuery } from "react-query";
import FetchVehicles from "../../consAPI/FetchVehicles";
import FetchUsers from "../../consAPI/FetchUsers";
import FetchUsageCat from "../../consAPI/FetchUsageCat";

// Navigating
import { Navigate, NavLink } from "react-router-dom";

// Bootstrap components
import { Container, Row, Col } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import Breadcrumb from "react-bootstrap/Breadcrumb";

// Components
import { Aside } from "../../components/aside/Aside";
import { NavTop } from "../../components/navtop/NavTop";
import { Footer } from "../../components/footer/Footer";

// Redirecting
import { useNavigate } from "react-router-dom";

// React Notification
import swal from "sweetalert";

// icons
import { FaArrowLeft } from "react-icons/fa";
import { HiOutlineClipboardCopy } from "react-icons/hi";
import { FiChevronRight } from "react-icons/fi";

// For checking user have done in authentication
import { useAuthUser } from "react-auth-kit";

import { SecuringPage } from "../../functions/Securing/SecuringPage";

export const CreateOrder = () => {
  // Get access token
  const token = Cookies.get("token");

  // Navigating
  const navigate = useNavigate();

  // Fetching requirement data
  const { data: vehiclesData } = useQuery("vehicles", FetchVehicles);
  const { data: usageCatData } = useQuery("usageCat", FetchUsageCat);
  const { data: usersData } = useQuery(["users"], FetchUsers);

  // Body for store
  const [orderData, setOrderData] = useState({
    vehicle_id: "",
    driver_id: "",
    user_id: "",
    ucategory_id: "",
    usage_description: "",
    personel_count: "",
    destination: "",
    start_date: "",
    end_date: "",
    depart_date: "",
    depart_time: "",
    arrive_date: "",
    arrive_time: "",
    distance_count_out: "",
    distance_count_in: "",
    status: "",
    status_description: "",
  });

  const postNewOrder = async (e) => {
    e.preventDefault();

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    if (
      orderData.vehicle_id !== "" &&
      orderData.driver_id !== "" &&
      orderData.user_id !== "" &&
      orderData.ucategory_id !== "" &&
      orderData.usage_description !== "" &&
      orderData.personel_count !== "" &&
      orderData.destination !== "" &&
      orderData.start_date !== "" &&
      orderData.end_date !== "" &&
      orderData.status !== ""
    ) {
      try {
        await axios
          .post(
            "http://silakend-server-realtime.test/api/vehicleusages",
            orderData,
            config
          )
          .then((response) => {
            if (response.status === 200) {
              const { msg } = response.data;
              navigate("/pengajuan-peminjaman");
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
      swal({
        title: "Peringatan",
        text: "Harap isi semua data!",
        icon: "warning",
        button: false,
        timer: 2000,
      });
    }
  };

  const auth = useAuthUser();

  return token ? (
    auth().user_level === 1 ? (
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
                    title={"Tambah Pengajuan Peminjaman Kendaraan"}
                    parentLink={"/pengajuan-peminjaman"}
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
                              Pengajuan Peminjaman Kendaraan Dinas
                            </h3>
                            <Breadcrumb className="breadcrumb__item mt-3">
                              <Breadcrumb.Item
                                className="breadcrumb__item"
                                href="#"
                              >
                                <div className="d-flex justify-content-center align-items-center gap-2">
                                  <NavLink
                                    to={"/pengajuan-peminjaman"}
                                    className="d-flex justify-content-center align-items-center text-muted gap-2"
                                  >
                                    <HiOutlineClipboardCopy className="fs-5" />
                                    Data
                                  </NavLink>

                                  <FiChevronRight className="fs-6 breadcrumb__divider" />
                                  <span className="color-primary">
                                    Tambah Pengajuan
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
                        className="p-5"
                        style={{ background: "#fff", borderRadius: "10px" }}
                      >
                        <Row>
                          <Col>
                            <Form onSubmit={postNewOrder}>
                              <Form.Group className="mb-3">
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
                                    setOrderData({
                                      ...orderData,
                                      vehicle_id: e.target.value,
                                    })
                                  }
                                >
                                  <option value="">
                                    -- Pilih Kendaraan --
                                  </option>
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

                              <Form.Group className="mb-3">
                                <Form.Label>Pengemudi</Form.Label>
                                <Form.Select
                                  required
                                  style={{
                                    backgroundColor: "#F5F7FC",
                                    border: "none",
                                    padding: "17px",
                                  }}
                                  aria-label="Default select example"
                                  onChange={(e) =>
                                    setOrderData({
                                      ...orderData,
                                      driver_id: e.target.value,
                                    })
                                  }
                                >
                                  <option value="">
                                    -- Pilih Pengemudi --
                                  </option>
                                  {usersData?.map((users) =>
                                    users.role.map((userAsDriver) => {
                                      return userAsDriver.level === 4 ? (
                                        <option
                                          value={users.user_id}
                                          key={users.user_id}
                                        >
                                          {users.nip} - {users.name}
                                        </option>
                                      ) : null;
                                    })
                                  )}
                                </Form.Select>
                              </Form.Group>

                              <Form.Group className="mb-3">
                                <Form.Label>Peminjam</Form.Label>
                                <Form.Select
                                  required
                                  style={{
                                    backgroundColor: "#F5F7FC",
                                    border: "none",
                                    padding: "17px",
                                  }}
                                  aria-label="Default select example"
                                  onChange={(e) =>
                                    setOrderData({
                                      ...orderData,
                                      user_id: e.target.value,
                                    })
                                  }
                                >
                                  <option value="">-- Pilih Peminjam --</option>
                                  {usersData?.map((users) =>
                                    users.role.map((userAsSuper) => {
                                      return userAsSuper.level !== 1 ? (
                                        <option
                                          value={users.user_id}
                                          key={users.user_id}
                                        >
                                          {users.nip} - {users.name}
                                        </option>
                                      ) : null;
                                    })
                                  )}
                                </Form.Select>
                              </Form.Group>

                              <Form.Group className="mb-3">
                                <Form.Label>Kategori Peminjaman</Form.Label>
                                <Form.Select
                                  required
                                  style={{
                                    backgroundColor: "#F5F7FC",
                                    border: "none",
                                    padding: "17px",
                                  }}
                                  aria-label="Default select example"
                                  onChange={(e) =>
                                    setOrderData({
                                      ...orderData,
                                      ucategory_id: e.target.value,
                                    })
                                  }
                                >
                                  <option value="">
                                    -- Pilih Kategori Peminjaman --
                                  </option>
                                  {usageCatData?.map((usageCat) => (
                                    <option
                                      value={usageCat.ucategory_id}
                                      key={usageCat.ucategory_id}
                                    >
                                      {usageCat.name}
                                    </option>
                                  ))}
                                </Form.Select>
                              </Form.Group>

                              <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlTextarea1"
                              >
                                <Form.Label>Deskripsi Peminjaman</Form.Label>
                                <Form.Control
                                  as="textarea"
                                  rows={3}
                                  style={{
                                    backgroundColor: "#F5F7FC",
                                    border: "none",
                                  }}
                                  onChange={(e) =>
                                    setOrderData({
                                      ...orderData,
                                      usage_description: e.target.value,
                                    })
                                  }
                                />
                              </Form.Group>

                              <Form.Group>
                                <Form.Label>Jumlah Personil</Form.Label>
                                <InputGroup className="mb-3">
                                  <Form.Control
                                    style={{
                                      backgroundColor: "#F5F7FC",
                                      border: "none",
                                      padding: "15px",
                                    }}
                                    type="number"
                                    aria-describedby="basic-addon2"
                                    onChange={(e) =>
                                      setOrderData({
                                        ...orderData,
                                        personel_count: e.target.value,
                                      })
                                    }
                                  />
                                  <InputGroup.Text
                                    style={{
                                      border: "none",
                                    }}
                                    id="basic-addon2"
                                  >
                                    Orang
                                  </InputGroup.Text>
                                </InputGroup>
                              </Form.Group>

                              <Form.Group className="mb-3">
                                <Form.Label>Destinasi</Form.Label>
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
                                    setOrderData({
                                      ...orderData,
                                      destination: e.target.value,
                                    })
                                  }
                                />
                              </Form.Group>

                              <Form.Group>
                                <Form.Label>Tanggal Pinjam</Form.Label>
                                <InputGroup className="mb-3">
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
                                      setOrderData({
                                        ...orderData,
                                        start_date: e.target.value,
                                      })
                                    }
                                  />
                                  <InputGroup.Text
                                    style={{
                                      border: "none",
                                    }}
                                    id="basic-addon2"
                                  >
                                    s/d
                                  </InputGroup.Text>
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
                                      setOrderData({
                                        ...orderData,
                                        end_date: e.target.value,
                                      })
                                    }
                                  />
                                </InputGroup>
                              </Form.Group>

                              <Form.Group>
                                <Form.Label>
                                  jumlah kilometer (odometer)
                                </Form.Label>
                                <InputGroup className="mb-3">
                                  <InputGroup.Text
                                    style={{
                                      border: "none",
                                    }}
                                    id="basic-addon2"
                                  >
                                    Pergi
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
                                      setOrderData({
                                        ...orderData,
                                        distance_count_out: e.target.value,
                                      })
                                    }
                                  />
                                  <InputGroup.Text
                                    style={{
                                      border: "none",
                                    }}
                                    id="basic-addon2"
                                  >
                                    Pulang
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
                                      setOrderData({
                                        ...orderData,
                                        distance_count_in: e.target.value,
                                      })
                                    }
                                  />
                                </InputGroup>
                              </Form.Group>
                              <Form.Group>
                                <Form.Label>Status</Form.Label>
                                <InputGroup className="mb-3">
                                  <Form.Select
                                    required
                                    style={{
                                      backgroundColor: "#F5F7FC",
                                      border: "none",
                                      padding: "17px",
                                    }}
                                    aria-label="Default select example"
                                    onChange={(e) =>
                                      setOrderData({
                                        ...orderData,
                                        status: e.target.value,
                                      })
                                    }
                                  >
                                    <option value="">--Status--</option>
                                    <option value="APPROVED">Diterima</option>
                                    <option value="READY">
                                      Siap Berangkat
                                    </option>
                                    <option value="PROGRESS">
                                      Berlangsung
                                    </option>
                                    <option value="DONE">Selesai</option>
                                    <option value="REJECTED">Ditolak</option>
                                    <option value="WAITING">Diajukan</option>
                                    <option value="CANCEL">Batal</option>
                                  </Form.Select>
                                  <InputGroup.Text
                                    style={{
                                      border: "none",
                                    }}
                                    id="basic-addon2"
                                  >
                                    Keterangan
                                  </InputGroup.Text>
                                  <Form.Control
                                    required
                                    as="textarea"
                                    rows={3}
                                    style={{
                                      backgroundColor: "#F5F7FC",
                                      border: "none",
                                    }}
                                    onChange={(e) =>
                                      setOrderData({
                                        ...orderData,
                                        status_description: e.target.value,
                                      })
                                    }
                                  />
                                </InputGroup>
                              </Form.Group>
                              <Form.Group>
                                <Button
                                  className="btn-post"
                                  onClick={postNewOrder}
                                  type="submit"
                                >
                                  Ajukan
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
      SecuringPage()
    )
  ) : (
    <Navigate to="/silakend-login" />
  );
};
