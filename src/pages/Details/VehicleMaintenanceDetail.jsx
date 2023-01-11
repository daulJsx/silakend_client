import React, { useState, useEffect } from "react";

// Cookies JS
import Cookies from "js-cookie";

import { SecuringPage } from "../../functions/Securing/SecuringPage";

import axios from "axios";

// Delete Function for maintenance details
import { DeleteVMD } from "../../functions/Delete/DeleteVMDetail";

// For checking user have done in authentication
import { useAuthUser } from "react-auth-kit";
import { Navigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

// bootstrap components
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Alert from "react-bootstrap/Alert";

// Components
import { Aside } from "./../../components/aside/Aside";
import { NavTop } from "../../components/navtop/NavTop";
import { Footer } from "../../components/footer/Footer";

// icons
import { FaArrowLeft } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

// React Notification
import swal from "sweetalert";

export const VehicleMaintenancesDetail = () => {
  // Get access token
  const token = Cookies.get("_auth");

  const auth = useAuthUser();

  // Initialize newest maintenance id
  const [maintenanceId, setMaintenanceId] = useState(
    localStorage.getItem("maintenanceId")
  );

  // initialize the loading
  const [isLoading, setIsLoading] = useState(true);

  // catch the fetching maintenance details where maintenance_id
  const [maintenanceDetails, setMaintenanceDetails] = useState(null);

  useEffect(() => {
    // Get access token
    const token = Cookies.get("_auth");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    async function fetchData() {
      const response = await axios
        .get(
          `https://silakend-server.xyz/api/maintenancedetails/${maintenanceId}`,
          config
        )
        .then((response) => {
          if (response.status === 200) {
            setIsLoading(false);
            const maintenanceDetails = response.data;
            if (maintenanceDetails.length !== 0) {
              setMaintenanceDetails(maintenanceDetails);
            }
          }
        })
        .catch((error) => {
          if (error.response.data.message) {
            swal("Ups!", "Something went wrong", "error");
          } else {
            swal("Ups!", error.response.data.msg, "error");
          }
        });
    }

    fetchData();
  }, []);

  // Get the JSON object from local storage
  const VMString = localStorage.getItem("VMToMap");
  // Parse the JSON string into a JavaScript object
  const VMToMap = JSON.parse(VMString);

  // get vm by id
  function GetVMDId(VMDId) {
    let { detail_id } = VMDId;
    localStorage.setItem("detailId", detail_id);
    localStorage.setItem("VMDToMap", JSON.stringify(VMDId));
  }

  {
    return token !== "" && auth() ? (
      auth().user_level === 1 ? (
        maintenanceId !== "" ? (
          isLoading ? (
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
                          title={"Rincian Data Perbaikan Kendaraan"}
                          parentLink={"/perbaikan-kendaraan"}
                        />
                      ))}
                    </Col>
                  </Row>
                  {/* NAVBAR */}
                  <main className="min-vh-100 px-2 mt-4 d-flex flex-column gap-2">
                    {maintenanceDetails === null ? (
                      <Alert variant="warning" className="d-flex bd-highlight">
                        <div className="fs-5 me-auto bd-highlight">
                          Data perbaikan ini belum ada rincian!
                        </div>

                        <div className="bd-highlight">
                          <NavLink
                            to={
                              "/perbaikan-kendaraan/rincian-perbaikan-kendaraan/tambah-rincian"
                            }
                          >
                            <Button variant="warning" size="sm">
                              Tambahkan Rincian <FaPlus />
                            </Button>
                          </NavLink>
                        </div>
                      </Alert>
                    ) : null}

                    <Row>
                      <Col>
                        <Card>
                          <Card.Title className="fs-4 p-4 fw-semibold color-primary">
                            Data Perbaikan Kendaraan
                          </Card.Title>
                          <Card.Body className="d-flex flex-column gap-3">
                            <ListGroup as="ol" numbered className="mb-2">
                              {VMToMap != ""
                                ? [VMToMap].map((currentVM) => (
                                    <>
                                      <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                      >
                                        <div className="ms-2 me-auto">
                                          <div className="fw-bold">
                                            KENDARAAN
                                          </div>
                                          {currentVM.vehicle.name}
                                        </div>
                                      </ListGroup.Item>
                                      <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                      >
                                        <div className="ms-2 me-auto">
                                          <div className="fw-bold">
                                            JENIS PERBAIKAN
                                          </div>
                                          {currentVM.category}
                                        </div>
                                      </ListGroup.Item>
                                      <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                      >
                                        <div className="ms-2 me-auto">
                                          <div className="fw-bold">TANGGAL</div>
                                          {currentVM.date}
                                        </div>
                                      </ListGroup.Item>
                                      <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                      >
                                        <div className="ms-2 me-auto">
                                          <div className="fw-bold">
                                            DESKRIPSI
                                          </div>
                                          {currentVM.description}
                                        </div>
                                      </ListGroup.Item>
                                      <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                      >
                                        <div className="ms-2 me-auto">
                                          <div className="fw-bold">
                                            PENGELUARAN
                                          </div>
                                          {currentVM.total_cost.toLocaleString(
                                            "id-ID",
                                            {
                                              style: "currency",
                                              currency: "IDR",
                                            }
                                          )}
                                        </div>
                                      </ListGroup.Item>
                                    </>
                                  ))
                                : null}
                            </ListGroup>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>

                    {maintenanceDetails !== null ? (
                      <Row>
                        <Col>
                          <Card>
                            <Card.Title className="fs-4 p-4 fw-semibold color-primary">
                              Rincian Data Perbaikan Kendaraan
                            </Card.Title>
                            <Card.Body className="d-flex flex-column gap-3">
                              <div className="me-1 d-flex justify-content-end">
                                <NavLink
                                  to={
                                    "/perbaikan-kendaraan/rincian-perbaikan-kendaraan/tambah-rincian"
                                  }
                                >
                                  <Button className="btn btn-add side-menu d-flex gap-1 align-items-center justify-content-senter">
                                    Tambah Rincian
                                    <FaPlus className="fs-3" />
                                  </Button>
                                </NavLink>
                              </div>
                              <Table responsive bordered hover>
                                <thead>
                                  <tr>
                                    <th>No</th>
                                    <th>SPARE PART</th>
                                    <th>JUMLAH SPARE PART</th>
                                    <th>SATUAN</th>
                                    <th>HARGA SPARE PART</th>
                                    <th>HARGA TOTAL</th>
                                    <th>AKSI</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {maintenanceDetails.map((vmd, index) => (
                                    <tr>
                                      <td key={vmd.detail_id}>{index + 1}</td>
                                      <td>{vmd.item_name}</td>
                                      <td>{vmd.item_qty}</td>
                                      <td>{vmd.item_unit}</td>
                                      <td>
                                        {vmd.item_price
                                          ? vmd.item_price.toLocaleString(
                                              "id-ID",
                                              {
                                                style: "currency",
                                                currency: "IDR",
                                              }
                                            )
                                          : null}
                                      </td>
                                      <td>
                                        {vmd.price_total
                                          ? vmd.price_total.toLocaleString(
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
                                              "/perbaikan-kendaraan/rincian-perbaikan-kendaraan/edit-rincian"
                                            }
                                          >
                                            <Button
                                              className="btn btn-edit"
                                              onClick={() => GetVMDId(vmd)}
                                            >
                                              <AiFillEdit className="fs-6" />
                                            </Button>
                                          </NavLink>

                                          <Button
                                            onClick={() =>
                                              DeleteVMD(vmd.detail_id)
                                            }
                                            className="btn-danger btn-delete"
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
                    ) : null}
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
          <Navigate to="/perbaikan-kendaraan" />
        )
      ) : (
        SecuringPage()
      )
    ) : (
      <Navigate to="/silakend-login" />
    );
  }
};
