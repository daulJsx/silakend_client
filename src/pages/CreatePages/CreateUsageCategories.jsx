import React, { useState } from "react";

// Fetch Requirements
import axios from "axios";

// Redirecting
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

// Bootstrap components
import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
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

export const CreateUsageCategories = () => {
  const auth = useAuthUser();
  const navigate = useNavigate();

  // Body for store
  const [newUsageCat, setNewUsageCat] = useState({
    name: "",
  });

  // Store new vehicle data
  function handleError(error) {
    if (error.response.data.message) {
      swal("Ups!", error.response.data.message, "error");
    } else {
      swal("Ups!", error.response.data.msg, "error");
    }
  }

  const postNewUsageCat = async () => {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    if (newUsageCat.name != "") {
      await axios
        .post(
          "https://silakend-server.xyz/api/usagecategories",
          newUsageCat,
          config
        )
        .then((response) => {
          if (response.status === 200) {
            navigate("/kategori-peminjaman");
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

  if (localStorage.getItem("token") && auth()) {
    return (
      <>
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
                      title={"Tambah Kategori Peminjaman"}
                      parentLink={"/kategori-peminjaman"}
                    />
                  ))}
                </Col>
              </Row>
              {/* NAVBAR */}
              <main className="min-vh-10 px-2 mt-4">
                <Row>
                  <Col>
                    <Card>
                      <Card.Body>
                        <Card.Title className="fs-4 p-4 mb-4 fw-semibold color-primary">
                          Silahkan Tambah Kategori Peminjaman Baru Disini
                        </Card.Title>

                        <Container>
                          <Row>
                            <Col>
                              <Form.Group className="mb-3">
                                <Form.Label>Nama kategori</Form.Label>
                                <Form.Control
                                  required
                                  className="input form-custom"
                                  type="text"
                                  onChange={(e) =>
                                    setNewUsageCat({
                                      ...newUsageCat,
                                      name: e.target.value,
                                    })
                                  }
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                        </Container>
                      </Card.Body>
                      <Card.Footer>
                        <Button
                          className="btn-post"
                          onClick={postNewUsageCat}
                          type="submit"
                        >
                          Tambahkan
                        </Button>
                      </Card.Footer>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Footer />
                  </Col>
                </Row>
              </main>
            </Col>
          </Row>
        </Container>
      </>
    );
  } else {
    return <Navigate to="/silakend-login" />;
  }
};
