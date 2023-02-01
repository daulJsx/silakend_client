import React, { useState } from "react";

// Fetch Requirements
import axios from "axios";

// Cookies JS
import Cookies from "js-cookie";

// Functions
import { SecuringPage } from "../../functions/Securing/SecuringPage";

// Redirecting
import { useNavigate, Navigate, NavLink } from "react-router-dom";

// Bootstrap components
import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Breadcrumb from "react-bootstrap/Breadcrumb";

// Components
import { Aside } from "../../components/aside/Aside";
import { NavTop } from "../../components/navtop/NavTop";
import { Footer } from "../../components/footer/Footer";

// icons
import { FaArrowLeft } from "react-icons/fa";
import { RiCarWashingLine } from "react-icons/ri";
import { FiChevronRight } from "react-icons/fi";

// React Notification
import swal from "sweetalert";

// For checking user have done in authentication
import { useAuthUser } from "react-auth-kit";

export const UpdateVehicleCat = () => {
  // Get access token
  const token = Cookies.get("token");

  const auth = useAuthUser();
  const navigate = useNavigate();

  // Initialize newest role id
  const vCatId = localStorage.getItem("vcategory_id");

  // Get the JSON object from local storage
  const vCatStr = localStorage.getItem("vCategoryToMap");
  // Parse the JSON string into a JavaScript object
  const vCategoryToMap = JSON.parse(vCatStr);

  // Body for store
  const [curVCat, setCurVCat] = useState({
    name: "",
  });

  const updateVCat = async (e) => {
    e.preventDefault();

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    if (curVCat.name !== "") {
      try {
        await axios
          .put(
            `http://silakend-server-realtime.test/api/vehiclecategories/${vCatId}`,
            curVCat,
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
      swal({
        title: "Peringatan",
        text: "Harap edit data dengan benar",
        icon: "warning",
        button: "Tutup",
      });
    }
  };

  return token ? (
    auth().user_level === 1 || auth().user_level === 2 ? (
      vCatId ? (
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
                                Kategori Kendaraan
                              </h3>
                              <Breadcrumb className="breadcrumb__item mt-3">
                                <Breadcrumb.Item className="breadcrumb__item">
                                  <div className="d-flex text-muted justify-content-center align-items-center gap-2 breadcrumb__text">
                                    <NavLink
                                      to={-1}
                                      className="d-flex justify-content-center align-items-center text-muted gap-2"
                                    >
                                      <RiCarWashingLine className="fs-5" />
                                      Data
                                    </NavLink>

                                    <FiChevronRight className="fs-6 breadcrumb__divider" />
                                    <span className="color-primary">
                                      Tambah Kategori
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
                          <Form onSubmit={updateVCat}>
                            {vCategoryToMap != ""
                              ? [vCategoryToMap].map((vCat) => (
                                  <Form.Group className="mb-3">
                                    <Form.Label>Nama kategori</Form.Label>
                                    <Form.Control
                                      required
                                      placeholder={vCat.name}
                                      className="input form-custom"
                                      type="text"
                                      onChange={(e) =>
                                        setCurVCat({
                                          ...curVCat,
                                          name: e.target.value,
                                        })
                                      }
                                    />
                                  </Form.Group>
                                ))
                              : null}
                            <Form.Group>
                              <Button
                                className="btn-post"
                                onClick={updateVCat}
                                type="submit"
                              >
                                Simpan
                              </Button>
                            </Form.Group>
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
        <Navigate to="/kategori-kendaraan" />
      )
    ) : (
      SecuringPage()
    )
  ) : (
    <Navigate to="/silakend-login" />
  );
};
