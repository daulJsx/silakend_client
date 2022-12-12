import React, { useState } from "react";

// fetch data requirement
import { useQuery } from "react-query";
import Fetch from "../consAPI/FetchUser";
import axios from "axios";
import fetchJobUnit from "../consAPI/FetchJobUnits";
import fetchRoles from "../consAPI/FetchRoles";

// bootstrap components
import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

// Components
import { Aside } from "../../components/aside/Aside";
import { NavTop } from "../../components/navtop/NavTop";
import { Footer } from "../../components/footer/Footer";
import { BsModal } from "./BsModal/BsModal";
// import { ModalInfo } from "./BsModal/ModalInfo";

// icons
import { HiUserGroup } from "react-icons/hi";
import { AiFillPlusCircle } from "react-icons/ai";
import { FaInfo } from "react-icons/fa";

import "./../../App.css";
import "./users.css";
import { ErrorResponse } from "@remix-run/router";

function Users(props) {
  // then using the hook
  const {
    data: usersData,
    error,
    isLoading,
    isError,
  } = useQuery("users", Fetch);
  // Fetch job units and roles data
  const { data: jobsData } = useQuery("jobunits", fetchJobUnit);
  const { data: rolesData } = useQuery("roles", fetchRoles);

  // modal
  const [modalShow, setModalShow] = useState(false);
  const [modalInfoShow, setModalInfoShow] = useState(false);

  const [currentUser, setCurrentUser] = useState();

  const fetchUserById = async (userId) => {
    console.log(userId);

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const response = await axios
      .get(`https://8e78-114-5-208-18.ap.ngrok.io/api/users/${userId}`, config)
      .then((response) => {
        console.log(response.data);
        setCurrentUser(response.data);
        setModalInfoShow(true);
      });
  };
  // const { data: currentUser } = useQuery("currentUser", fetchUserById);
  // SHOW OFF!!!!
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
                      bc={<HiUserGroup />}
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
                          <Card.Title className="fs-3 p-5">
                            Data User
                            <Button
                              className="btn btn-add"
                              onClick={() => setModalShow(true)}
                            >
                              Tambah User Baru
                              <AiFillPlusCircle className="fs-3 ms-2" />
                            </Button>
                            <BsModal
                              show={modalShow}
                              onHide={() => setModalShow(false)}
                            />
                            {/* Roles */}
                          </Card.Title>
                          <div className="w-full">
                            <Table borderless responsive striped>
                              <thead>
                                <tr>
                                  {/* <th>No</th>
                                  <th>NAME</th>
                                  <th>EMAIL</th>
                                  <th>PHONE</th>
                                  <th>CITY</th> */}
                                  <th>User ID</th>
                                  <th>NIP</th>
                                  <th>NAMA</th>
                                  <th>UNIT KERJA</th>
                                  <th>AKSI</th>
                                </tr>
                              </thead>
                              <tbody>
                                {usersData?.data.map((users) => (
                                  <tr>
                                    <td key={users.user_id}>{users.user_id}</td>
                                    <td>{users.nip}</td>
                                    <td>{users.name}</td>
                                    <td>{users.job_unit.name}</td>
                                    <td>
                                      <Button
                                        className="btn-edit"
                                        onClick={() =>
                                          fetchUserById(users.user_id)
                                        }
                                      >
                                        <FaInfo className="fs-5" />
                                      </Button>
                                    </td>
                                  </tr>
                                ))}
                                <Modal
                                  show={modalInfoShow}
                                  {...props}
                                  size="lg"
                                  aria-labelledby="contained-modal-title-vcenter"
                                  centered
                                >
                                  <Modal.Body className="modalCustom px-5">
                                    <div className="fs-5 fw-semibold color-primary text-center">
                                      Rincian Data Milik
                                      {currentUser?.map((currentUser) => {
                                        return (
                                          <span className="fs-5 fw-semibold ms-2 text-dark text-center">
                                            {currentUser.name}
                                          </span>
                                        );
                                      })}
                                    </div>

                                    {/* {currentUser.map((currentUser) => {
                                      return (
                                        <>
                                          <Form.Label>Nama</Form.Label>
                                          <Form.Control
                                            type="text"
                                            value={currentUser.name}
                                          />
                                        </>
                                      );
                                    })} */}
                                    {/* {currentUser.map((currentUser) => {
                                      return (
                                        <>
                                          <Form.Label>NIP</Form.Label>
                                          <Form.Control
                                            type="text"
                                            value={currentUser.nip}
                                          />
                                        </>
                                      );
                                    })}
                                    {currentUser.map((currentUser) => {
                                      return (
                                        <>
                                          <Form.Label>Telepon</Form.Label>
                                          <Form.Control
                                            type="number"
                                            value={currentUser.phone}
                                          />
                                        </>
                                      );
                                    })}
                                    {currentUser.map((currentUser) => {
                                      return (
                                        <>
                                          <Form.Label>Email</Form.Label>
                                          <Form.Control
                                            type="email"
                                            value={currentUser.email}
                                          />
                                        </>
                                      );
                                    })}
                                    {currentUser.map((currentUser) => {
                                      return (
                                        <>
                                          <Form.Label>Email</Form.Label>
                                          <Form.Control
                                            type="email"
                                            value={currentUser.email}
                                          />
                                        </>
                                      );
                                    })}
                                    {currentUser.map((currentUser) => {
                                      return (
                                        <>
                                          <Form.Select aria-label="Default select example">
                                            <option>
                                              {currentUser.job_unit.name}
                                            </option>
                                            {jobsData?.data.map((jobunits) => (
                                              <option
                                                key={jobunits.unit_id}
                                                value={jobunits.unit_id}
                                              >
                                                {jobunits.name}
                                              </option>
                                            ))}
                                          </Form.Select>
                                        </>
                                      );
                                    })} */}

                                    <div className="fs-5 fw-semibold color-primary">
                                      Status:
                                      {currentUser.map((currentUser) => {
                                        return (
                                          <span className="fs-5 fw-semibold ms-2 text-dark text-center">
                                            {currentUser.status}
                                          </span>
                                        );
                                      })}
                                    </div>
                                  </Modal.Body>
                                  <Modal.Footer>
                                    <Container>
                                      <Row>
                                        <Col>
                                          <Button
                                            className="w-100 btn-post"
                                            type="submit"
                                          >
                                            Simpan Perubahan
                                          </Button>
                                        </Col>
                                        <Col>
                                          <Button
                                            className="w-100"
                                            variant="secondary"
                                            onClick={() =>
                                              setModalInfoShow(false)
                                            }
                                          >
                                            Tutup
                                          </Button>
                                        </Col>
                                      </Row>
                                    </Container>
                                  </Modal.Footer>
                                </Modal>
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
}

export default Users;
