import React, { useState } from "react";

// Cookies JS
import Cookies from "js-cookie";

// Axios
import axios from "axios";

// Fetch Requirements
import { useQuery } from "react-query";
import FetchUsageCat from "../../consAPI/FetchUsageCat";

// Navigating
import { Navigate } from "react-router-dom";

// Functions
import { SecuringPage } from "../../functions/Securing/SecuringPage";

// Bootstrap components
import { Container, Row, Col } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";

// Components
import { AsideUser } from "../../components/aside/AsideUser";
import { NavTop } from "../../components/navtop/NavTop";
import { Footer } from "../../components/footer/Footer";

// Redirecting
import { useNavigate } from "react-router-dom";

// For checking user have done in authentication
import { useAuthUser } from "react-auth-kit";

// React Notification
import swal from "sweetalert";
import toast, { Toaster } from "react-hot-toast";

// icons
import { FiSend } from "react-icons/fi";

export const UserCreateVU = () => {
  // Get access token
  const token = Cookies.get("token");

  const auth = useAuthUser();

  // Navigating
  const navigate = useNavigate();

  // Fetching requirement data
  const { data: usageCatData } = useQuery("usageCat", FetchUsageCat);

  // Body for store
  const [orderData, setOrderData] = useState({
    user_id: auth().user_id,
    ucategory_id: "",
    usage_description: "",
    personel_count: "",
    destination: "",
    start_date: "",
    end_date: "",
  });

  const postNewOrder = async (e) => {
    e.preventDefault();

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    if (
      orderData.ucategory_id !== "" &&
      orderData.usage_description !== "" &&
      orderData.personel_count !== "" &&
      orderData.destination !== "" &&
      orderData.start_date !== "" &&
      orderData.end_date !== ""
    ) {
      if (orderData.personel_count <= 0) {
        swal({
          title: "Peringatan",
          text: "Harap isi jumlah personil dengan benar!",
          icon: "warning",
          button: "Tutup",
        });
      } else {
        try {
          await axios
            .post(
              "https://silakend-server.xyz/api/vehicleusages",
              orderData,
              config
            )
            .then((response) => {
              if (response.status === 200) {
                const { msg } = response.data;
                navigate("/user/data-pengajuan-peminjaman");

                swal({
                  title: "Berhasil!",
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

  return token ? (
    auth().user_level === 5 ? (
      <Container fluid>
        <Toaster position="bottom-right" reverseOrder={false} />
        <Row>
          {/* SIDEBAR */}
          <Col
            xs="auto"
            className="sidebar d-none d-lg-block d-flex min-vh-100 px-4"
          >
            <AsideUser />
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
                    bc={<FiSend />}
                  />
                ))}
              </Col>
            </Row>
            {/* NAVBAR */}
            <main className="min-vh-100 px-2 mt-4">
              <Row>
                <Col>
                  <Card>
                    <Form onSubmit={postNewOrder}>
                      <Card.Title className="fs-4 p-4 mb-4 fw-semibold color-primary">
                        Silahkan Ajukan Peminjaman Kendaraan Dinas Disini
                      </Card.Title>
                      <Card.Body>
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
                      </Card.Body>
                      <Card.Footer>
                        <Button
                          className="btn-post"
                          onClick={postNewOrder}
                          type="submit"
                        >
                          <div className="d-flex gap-2">
                            Ajukan
                            <FiSend className="fs-5" />
                          </div>
                        </Button>
                      </Card.Footer>
                    </Form>
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
