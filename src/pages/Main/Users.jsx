import React from "react";

// fetch data requirement
import { useQuery } from "react-query";
import FetchUsers from "../../consAPI/FetchUsers";

// Cookies JS
import Cookies from "js-cookie";

// Navigating
import { NavLink } from "react-router-dom";
import { Navigate } from "react-router-dom";

// Bootstrap components
import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Breadcrumb from "react-bootstrap/Breadcrumb";

// icons
import { TbUsers } from "react-icons/tb";
import { HiPlusSm } from "react-icons/hi";
import { AiFillEdit } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import { FaInfo } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";

// Components
import { Aside } from "../../components/aside/Aside";
import { NavTop } from "../../components/navtop/NavTop";
import { Footer } from "../../components/footer/Footer";

// Functions
import { GetUserById } from "../../functions/GetUserById";
import { DeleteUser } from "../../functions/Delete/DeleteUser";
import { SecuringPage } from "../../functions/Securing/SecuringPage";

// For checking user have done in authentication
import { useAuthUser } from "react-auth-kit";

export const Users = () => {
  const auth = useAuthUser();
  // Fetching users data
  const {
    data: usersData,
    error,
    isLoading,
    isError,
  } = useQuery(["users", 10], FetchUsers);

  // Get access token
  const token = Cookies.get("token");

  return token ? (
    auth().user_level === 1 ? (
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
                      bc={<TbUsers />}
                      parentLink={"/data-pengguna"}
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
                              <h3 className="main__title">Pengguna</h3>
                              <Breadcrumb className="breadcrumb__item mt-3">
                                <Breadcrumb.Item
                                  className="breadcrumb__item"
                                  href="#"
                                >
                                  <div className="d-flex color-primary justify-content-center align-items-center gap-2 breadcrumb__text">
                                    <TbUsers className="fs-5" />
                                    Data
                                    <FiChevronRight className="fs-6 breadcrumb__divider" />
                                  </div>
                                </Breadcrumb.Item>
                              </Breadcrumb>
                            </Col>
                            <Col md={2} className="me-2">
                              <NavLink to={"/data-pengguna/tambah-pengguna"}>
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
                                    <th>No.</th>
                                    <th>NIP</th>
                                    <th>NAMA</th>
                                    <th>UNIT KERJA</th>
                                    <th align="center">AKSI</th>
                                    <th align="center">RINCIAN</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {usersData?.map((users, index) => (
                                    <tr key={users.user_id}>
                                      <td>{index + 1}</td>
                                      <td>{users.nip}</td>
                                      <td>{users.name}</td>
                                      <td>{users.job_unit.name}</td>
                                      <td>
                                        <div className="d-flex gap-1 justify-content-center">
                                          <NavLink
                                            to={"/data-pengguna/edit-pengguna"}
                                          >
                                            <Button
                                              onClick={() => GetUserById(users)}
                                              className="btn btn-edit"
                                            >
                                              <AiFillEdit className="fs-6" />
                                            </Button>
                                          </NavLink>
                                          <Button
                                            onClick={() =>
                                              DeleteUser(users.user_id)
                                            }
                                            className="btn-danger btn-delete"
                                          >
                                            <FaTrashAlt className="fs-6" />
                                          </Button>
                                        </div>
                                      </td>

                                      <td align="center">
                                        <>
                                          <NavLink
                                            to={
                                              "/data-pengguna/rincian-pengguna"
                                            }
                                          >
                                            <Button
                                              className="btn-info btn-detail"
                                              onClick={() => GetUserById(users)}
                                            >
                                              <FaInfo className="fs-6" />
                                            </Button>
                                          </NavLink>
                                        </>
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
