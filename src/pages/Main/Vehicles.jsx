import React, { useState } from "react";

// fetch data requirement
import { useQuery } from "react-query";
import FetchVehicles from "../../consAPI/FetchVehicles";

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

// Components
import { Aside } from "../../components/aside/Aside";
import { NavTop } from "../../components/navtop/NavTop";
import { Footer } from "../../components/footer/Footer";

// Icons
import { AiFillCar } from "react-icons/ai";
import { AiFillPlusCircle } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";

// Functions
import { GetVehicleById } from "../../functions/GetVehicleById";
import { DeleteVehicle } from "../../consAPI/Delete/DeleteVehicle";

// CSS
import "../CustomStyles/vechiles.css";

export const Vehicles = () => {
  // Fetching vehicles data
  const {
    data: vehiclesData,
    error,
    isLoading,
    isError,
  } = useQuery("vehicles", FetchVehicles);

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
                        bc={<AiFillCar />}
                        parentLink={"/data-kendaraan"}
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
                              Data Kendaraan Dinas
                              <NavLink to={"/data-kendaraan/tambah-kendaraan"}>
                                <Button className="btn btn-add">
                                  Tambah Kendaraan
                                  <AiFillPlusCircle className="fs-3 ms-2" />
                                </Button>
                              </NavLink>
                            </Card.Title>

                            <Table bordered hover responsive>
                              <thead>
                                <tr>
                                  <th>No</th>
                                  <th>NAMA KENDARAAN</th>
                                  <th>NO POLISI</th>
                                  <th>JUMLAH KILOMETER TEMPUH</th>
                                  <th>TAHUN PEMBUATAN</th>
                                  <th>TANGGAL PAJAK</th>
                                  <th>TANGGAL BERLAKU</th>
                                  <th>KATEGORI</th>
                                  <th>AKSI</th>
                                </tr>
                              </thead>
                              <tbody>
                                {vehiclesData?.map((vehicles, index) => (
                                  <tr>
                                    <td key={vehicles.vehicle_id}>
                                      {index + 1}
                                    </td>
                                    <td>{vehicles.name}</td>
                                    <td>{vehicles.license_number}</td>
                                    <td>{vehicles.distance_count} KM</td>
                                    <td>{vehicles.year}</td>
                                    <td>{vehicles.tax_date}</td>
                                    <td>{vehicles.valid_date}</td>
                                    <td>{vehicles.category.name}</td>
                                    <td className="d-flex gap-1">
                                      <NavLink
                                        to={"/data-kendaraan/edit-kendaraan"}
                                      >
                                        <Button
                                          className="btn btn-edit"
                                          onClick={() =>
                                            GetVehicleById(vehicles)
                                          }
                                        >
                                          <AiFillEdit className="fs-6" />
                                        </Button>
                                      </NavLink>
                                      <Button
                                        className="btn-danger btn-delete"
                                        onClick={() =>
                                          DeleteVehicle(vehicles.vehicle_id)
                                        }
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
