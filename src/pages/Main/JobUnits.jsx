import React, { useState } from "react";

// fetch data requirement
import { useQuery } from "react-query";
import FetchJobUnits from "../../consAPI/FetchJobUnits";

// Navigating
import { Navigate, NavLink } from "react-router-dom";

// For checking user have done in authentication
import { useAuthUser } from "react-auth-kit";

// Delete Function
import { DeleteJobUnit } from "../../functions/Delete/DeleteJobUnit";

// Bootstrap components
import { Container, Row, Col, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";

// Components
import { Aside } from "../../components/aside/Aside";
import { NavTop } from "../../components/navtop/NavTop";
import { Footer } from "../../components/footer/Footer";

// Icons
import { RiCommunityLine } from "react-icons/ri";
import { HiPlusSm } from "react-icons/hi";
import { AiFillEdit } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";

export const JobUnits = () => {
  const auth = useAuthUser();

  // Fetching job units
  const {
    data: jobsData,
    error,
    isLoading,
    isError,
  } = useQuery("jobunits", FetchJobUnits);

  // get job unit by id
  function GetJobUnitById(jobUnit) {
    let { unit_id } = jobUnit;
    localStorage.setItem("unitId", unit_id);
    localStorage.setItem("jobUnitToMap", JSON.stringify(jobUnit));
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
                        bc={<RiCommunityLine />}
                        parentLink={"/unit-kerja"}
                      />
                    ))}
                  </Col>
                </Row>
                {/* NAVBAR */}

                <div className="me-1 d-flex justify-content-end">
                  <Row className="py-4 mb-2">
                    <Col>
                      <NavLink to={"/unit-kerja/tambah-unit-kerja"}>
                        <Button className="btn btn-add side-menu d-flex gap-1 align-items-center justify-content-senter">
                          Tambah Unit Kerja
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
                            Data Unit Kerja
                          </Card.Title>

                          <Table bordered hover responsive>
                            <thead>
                              <tr>
                                <th>No</th>
                                <th>NAMA UNIT KERJA</th>
                                <th>KODE</th>
                                <th>AKSI</th>
                              </tr>
                            </thead>
                            <tbody>
                              {jobsData?.map((jobUnits, index) => (
                                <tr>
                                  <td
                                    key={jobUnits.unit_id}
                                    value={jobUnits.unit_id}
                                  >
                                    {index + 1}
                                  </td>
                                  <td>{jobUnits.name}</td>
                                  <td>{jobUnits.unit_account}</td>
                                  <td>
                                    <div className="d-flex gap-1 justify-content-center">
                                      <NavLink
                                        to={"/unit-kerja/edit-unit-kerja"}
                                      >
                                        <Button
                                          className="btn btn-edit"
                                          onClick={() =>
                                            GetJobUnitById(jobUnits)
                                          }
                                        >
                                          <AiFillEdit className="fs-6" />
                                        </Button>
                                      </NavLink>
                                      <Button
                                        className="btn-danger btn-delete"
                                        onClick={() =>
                                          DeleteJobUnit(jobUnits.unit_id)
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
        </>
      );
    }
  } else {
    return <Navigate to="/silakend-login" />;
  }
};
