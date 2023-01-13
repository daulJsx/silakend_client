import React, { useState } from "react";

// Cookies JS
import Cookies from "js-cookie";

// Axios
import axios from "axios";

// Fetch Requirements
import { useQuery } from "react-query";
import FetchUsageCat from "../../consAPI/FetchUsageCat";

// Navigating
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

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

// React Notification
import swal from "sweetalert";

// icons
import { FaArrowLeft } from "react-icons/fa";

// For checking user have done in authentication
import { useAuthUser } from "react-auth-kit";

export const UserEditVU = () => {
  // Get access token
  const token = Cookies.get("token");

  const auth = useAuthUser();
  const navigate = useNavigate();

  // Initialize newest usage id
  const usageId = localStorage.getItem("usage_id");

  // Get the JSON object from local storage
  const orderString = localStorage.getItem("orderToMap");
  // Parse the JSON string into a JavaScript object
  const orderToMap = JSON.parse(orderString);

  // Fetching requirement data
  const { data: usageCatData } = useQuery("usageCat", FetchUsageCat);

  // dynamically variable value for update

  const [newCategory, setNewCategory] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newPersonelCount, setNewPersonelCount] = useState("");
  const [newDestination, setNewDestination] = useState("");
  const [newStartDate, setNewStartDate] = useState("");
  const [newEndDate, setNewEndDate] = useState("");

  // if update necessary
  const [currentUCatId] = [orderToMap].map((uCatId) => uCatId.ucategory_id);
  const [currentUDesc] = [orderToMap].map((UDesc) => UDesc.usage_description);
  const [currentPersonelCount] = [orderToMap].map(
    (pCount) => pCount.personel_count
  );
  const [currentDestination] = [orderToMap].map((dest) => dest.destination);
  const [currentStartDate] = [orderToMap].map((sd) => sd.start_date);
  const [currentEndDate] = [orderToMap].map((ed) => ed.end_date);

  const body = {
    user_id: auth().user_id,
    ucategory_id: newCategory === "" ? currentUCatId : newCategory,
    usage_description: newDesc === "" ? currentUDesc : newDesc,
    personel_count:
      newPersonelCount === "" ? currentPersonelCount : newPersonelCount,
    destination: newDestination === "" ? currentDestination : newDestination,
    start_date: newStartDate === "" ? currentStartDate : newStartDate,
    end_date: newEndDate === "" ? currentEndDate : newEndDate,
    status: "WAITING",
  };

  const handleUpdateOrder = async (e) => {
    console.log(body);
    e.preventDefault();
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    swal({
      title: "Yakin?",
      text: "Pastikan kembali perubahan data pengajuan",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          await axios
            .put(
              `https://silakend-server.xyz/api/vehicleusages/${usageId}`,
              body,
              config
            )
            .then((response) => {
              console.log(response.data);
              if (response.status === 200) {
                navigate("/user/data-pengajuan-peminjaman");
                swal({
                  title: "Berhasil!",
                  text: response.data.msg,
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
        swal("Data pengajuan aman!");
      }
    });
  };

  return token ? (
    usageId ? (
      <Container fluid>
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
                    bc={<FaArrowLeft />}
                    title={"Edit Pengajuan Peminjaman Kendaraan"}
                    parentLink={"/user/data-pengajuan-peminjaman"}
                  />
                ))}
              </Col>
            </Row>
            {/* NAVBAR */}
            <main className="min-vh-100 px-2 mt-4">
              <Row>
                <Col>
                  <Card>
                    <Form onSubmit={handleUpdateOrder}>
                      <Card.Title className="fs-4 p-4 mb-4 fw-semibold color-primary">
                        Silahkan Edit Data Peminjaman Kendaraan Dinas Disini
                      </Card.Title>
                      <Card.Body>
                        {orderToMap
                          ? [orderToMap].map((orderToUpdate) => (
                              <>
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
                                      setNewCategory(e.target.value)
                                    }
                                  >
                                    <option value={orderToUpdate.ucategory_id}>
                                      {orderToUpdate.category.name}
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
                                    placeholder={
                                      orderToUpdate.usage_description
                                    }
                                    as="textarea"
                                    rows={3}
                                    style={{
                                      backgroundColor: "#F5F7FC",
                                      border: "none",
                                    }}
                                    onChange={(e) => setNewDesc(e.target.value)}
                                  />
                                </Form.Group>

                                <Form.Group>
                                  <Form.Label>Jumlah Personil</Form.Label>
                                  <InputGroup className="mb-3">
                                    <Form.Control
                                      onChange={(e) =>
                                        setNewPersonelCount(e.target.value)
                                      }
                                      placeholder={orderToUpdate.personel_count}
                                      style={{
                                        backgroundColor: "#F5F7FC",
                                        border: "none",
                                        padding: "15px",
                                      }}
                                      type="number"
                                      aria-describedby="basic-addon2"
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
                                    onChange={(e) =>
                                      setNewDestination(e.target.value)
                                    }
                                    placeholder={orderToUpdate.destination}
                                    required
                                    className="input form-custom"
                                    style={{
                                      backgroundColor: "#F5F7FC",
                                      border: "none",
                                      padding: "15px",
                                    }}
                                    type="text"
                                  />
                                </Form.Group>

                                <Form.Group className="py-1">
                                  <Form.Label>
                                    Waktu pinjam saat ini :{" "}
                                    <span className="fw-bold text-dark">
                                      {orderToUpdate.start_date} s/d{" "}
                                      {orderToUpdate.end_date}
                                    </span>
                                  </Form.Label>
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
                                        setNewStartDate(e.target.value)
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
                                        setNewEndDate(e.target.value)
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
                          onClick={handleUpdateOrder}
                          type="submit"
                        >
                          Simpan
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
      <Navigate to="/user/data-pengajuan-peminjaman" />
    )
  ) : (
    <Navigate to="/silakend-login" />
  );
};
