import React, { useState } from "react";

// Axios
import axios from "axios";

// Fetch Requirements
import { useQuery } from "react-query";
import FetchJobUnits from "../../consAPI/FetchJobUnits";
import FetchRoles from "../../consAPI/FetchRoles";

// React Notification
import swal from "sweetalert";

// Redirecting
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

// Bootstrap components
import { Container, Row, Col } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";

// Components
import { Aside } from "../../components/aside/Aside";
import { NavTop } from "../../components/navtop/NavTop";
import { Footer } from "../../components/footer/Footer";
import PasswordInputField from "../../components/passVal/PasswordInputField";
import ConfirmPasswordInputField from "../../components/passVal/ConfirmPasswordInputField";

// icons
import { FaArrowLeft } from "react-icons/fa";

// custom styles
import "../CustomStyles/formCustom.css";

// For checking user have done in authentication
import { useAuthUser } from "react-auth-kit";

export const CreateUser = () => {
  // Navigating
  const navigate = useNavigate();

  // Fetch job units and roles data
  const { data: jobsData } = useQuery("jobunits", FetchJobUnits);
  const { data: rolesData } = useQuery("roles", FetchRoles);

  // Body for store
  const [newUser, setNewUser] = useState({
    nip: "",
    name: "",
    password: "",
    password_confirmation: "",
    address: "",
    phone: "",
    email: "",
    unit_id: "",
    role_id: "",
  });

  // Store new user data
  // handle error function
  function handleError(error) {
    if (error.response.data.message) {
      swal("Ups!", error.response.data.message, "error");
    } else {
      swal("Ups!", error.response.data.msg, "error");
    }
  }

  const postNewUser = async (e) => {
    e.preventDefault();
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    if (
      newUser.nip !== "" &&
      newUser.name !== "" &&
      newUser.password !== "" &&
      newUser.password_confirmation !== "" &&
      newUser.address !== "" &&
      newUser.phone !== "" &&
      newUser.email !== "" &&
      newUser.unit_id !== "" &&
      newUser.role_id !== ""
    ) {
      await axios
        .post("https://silakend-server.xyz/api/users/", newUser, config)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            navigate("/data-pengguna");
            swal({
              title: "Berhasil!",
              text: response.data.msg,
              icon: "success",
              button: "Tutup",
            });
          }
        })
        .catch((error) => {
          console.log(error);
          handleError(error);
        });
    } else {
      swal({
        title: "Peringatan",
        text: "Harap isi semua data!",
        icon: "warning",
        button: "Tutup",
      });
    }
  };

  // Password confirmation logic
  const [passwordError, setPasswordErr] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handlePasswordChange = (e) => {
    const passwordInputValue = e.target.value.trim();
    const passwordInputFieldName = e.target.name;
    const NewPasswordInput = {
      ...newUser,
      [passwordInputFieldName]: passwordInputValue,
    };
    setNewUser(NewPasswordInput);
  };
  const handleValidation = (e) => {
    const passwordInputValue = e.target.value.trim();
    const passwordInputFieldName = e.target.name;
    //for password
    if (passwordInputFieldName === "password") {
      // const uppercaseRegExp = /(?=.*?[A-Z])/;
      // const lowercaseRegExp = /(?=.*?[a-z])/;
      // const digitsRegExp = /(?=.*?[0-9])/;
      // const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
      const minLengthRegExp = /.{8,}/;
      const passwordLength = passwordInputValue.length;
      // const uppercasePassword = uppercaseRegExp.test(passwordInputValue);
      // const lowercasePassword = lowercaseRegExp.test(passwordInputValue);
      // const digitsPassword = digitsRegExp.test(passwordInputValue);
      // const specialCharPassword = specialCharRegExp.test(passwordInputValue);
      const minLengthPassword = minLengthRegExp.test(passwordInputValue);
      let errMsg = "";
      if (passwordLength === 0) {
        errMsg = "Password wajib diisi";
      } // else if (!uppercasePassword) {
      //   errMsg = "At least one Uppercase";
      // } else if (!lowercasePassword) {
      //   errMsg = "At least one Lowercase";
      // } else if (!digitsPassword) {
      //   errMsg = "At least one digit";
      // } else if (!specialCharPassword) {
      //   errMsg = "At least one Special Characters";
      // }
      else if (!minLengthPassword) {
        errMsg = "Panjang password minimal 8 karakter!";
      } else {
        errMsg = "";
      }
      setPasswordErr(errMsg);
    }
    // for confirm password
    if (
      passwordInputFieldName === "password_confirmation" ||
      (passwordInputFieldName === "password" &&
        newUser.password_confirmation.length > 0)
    ) {
      if (newUser.password_confirmation !== newUser.password) {
        setConfirmPasswordError("Password tidak sama!");
      } else {
        setConfirmPasswordError("");
      }
    }
  };

  const auth = useAuthUser();
  if (localStorage.getItem("token") && auth()) {
    return (
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
                    title={"Tambah Data Pengguna Baru"}
                    parentLink={"/data-pengguna"}
                  />
                ))}
              </Col>
            </Row>
            {/* NAVBAR */}
            <main className="min-vh-100 px-2 mt-4">
              <Row>
                <Col>
                  <Card>
                    <Form>
                      <Card.Title className="fs-4 p-4 mb-4 fw-semibold color-primary">
                        Silahkan Tambahkan Pengguna Baru Disini
                      </Card.Title>
                      <Card.Body className="p-0">
                        <Container>
                          <Container>
                            <Row>
                              <Col>
                                <Form.Group className="mb-3">
                                  <Form.Label>NIP</Form.Label>
                                  <Form.Control
                                    required
                                    className="input form-custom"
                                    type="number"
                                    onChange={(e) =>
                                      setNewUser({
                                        ...newUser,
                                        nip: e.target.value,
                                      })
                                    }
                                  />
                                </Form.Group>
                              </Col>
                              <Col>
                                <Form.Group className="mb-3">
                                  <Form.Label>Email</Form.Label>
                                  <Form.Control
                                    required
                                    className="input form-custom"
                                    type="email"
                                    onChange={(e) =>
                                      setNewUser({
                                        ...newUser,
                                        email: e.target.value,
                                      })
                                    }
                                  />
                                </Form.Group>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <Form.Group className="mb-3">
                                  <Form.Label>Nama</Form.Label>
                                  <Form.Control
                                    required
                                    className="input form-custom"
                                    type="text"
                                    onChange={(e) =>
                                      setNewUser({
                                        ...newUser,
                                        name: e.target.value,
                                      })
                                    }
                                  />
                                </Form.Group>
                              </Col>
                              <Col>
                                <Form.Group className="mb-3">
                                  <Form.Label>Unit Kerja</Form.Label>
                                  <Form.Select
                                    required
                                    style={{
                                      backgroundColor: "#F5F7FC",
                                      border: "none",
                                      padding: "17px",
                                    }}
                                    aria-label="Default select example"
                                    onChange={(e) =>
                                      setNewUser({
                                        ...newUser,
                                        unit_id: e.target.value,
                                      })
                                    }
                                  >
                                    <option>-- Pilih Unit Kerja --</option>
                                    {jobsData?.map((jobunits) => (
                                      <option
                                        key={jobunits.unit_id}
                                        value={jobunits.unit_id}
                                      >
                                        {jobunits.name}
                                      </option>
                                    ))}
                                  </Form.Select>
                                </Form.Group>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <Form.Group className="mb-3">
                                  <Form.Label>Telepon</Form.Label>
                                  <Form.Control
                                    required
                                    className="input form-custom"
                                    type="number"
                                    onChange={(e) =>
                                      setNewUser({
                                        ...newUser,
                                        phone: e.target.value,
                                      })
                                    }
                                  />
                                </Form.Group>
                              </Col>
                              <Col>
                                <Form.Group className="mb-3">
                                  <Form.Label>Peran</Form.Label>
                                  <Form.Select
                                    required
                                    style={{
                                      backgroundColor: "#F5F7FC",
                                      border: "none",
                                      padding: "17px",
                                    }}
                                    aria-label="Default select example"
                                    onChange={(e) =>
                                      setNewUser({
                                        ...newUser,
                                        role_id: e.target.value,
                                      })
                                    }
                                  >
                                    <option>-- Pilih Peran --</option>
                                    {rolesData?.map((roles) => {
                                      return roles.level != 1 ? (
                                        <option
                                          key={roles.role_id}
                                          value={roles.role_id}
                                        >
                                          {roles.name} - Level {roles.level}
                                        </option>
                                      ) : null;
                                    })}
                                  </Form.Select>
                                </Form.Group>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <Form.Group className="mb-3">
                                  <PasswordInputField
                                    isRequired={"required"}
                                    handlePasswordChange={handlePasswordChange}
                                    handleValidation={handleValidation}
                                    passwordValue={newUser.password}
                                    passwordError={passwordError}
                                  />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                  <ConfirmPasswordInputField
                                    isRequired={"required"}
                                    handlePasswordChange={handlePasswordChange}
                                    handleValidation={handleValidation}
                                    confirmPasswordValue={
                                      newUser.password_confirmation
                                    }
                                    confirmPasswordError={confirmPasswordError}
                                  />
                                </Form.Group>
                              </Col>
                              <Col>
                                <Form.Group className="mb-3">
                                  <Form.Label>Alamat</Form.Label>
                                  <Form.Control
                                    as="textarea"
                                    rows={3}
                                    style={{
                                      backgroundColor: "#F5F7FC",
                                      border: "none",
                                    }}
                                    onChange={(e) =>
                                      setNewUser({
                                        ...newUser,
                                        address: e.target.value,
                                      })
                                    }
                                  ></Form.Control>
                                </Form.Group>
                              </Col>
                            </Row>
                          </Container>
                        </Container>
                      </Card.Body>
                      <Card.Footer>
                        <Button
                          className="btn-post"
                          onClick={postNewUser}
                          type="submit"
                        >
                          Tambah
                        </Button>
                      </Card.Footer>
                    </Form>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Footer />
                </Col>
              </Row>
            </main>
          </Col>
        </Row>
      </Container>
    );
  } else {
    return <Navigate to="/silakend-login" />;
  }
};
