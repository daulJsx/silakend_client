import React, { useEffect } from "react";

// fetch data requirement
import { useQuery } from "react-query";
import FetchUsageCat from "../../consAPI/FetchUsageCat";

// Navigating
import { Navigate, NavLink } from "react-router-dom";

// For checking user have done in authentication
import { useAuthUser } from "react-auth-kit";

// Cookies JS
import Cookies from "js-cookie";

// Functions
import { DeleteUsageCat } from "../../functions/Delete/DeleteUsageCat";
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
import { HiOutlineClipboardList } from "react-icons/hi";
import { HiPlusSm } from "react-icons/hi";
import { AiFillEdit } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";

export const UsageCategories = () => {
  useEffect(() => {
    window.Echo.channel("usagecategory").listen("UsageCategoryUpdate", (e) => {
      Push.create("Info Data Kategori Peminjaman", {
        body: e.usageCategory,
        icon: "/polman.ico",
        timeout: 4000,
        onClick: function () {
          window.focus();
          this.close();
        },
      });
      // Setelah tampil, refetch data
      FetchUsageCat();
    });
  }, []);

  const auth = useAuthUser();

  // Fetching usage categories data
  const {
    data: usageCatData,
    error,
    isLoading,
    isError,
  } = useQuery("usageCat", FetchUsageCat);

  // get job unit by id
  function GetUsageCatById(uCategory) {
    let { ucategory_id } = uCategory;
    localStorage.setItem("ucategory_id", ucategory_id);
    localStorage.setItem("uCategoryToMap", JSON.stringify(uCategory));
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
                      bc={<HiOutlineClipboardList />}
                      parentLink={"/kategori-peminjaman"}
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
                                Kategori Peminjaman
                              </h3>
                              <Breadcrumb className="breadcrumb__item mt-3">
                                <Breadcrumb.Item className="breadcrumb__item ">
                                  <NavLink
                                    to={"/kategori-peminjaman"}
                                    className=" color-primary d-flex justify-content-center align-items-center gap-2"
                                  >
                                    <HiOutlineClipboardList className="fs-5" />
                                    Data
                                    <FiChevronRight className="fs-6 breadcrumb__divider" />
                                  </NavLink>
                                </Breadcrumb.Item>
                              </Breadcrumb>
                            </Col>
                            <Col md={2}>
                              <NavLink
                                to={
                                  "/kategori-peminjaman/tambah-kategori-peminjaman"
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
                      <Card.Body className="px-4 mb-3">
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
                                    <th>NAMA KATEGORI</th>
                                    <th>AKSI</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {usageCatData?.map((usageCat, index) => (
                                    <tr key={usageCat.ucategory_id}>
                                      <td>{index + 1}</td>
                                      <td>{usageCat.name}</td>
                                      <td>
                                        <div className="d-flex gap-1">
                                          <NavLink
                                            to={
                                              "/kategori-peminjaman/edit-kategori-peminjaman"
                                            }
                                          >
                                            <Button
                                              className="btn btn-edit"
                                              onClick={() =>
                                                GetUsageCatById(usageCat)
                                              }
                                            >
                                              <AiFillEdit className="fs-6" />
                                            </Button>
                                          </NavLink>
                                          <Button
                                            className="btn-danger btn-delete"
                                            onClick={() =>
                                              DeleteUsageCat(
                                                usageCat.ucategory_id
                                              )
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
