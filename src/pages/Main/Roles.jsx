import React, { useEffect } from "react";

// Push notify
import Push from "push.js";

// fetch data requirement
import { useQuery } from "react-query";
import FetchRoles from "../../consAPI/FetchRoles";

// Cookies JS
import Cookies from "js-cookie";

// Navigating
import { Navigate, NavLink } from "react-router-dom";

// For checking user have done in authentication
import { useAuthUser } from "react-auth-kit";

// Functions
import { DeleteRole } from "../../functions/Delete/DeleteRole";
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
import { CgUserList } from "react-icons/cg";
import { HiPlusSm } from "react-icons/hi";
import { AiFillEdit } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";

export const Roles = () => {
  useEffect(() => {
    window.Echo.channel("role").listen("RoleUpdate", (e) => {
      Push.create("Role Updated", {
        body: e.role,
        icon: "/polman.ico",
        timeout: 4000,
        onClick: function () {
          window.focus();
          this.close();
        },
      });
      // Setelah tampil, refetch data
      FetchRoles();
    });
  }, []);

  const auth = useAuthUser();

  // Fetching roles data
  const {
    data: rolesData,
    error,
    isLoading,
    isError,
  } = useQuery("roles", FetchRoles);

  // get job unit by id
  function GetRolesById(roles) {
    let { role_id } = roles;
    localStorage.setItem("roleId", role_id);
    localStorage.setItem("roleToMap", JSON.stringify(roles));
  }

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
                      bc={<CgUserList />}
                      parentLink={"/data-peran"}
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
                              <h3 className="main__title">Peran Pengguna</h3>
                              <Breadcrumb className="breadcrumb__item mt-3">
                                <Breadcrumb.Item className="breadcrumb__item">
                                  <div className="d-flex color-primary justify-content-center align-items-center gap-2 breadcrumb__text">
                                    <CgUserList className="fs-5" />
                                    Data
                                    <FiChevronRight className="fs-6 breadcrumb__divider" />
                                  </div>
                                </Breadcrumb.Item>
                              </Breadcrumb>
                            </Col>
                            <Col md={2}>
                              <NavLink to={"/data-peran/tambah-peran"}>
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
                                    <th>NAMA PERAN</th>
                                    <th>LEVEL</th>
                                    <th>AKSI</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {rolesData?.map((roles, index) => {
                                    return roles.level !== 1 ? (
                                      <tr key={roles.role_id}>
                                        <td>{index + 1}</td>
                                        <td>{roles.name}</td>
                                        <td>{roles.level}</td>
                                        <td>
                                          <div className="d-flex gap-1">
                                            <NavLink
                                              to={"/data-peran/edit-peran"}
                                            >
                                              <Button
                                                className="btn-warning btn-edit"
                                                onClick={() =>
                                                  GetRolesById(roles)
                                                }
                                              >
                                                <AiFillEdit className="fs-6" />
                                              </Button>
                                            </NavLink>
                                            <Button
                                              className="btn-danger btn-delete"
                                              onClick={() =>
                                                DeleteRole(roles.role_id)
                                              }
                                            >
                                              <FaTrashAlt className="fs-6" />
                                            </Button>
                                          </div>
                                        </td>
                                      </tr>
                                    ) : null;
                                  })}
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
