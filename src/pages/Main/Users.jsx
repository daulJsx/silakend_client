import React, { useState } from "react";

// fetch data requirement
import { useQuery } from "react-query";
import FetchUsers from "../../consAPI/FetchUsers";

// Secured the page
import { useIsAuthenticated } from "react-auth-kit";
import { redirect } from "react-router-dom";

// Navigating
import { NavLink } from "react-router-dom";

// Bootstrap components
import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

// icons
import { HiUserGroup } from "react-icons/hi";
import { AiFillPlusCircle } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";

// Components
import { Aside } from "../../components/aside/Aside";
import { NavTop } from "../../components/navtop/NavTop";
import { Footer } from "../../components/footer/Footer";

// Functions
import { GetUserById } from "../../functions/GetUserById";
import { DeleteUser } from "../../consAPI/Delete/DeleteUser";

// Custom Styles
import "../CustomStyles/users.css";

export const Users = () => {
  // Fetching users data
  const {
    data: usersData,
    error,
    isLoading,
    isError,
  } = useQuery(["users", 10], FetchUsers);

  if (useIsAuthenticated()) {
    if (isError) {
      return <div>{error.message}</div>;
    } else if (isLoading) {
      return (
        <div className="loading-io">
          <div className="loadingio-spinner-ripple-bc4s1fo5ntn">
            <div className="ldio-c0sicszbk9i">
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <>
          <Container fluid>
            <Row>
              {/* SIDEBAR */}
              <Col
                xs="auto"
                className="sidebar d-none d-xl-block d-flex min-vh-100 px-4"
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
                        bc={<HiUserGroup />}
                        parentLink={"/data-pengguna"}
                      />
                    ))}
                  </Col>
                </Row>
                {/* NAVBAR */}
                <Container fluid>
                  <Row>
                    <Col>
                      <main className="min-vh-100">
                        <Card>
                          <Card.Body>
                            <Card.Title className="fs-4 p-4 fw-semibold color-primary">
                              Data Pengguna
                              <NavLink to={"/data-pengguna/tambah-pengguna"}>
                                <Button className="btn btn-add">
                                  Tambah Pengguna Baru
                                  <AiFillPlusCircle className="fs-3 ms-2" />
                                </Button>
                              </NavLink>
                            </Card.Title>

                            <Table bordered responsive hover>
                              <thead>
                                <tr>
                                  <th>No.</th>
                                  <th>NIP</th>
                                  <th>NAMA</th>
                                  <th>ALAMAT</th>
                                  <th>EMAIL</th>
                                  <th>UNIT KERJA</th>
                                  <th>AKSI</th>
                                </tr>
                              </thead>
                              <tbody>
                                {usersData?.map((users, index) => (
                                  <tr>
                                    <td key={users.user_id}>{index + 1}</td>
                                    <td>{users.nip}</td>
                                    <td>{users.name}</td>
                                    <td>{users.address}</td>
                                    <td>{users.email}</td>
                                    <td>{users.job_unit.name}</td>
                                    <td className="d-flex gap-1">
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
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                          </Card.Body>
                        </Card>
                      </main>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Footer />
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>
          </Container>
        </>
      );
    }
  } else {
    return redirect("/silakend-login");
  }
};