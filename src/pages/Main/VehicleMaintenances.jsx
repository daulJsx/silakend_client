import React from "react";

// fetch data requirement
import { useQuery } from "react-query";
import FetchVM from "../../consAPI/FetchVM";

// Navigating
import { NavLink } from "react-router-dom";
import { Navigate } from "react-router-dom";

// Cookies JS
import Cookies from "js-cookie";

// Bootstrap components
import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Breadcrumb from "react-bootstrap/Breadcrumb";

// Components
import { Aside } from "../../components/aside/Aside";
import { NavTop } from "../../components/navtop/NavTop";
import { Footer } from "../../components/footer/Footer";

// Icons
import { BiCog } from "react-icons/bi";
import { HiPlusSm } from "react-icons/hi";
import { AiFillEdit } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import { FaInfo } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";

// For checking user have done in authentication
import { useAuthUser } from "react-auth-kit";

// Functions
import { DeleteVM } from "../../functions/Delete/DeleteVM";
import { SecuringPage } from "../../functions/Securing/SecuringPage";

export const VehicleMaintenances = () => {
  const auth = useAuthUser();

  // Fetching vm data
  const {
    data: vehicleMData,
    error,
    isLoading,
    isError,
  } = useQuery("vm", FetchVM);

  // get vm by id
  function GetVMId(VMId) {
    let { maintenance_id } = VMId;
    // FetchVehicleMaintenanceByMId(maintenance_id);
    localStorage.setItem("maintenanceId", maintenance_id);
    localStorage.setItem("VMToMap", JSON.stringify(VMId));
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
                      bc={<BiCog />}
                      parentLink={"/perbaikan-kendaraan"}
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
                                Perbaikan Kendaraan
                              </h3>
                              <Breadcrumb className="breadcrumb__item mt-3">
                                <Breadcrumb.Item
                                  className="breadcrumb__item"
                                  href="#"
                                >
                                  <div className="d-flex color-primary justify-content-center align-items-center gap-2 breadcrumb__text">
                                    <BiCog className="fs-5" />
                                    Data
                                    <FiChevronRight className="fs-6 breadcrumb__divider" />
                                  </div>
                                </Breadcrumb.Item>
                              </Breadcrumb>
                            </Col>
                            <Col md={2}>
                              <NavLink
                                to={
                                  "/perbaikan-kendaraan/tambah-perbaikan-kendaraan"
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
                                    <th>KENDARAAN</th>
                                    <th>TANGGAL</th>
                                    <th>KATEGORI</th>
                                    <th>PENGELUARAN</th>
                                    <th>AKSI</th>
                                    <th>RINCIAN</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {vehicleMData?.map((vm, index) => (
                                    <tr key={vm.maintenance_id}>
                                      <td>{index + 1}</td>
                                      <td>{vm.vehicle.name}</td>
                                      <td>{vm.date}</td>
                                      <td>{vm.category}</td>

                                      <td>
                                        {vm.total_cost
                                          ? vm.total_cost.toLocaleString(
                                              "id-ID",
                                              {
                                                style: "currency",
                                                currency: "IDR",
                                              }
                                            )
                                          : null}
                                      </td>

                                      <td>
                                        <div className="d-flex gap-1 justify-content-center">
                                          <NavLink
                                            to={
                                              "/perbaikan-kendaraan/edit-perbaikan-kendaraan"
                                            }
                                          >
                                            <Button
                                              className="btn btn-edit"
                                              onClick={() => GetVMId(vm)}
                                            >
                                              <AiFillEdit className="fs-6" />
                                            </Button>
                                          </NavLink>

                                          <Button
                                            onClick={() =>
                                              DeleteVM(vm.maintenance_id)
                                            }
                                            className="btn-danger btn-delete"
                                          >
                                            <FaTrashAlt className="fs-6" />
                                          </Button>
                                        </div>
                                      </td>
                                      <td>
                                        <NavLink
                                          to={
                                            "/perbaikan-kendaraan/rincian-perbaikan-kendaraan"
                                          }
                                        >
                                          <Button
                                            onClick={() => {
                                              GetVMId(vm);
                                            }}
                                            className="btn-info btn-detail"
                                          >
                                            <FaInfo className="fs-6" />
                                          </Button>
                                        </NavLink>
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
