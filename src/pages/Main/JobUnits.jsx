import React, { useEffect } from "react";

// Realtime requirements
import Push from "push.js";

// Cookies JS
import Cookies from "js-cookie";

// fetch data requirement
import { useQuery } from "react-query";
import FetchJobUnits from "../../consAPI/FetchJobUnits";

// Navigating
import { Navigate, NavLink } from "react-router-dom";

// For checking user have done in authentication
import { useAuthUser } from "react-auth-kit";

// Functions
import { DeleteJobUnit } from "../../functions/Delete/DeleteJobUnit";
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
import { RiCommunityLine } from "react-icons/ri";
import { HiPlusSm } from "react-icons/hi";
import { AiFillEdit } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";

export const JobUnits = () => {
  useEffect(() => {
    window.Echo.channel("jobunit").listen("JobUnitUpdate", (e) => {
      Push.create("Info Data Peminjaman", {
        body: e.jobUnit,
        icon: "/polman.ico",
        timeout: 4000,
        onClick: function () {
          window.focus();
          this.close();
        },
      });
      // Setelah tampil, refetch data
      FetchJobUnits();
    });
  }, []);

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
                      bc={<RiCommunityLine />}
                      parentLink={"/unit-kerja"}
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
                              <h3 className="main__title">Unit Kerja</h3>
                              <Breadcrumb className="breadcrumb__item mt-3">
                                <Breadcrumb.Item
                                  className="breadcrumb__item"
                                  href="#"
                                >
                                  <div className="d-flex color-primary justify-content-center align-items-center gap-2 breadcrumb__text">
                                    <RiCommunityLine className="fs-5" />
                                    Data
                                    <FiChevronRight className="fs-6 breadcrumb__divider" />
                                  </div>
                                </Breadcrumb.Item>
                              </Breadcrumb>
                            </Col>
                            <Col md={2}>
                              <NavLink to={"/unit-kerja/tambah-unit-kerja"}>
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
                                    <th>NAMA UNIT KERJA</th>
                                    <th>KODE</th>
                                    <th>AKSI</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {jobsData?.map((jobUnits, index) => (
                                    <tr key={jobUnits.unit_id}>
                                      <td>{index + 1}</td>
                                      <td>{jobUnits.name}</td>
                                      <td>{jobUnits.unit_account}</td>
                                      <td>
                                        <div className="d-flex gap-1">
                                          <NavLink
                                            to={"/unit-kerja/edit-unit-kerja"}
                                          >
                                            <Button
                                              className="btn-warning btn-edit"
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
