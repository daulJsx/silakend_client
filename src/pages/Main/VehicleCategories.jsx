import React from "react";

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

// Components
import { Aside } from "../../components/aside/Aside";
import { NavTop } from "../../components/navtop/NavTop";
import { Footer } from "../../components/footer/Footer";

// Icons
import { RiCarWashingLine } from "react-icons/ri";
import { HiPlusSm } from "react-icons/hi";
import { AiFillEdit } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";

export const VehicleCategories = () => {
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

              <div className="me-1 d-flex justify-content-end">
                <Row className="py-4 mb-2">
                  <Col>
                    <NavLink
                      to={"/kategori-kendaraan/tambah-kategori-kendaraan"}
                    >
                      <Button className="btn btn-add side-menu d-flex gap-1 align-items-center justify-content-senter">
                        Tambah Kategori
                        <HiPlusSm className="fs-3" />
                      </Button>
                    </NavLink>
                  </Col>
                </Row>
              </div>

              <main className="min-vh-100 px-2">
                <Row>
                  <Col>
                    <Card>
                      <Card.Body>
                        <Card.Title className="fs-4 p-4 fw-semibold color-primary">
                          Data Kategori Kendaraan
                        </Card.Title>

                        <Table bordered hover responsive>
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
                                  <div className="d-flex gap-1 justify-content-center">
                                    <NavLink
                                      to={
                                        "/kategori-kendaraan/edit-kategori-kendaraan"
                                      }
                                    >
                                      <Button
                                        className="btn btn-edit"
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
