import React, { useState } from "react";

// fetch data requirement
import { useQuery } from "react-query";
import FetchUsageCat from "../../consAPI/FetchUsageCat";

// Navigating
import { Navigate, NavLink } from "react-router-dom";

// For checking user have done in authentication
import { useAuthUser } from "react-auth-kit";

// Delete Function
import { DeleteUsageCat } from "../../functions/Delete/DeleteUsageCat";

// Bootstrap components
import { Container, Row, Col, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";

// Components
import { Aside } from "../../components/aside/Aside";
import { NavTop } from "../../components/navtop/NavTop";
import { Footer } from "../../components/footer/Footer";

// Icons
import { HiOutlineClipboardList } from "react-icons/hi";
import { TbClipboardPlus } from "react-icons/tb";
import { AiFillEdit } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";

export const UsageCategories = () => {
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
                        bc={<HiOutlineClipboardList />}
                        parentLink={"/kategori-peminjaman"}
                      />
                    ))}
                  </Col>
                </Row>
                {/* NAVBAR */}

                <div className="me-1 d-flex justify-content-end">
                  <Row className="py-4 mb-2">
                    <Col>
                      <NavLink
                        to={"/kategori-peminjaman/tambah-kategori-peminjaman"}
                      >
                        <Button className="btn btn-add side-menu d-flex gap-1 align-items-center justify-content-senter">
                          Tambah Kategori
                          <TbClipboardPlus className="fs-3" />
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
                            Data Kategori Peminjaman
                          </Card.Title>

                          <Table bordered hover responsive>
                            <thead>
                              <tr>
                                <th>No</th>
                                <th>NAMA KATEGORI</th>
                                <th>AKSI</th>
                              </tr>
                            </thead>
                            <tbody>
                              {usageCatData?.map((usageCat, index) => (
                                <tr>
                                  <td
                                    key={usageCat.ucategory_id}
                                    value={usageCat.ucategory_id}
                                  >
                                    {index + 1}
                                  </td>
                                  <td>{usageCat.name}</td>
                                  <td>
                                    <div className="d-flex gap-1 justify-content-center">
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
                                          DeleteUsageCat(usageCat.ucategory_id)
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
