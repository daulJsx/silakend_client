import React, { useState } from "react";

// fetch data requirement
import { useQuery } from "react-query";
import axios from "axios";
import FetchVM from "../../consAPI/FetchVM";

// Navigating
import { NavLink } from "react-router-dom";
import { Navigate } from "react-router-dom";

// Bootstrap components
import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

// Components
import { Aside } from "../../components/aside/Aside";
import { NavTop } from "../../components/navtop/NavTop";
import { Footer } from "../../components/footer/Footer";

// Icons
import { FaTools } from "react-icons/fa";
import { HiPlusSm } from "react-icons/hi";
import { AiFillEdit } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import { FaInfo } from "react-icons/fa";

// For checking user have done in authentication
import { useAuthUser } from "react-auth-kit";

// Delete function
import { DeleteVM } from "../../functions/Delete/DeleteVM";

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
    localStorage.setItem("maintenanceId", maintenance_id);
    localStorage.setItem("VMToMap", JSON.stringify(VMId));
  }

  if (localStorage.getItem("token") && auth()) {
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
                className="d-none d-lg-block d-flex min-vh-100 px-4"
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
                        bc={<FaTools />}
                        parentLink={"/perbaikan-kendaraan"}
                      />
                    ))}
                  </Col>
                </Row>
                {/* NAVBAR */}

                <div className="me-1 d-flex justify-content-end">
                  <Row className="py-4 mb-2">
                    <Col>
                      <NavLink to={"/perbaikan-kendaraan/tambah-perbaikan"}>
                        <Button className="btn btn-add side-menu d-flex gap-1 align-items-center justify-content-senter">
                          Tambah Data Perbaikan
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
                            Data Perbaikan Kendaraan
                          </Card.Title>

                          <Table bordered hover responsive>
                            <thead>
                              <tr>
                                <th>No</th>
                                <th>KENDARAAN</th>
                                <th>TANGGAL</th>
                                <th>KATEGORI</th>
                                <th>DESKRIPSI</th>
                                <th>PENGELUARAN</th>
                                <th>AKSI</th>
                              </tr>
                            </thead>
                            <tbody>
                              {vehicleMData?.map((vm, index) => (
                                <>
                                  <tr>
                                    <td key={vm.maintenance_id}>{index + 1}</td>
                                    <td>{vm.vehicle_id}</td>
                                    <td>{vm.date}</td>
                                    <td>{vm.category}</td>
                                    <td>{vm.description}</td>
                                    <td>
                                      {vm.total_cost.toLocaleString("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                      })}
                                    </td>
                                    <td>
                                      <div className="d-flex gap-1 justify-content-center">
                                        <NavLink
                                          to={
                                            "/perbaikan-kendaraan/edit-perbaikan"
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
                                  </tr>
                                </>
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
        </>
      );
    }
  } else {
    return <Navigate to="/silakend-login" />;
  }
};
