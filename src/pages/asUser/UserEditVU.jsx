import React, { useState } from "react";

// Cookies JS
import Cookies from "js-cookie";

// Axios
import axios from "axios";

// Fetch Requirements
import { useQuery } from "react-query";
import FetchUsageCat from "../../consAPI/FetchUsageCat";

// Functions
import { SecuringPage } from "../../functions/Securing/SecuringPage";
import { CancelVU } from "../../functions/Update/CancelVU";

// Navigating
import { useNavigate, Navigate, NavLink } from "react-router-dom";

// Bootstrap components
import { Container, Row, Col } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import Breadcrumb from "react-bootstrap/Breadcrumb";

// Components
import { AsideUser } from "../../components/aside/AsideUser";
import { NavTop } from "../../components/navtop/NavTop";
import { Footer } from "../../components/footer/Footer";

// React Notification
import swal from "sweetalert";

// icons
import { HiOutlineClipboardList } from "react-icons/hi";
import { FiChevronRight } from "react-icons/fi";
import { FaArrowLeft } from "react-icons/fa";
import { FiXCircle } from "react-icons/fi";
import { FiCheckCircle } from "react-icons/fi";

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
    usage_id: usageId,
    user_id: auth().user_id,
    ucategory_id: newCategory === "" ? currentUCatId : newCategory,
    usage_description: newDesc === "" ? currentUDesc : newDesc,
    personel_count:
      newPersonelCount === "" ? currentPersonelCount : newPersonelCount,
    destination: newDestination === "" ? currentDestination : newDestination,
    start_date: newStartDate === "" ? currentStartDate : newStartDate,
    end_date: newEndDate === "" ? currentEndDate : newEndDate,
    status: "",
    status_description: "",
  };

  // Variable to assign access token
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const handleUpdateOrder = async (e) => {
    e.preventDefault();

    swal({
      title: "Yakin?",
      text: "Pastikan kembali perubahan data pengajuan",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        body.status = "WAITING";

        try {
          await axios
            .put(
              `https://708c-180-244-139-240.ap.ngrok.io/api/vehicleusages/${usageId}`,
              body,
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
                  timer: 3000,
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
            swal.error("Something went wrong");
          }
        }
      } else {
        swal("Aksi dibatalkan");
      }
    });
  };

  return token ? (
    auth().user_level === 5 ? (
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
                      parentLink={-1}
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
                                Data Pengajuan Anda
                              </h3>

                              <Breadcrumb className="breadcrumb__item mt-3">
                                <Breadcrumb.Item className="breadcrumb__item">
                                  <div className="d-flex text-muted justify-content-center align-items-center gap-2 breadcrumb__text">
                                    <NavLink
                                      to={-1}
                                      className="d-flex justify-content-center align-items-center text-muted gap-2"
                                    >
                                      <HiOutlineClipboardList className="fs-5" />
                                      Data
                                    </NavLink>

                                    <FiChevronRight className="fs-6 breadcrumb__divider" />
                                    <span className="color-primary">
                                      Edit Pengajuan
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
                          <Form onSubmit={handleUpdateOrder}>
                            {orderToMap
                              ? [orderToMap].map((orderToUpdate) => (
                                  <>
                                    <Form.Group className="mb-3">
                                      <Form.Label>
                                        Kategori Peminjaman
                                      </Form.Label>
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
                                        <option
                                          value={orderToUpdate.ucategory_id}
                                        >
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
                                      <Form.Label>
                                        Deskripsi Peminjaman
                                      </Form.Label>
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
                                        onChange={(e) =>
                                          setNewDesc(e.target.value)
                                        }
                                      />
                                    </Form.Group>

                                    <Form.Group>
                                      <Form.Label>Jumlah Personil</Form.Label>
                                      <InputGroup className="mb-3">
                                        <Form.Control
                                          onChange={(e) =>
                                            setNewPersonelCount(e.target.value)
                                          }
                                          placeholder={
                                            orderToUpdate.personel_count
                                          }
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

                                    <Form.Group className="d-flex gap-2">
                                      <Button
                                        className="btn__primary"
                                        onClick={handleUpdateOrder}
                                        type="submit"
                                      >
                                        <div className="d-flex gap-2">
                                          Simpan
                                          <FiCheckCircle className="fs-4" />
                                        </div>
                                      </Button>
                                      {orderToUpdate.status === "WAITING" ? (
                                        <Button
                                          className="btn__danger"
                                          onClick={() =>
                                            CancelVU(body, navigate)
                                          }
                                        >
                                          <div className="d-flex gap-2">
                                            Batalkan Pengajuan
                                            <FiXCircle className="fs-4" />
                                          </div>
                                        </Button>
                                      ) : null}
                                    </Form.Group>
                                  </>
                                ))
                              : null}
                          </Form>
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
        <Navigate to="/user/pengajuan-saya" />
      )
    ) : (
      SecuringPage()
    )
  ) : (
    <Navigate to="/silakend-login" />
  );
};
