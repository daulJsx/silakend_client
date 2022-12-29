import React, { useState } from "react";

// Axios
import axios from "axios";

// Fetch Requirements
import { useQuery } from "react-query";
import FetchVehicles from "../../consAPI/FetchVehicles";
import FetchUsers from "../../consAPI/FetchUsers";
import FetchUsageCat from "../../consAPI/FetchUsageCat";

// Navigating
import { Navigate } from "react-router-dom";

// Bootstrap components
import { Container, Row, Col } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";

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

export const CreateOrder = () => {
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

  const postNewOrder = async () => {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    if (
      orderData.vehicle_id ||
      orderData.driver_id ||
      orderData.user_id ||
      orderData.ucategory_id ||
      orderData.usage_description ||
      orderData.personel_count ||
      orderData.destination ||
      orderData.start_date ||
      orderData.end_date ||
      orderData.depart_date ||
      orderData.depart_time ||
      orderData.arrive_date ||
      orderData.arrive_time ||
      orderData.distance_count_out ||
      orderData.distance_count_in ||
      orderData.status ||
      orderData.status_description != ""
    ) {
      try {
        await axios
          .post(
            "https://silakend-server.xyz/api/vehicleusages",
            orderData,
            config
          )
          .then((response) => {
            if (response.status === 200) {
              navigate("/order-peminjaman");
              swal({
                title: "Berhasil!",
                text: "Order Ditambahkan",
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

  if (localStorage.getItem("token")) {
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
                    title={"Tambah Data Orderan Baru"}
                    parentLink={"/order-peminjaman"}
                  />
                ))}
              </Col>
            </Row>
            {/* NAVBAR */}
            <main className="min-vh-100 px-2">
              <Row>
                <Col>
                  <Card>
                    <Card.Title className="fs-4 color-primary p-4">
                      Silahkan Tambahkan Order Baru Disini
                    </Card.Title>
                    <Card.Body>
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
                          <option>-- Pilih Pengemudi --</option>
                          {usersData?.map((users) =>
                            users.role.map((userAsDriver) => {
                              return userAsDriver.name == "Driver" ? (
                                <option
                                  value={users.user_id}
                                  key={users.user_id}
                                >
                                  {users.name}
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
                          <option>-- Pilih Peminjam --</option>
                          {usersData?.map((users) =>
                            users.role.map((userAsSuper) => {
                              return userAsSuper.level != 1 ? (
                                <option
                                  value={users.user_id}
                                  key={users.user_id}
                                >
                                  {users.name}
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
                          <option>-- Pilih Kategori Peminjaman --</option>
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
                        <Form.Label>Waktu Berangkat</Form.Label>
                        <InputGroup className="mb-3">
                          <InputGroup.Text
                            style={{
                              border: "none",
                            }}
                            id="basic-addon2"
                          >
                            Tanggal
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
                                depart_date: e.target.value,
                              })
                            }
                          />
                          <InputGroup.Text
                            style={{
                              border: "none",
                            }}
                            id="basic-addon2"
                          >
                            Pukul
                          </InputGroup.Text>
                          <Form.Control
                            required
                            className="input form-custom"
                            style={{
                              backgroundColor: "#F5F7FC",
                              border: "none",
                              padding: "15px",
                            }}
                            type="time"
                            onChange={(e) =>
                              setOrderData({
                                ...orderData,
                                depart_time: e.target.value,
                              })
                            }
                          />
                        </InputGroup>
                      </Form.Group>

                      <Form.Group>
                        <Form.Label>Waktu Tiba</Form.Label>
                        <InputGroup className="mb-3">
                          <InputGroup.Text
                            style={{
                              border: "none",
                            }}
                            id="basic-addon2"
                          >
                            Tanggal
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
                                arrive_date: e.target.value,
                              })
                            }
                          />
                          <InputGroup.Text
                            style={{
                              border: "none",
                            }}
                            id="basic-addon2"
                          >
                            Pukul
                          </InputGroup.Text>
                          <Form.Control
                            required
                            className="input form-custom"
                            style={{
                              backgroundColor: "#F5F7FC",
                              border: "none",
                              padding: "15px",
                            }}
                            type="time"
                            onChange={(e) =>
                              setOrderData({
                                ...orderData,
                                arrive_time: e.target.value,
                              })
                            }
                          />
                        </InputGroup>
                      </Form.Group>

                      <Form.Group>
                        <Form.Label>Jarak</Form.Label>
                        <InputGroup className="mb-3">
                          <InputGroup.Text
                            style={{
                              border: "none",
                            }}
                            id="basic-addon2"
                          >
                            Jarak Pergi
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
                            Jarak Pulang
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
                            <option>-- Pilih Status --</option>
                            <option>APPROVED</option>
                            <option>READY</option>
                            <option>PROGRESS</option>
                            <option>DONE</option>
                            <option>REJECTED</option>
                            <option>WAITING</option>
                            <option>CANCEL</option>
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
                    </Card.Body>
                    <Card.Footer>
                      <Container>
                        <Button
                          className="btn-post"
                          onClick={postNewOrder}
                          type="submit"
                        >
                          Tambah
                        </Button>
                      </Container>
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
