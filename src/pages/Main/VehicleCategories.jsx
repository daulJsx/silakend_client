import React, { useEffect } from "react";

// Push notify
import Push from "push.js";

// Cookies JS
import Cookies from "js-cookie";

// fetch data requirement
import { useQuery } from "react-query";
import FetchVCategories from "../../consAPI/FetchVCategories";

// Navigating
import { Navigate, NavLink } from "react-router-dom";

// For checking user have done in authentication
import { useAuthUser } from "react-auth-kit";

// Functions
import { DeleteVehicleCat } from "../../functions/Delete/DeleteVehicleCat";
import { SecuringPage } from "../../functions/Securing/SecuringPage";

// Bootstrap components
import { Container, Row, Col, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Breadcrumb from "react-bootstrap/Breadcrumb";

// Components
import { Aside } from "../../components/aside/Aside";
import { NavTop } from "../../components/navtop/NavTop";
import { Footer } from "../../components/footer/Footer";

// Icons
import { RiCarWashingLine } from "react-icons/ri";
import { HiPlusSm } from "react-icons/hi";
import { AiFillEdit } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";

export const VehicleCategories = () => {
  // useEffect(() => {
  //   window.Echo.channel("vehiclecategory").listen(
  //     "VehicleCategoryUpdate",
  //     (e) => {
  //       Push.create("Info Data Kategori Kendaraan", {
  //         body: e.vehicleCategory,
  //         icon: "/polman.ico",
  //         timeout: 4000,
  //         onClick: function () {
  //           window.focus();
  //           this.close();
  //         },
  //       });
  //       // Setelah tampil, refetch data
  //       FetchVCategories();
  //     }
  //   );
  // }, []);

  const auth = useAuthUser();

  // Fetching vehicle categories data
  const {
    data: vehicleCatData,
    error,
    isLoading,
    isError,
  } = useQuery("vehicleCat", FetchVCategories);

  // get job unit by id
  function GetVehicleCatById(vCategory) {
    let { vcategory_id } = vCategory;
    localStorage.setItem("vcategory_id", vcategory_id);
    localStorage.setItem("vCategoryToMap", JSON.stringify(vCategory));
  }

  // Get access token
  const token = Cookies.get("token");

  return token ? (
    auth().user_level === 1 || auth().user_level === 2 ? (
      isError ? (
        <div>{error.message}</div>
      ) : isLoading ? (
        <div className="loading-io">
          <div className="loadingio-spinner-ripple-bc4s1fo5ntn">
            <div className="ldio-c0sicszbk9i">
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      ) : (
        <Container fluid>
          <Row>
            {/* SIDEBAR */}
            <Col xs="auto" className="d-none d-lg-block d-flex min-vh-100 px-4">
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
                      bc={<RiCarWashingLine />}
                      parentLink={"/kategori-kendaraan"}
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
                          <Row className="gap-3 mt-4 me-3">
                            <Col>
                              <h3 className="main__title">
                                Kategori Kendaraan
                              </h3>
                              <Breadcrumb className="breadcrumb__item mt-3">
                                <Breadcrumb.Item
                                  className="breadcrumb__item"
                                  href="#"
                                >
                                  <div className="d-flex color-primary justify-content-center align-items-center gap-2 breadcrumb__text">
                                    <RiCarWashingLine className="fs-5" />
                                    Data
                                    <FiChevronRight className="fs-6 breadcrumb__divider" />
                                  </div>
                                </Breadcrumb.Item>
                              </Breadcrumb>
                            </Col>
                            <Col md={2}>
                              <NavLink
                                to={
                                  "/kategori-kendaraan/tambah-kategori-kendaraan"
                                }
                              >
                                <Button className="btn btn-add side-menu d-flex gap-1 align-items-center justify-content-senter">
                                  Tambah
                                  <HiPlusSm className="fs-3" />
                                </Button>
                              </NavLink>
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
                              <Table hover responsive>
                                <thead>
                                  <tr>
                                    <th>No</th>
                                    <th>NAMA KATEGORI</th>
                                    <th>AKSI</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {vehicleCatData?.map((vehicleCat, index) => (
                                    <tr key={vehicleCat.vcategory_id}>
                                      <td>{index + 1}</td>
                                      <td>{vehicleCat.name}</td>
                                      <td>
                                        <div className="d-flex gap-1">
                                          <NavLink
                                            to={
                                              "/kategori-kendaraan/edit-kategori-kendaraan"
                                            }
                                          >
                                            <Button
                                              className="btn-warning btn-edit"
                                              onClick={() =>
                                                GetVehicleCatById(vehicleCat)
                                              }
                                            >
                                              <AiFillEdit className="fs-6" />
                                            </Button>
                                          </NavLink>
                                          <Button
                                            className="btn-danger btn-delete"
                                            onClick={() =>
                                              DeleteVehicleCat(
                                                vehicleCat.vcategory_id
                                              )
                                            }
                                          >
                                            <FaTrashAlt className="fs-6" />
                                          </Button>
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </Table>
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
      )
    ) : (
      SecuringPage()
    )
  ) : (
    <Navigate to="/silakend-login" />
  );
};
