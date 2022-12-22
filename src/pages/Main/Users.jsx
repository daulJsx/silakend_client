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
import { UseGetUserById } from "../../functions/UseGetUserById";

// Custom Styles
import "../CustomStyles/users.css";
import axios from "axios";

// React Notification
import swal from "sweetalert";

export const Users = () => {
  // Fetching users data
  const {
    data: usersData,
    error,
    isLoading,
    isError,
  } = useQuery(["users", 10], FetchUsers);

  // Delete function
  const deteteCurrentUser = async (userId) => {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    swal({
      title: "Yakin?",
      text: "Data pengguna yang dihapus, tidak dapat kembali!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        await axios
          .delete(`http://silakend-server.xyz/api/users/${userId}`, config)
          .then((response) => {
            if (response.status === 200) {
              console.log(response.data.msg);
              swal({
                title: "Berhasil!",
                text: response.data.msg,
                icon: "success",
                button: "Tutup",
              });
            } else {
              console.log(response.data.msg);
              swal({
                title: "Gagal!",
                text: response.data.msg,
                icon: "error",
                button: "Tutup",
              });
            }
          });
      } else {
        swal("Data pengguna aman!");
      }
    });
  };

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
                          <Card.Body className="p-0">
                            <Card.Title className="fs-3 p-4">
                              <NavLink to={"/data-pengguna/tambah-pengguna"}>
                                <Button className="btn btn-add">
                                  Tambah Pengguna Baru
                                  <AiFillPlusCircle className="fs-3 ms-2" />
                                </Button>
                              </NavLink>
                            </Card.Title>
                            <div className="w-full">
                              <Table borderless responsive hover>
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
                                        <NavLink to={"/edit-pengguna"}>
                                          <Button
                                            onClick={() =>
                                              UseGetUserById(users)
                                            }
                                            className="btn btn-edit"
                                          >
                                            <AiFillEdit className="fs-6" />
                                          </Button>
                                        </NavLink>
                                        <Button
                                          onClick={() =>
                                            deteteCurrentUser(users.user_id)
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
                            </div>
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
