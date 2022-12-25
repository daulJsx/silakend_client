import React, { useState } from "react";

// Axios
import axios from "axios";

// Fetch Requirements
import { useQuery } from "react-query";
import FetchJobUnits from "../../consAPI/FetchJobUnits";
import FetchRoles from "../../consAPI/FetchRoles";

// Secured the page
import { useIsAuthenticated } from "react-auth-kit";
import { redirect } from "react-router-dom";

// React Notification
import swal from "sweetalert";

// Redirecting
import { useNavigate } from "react-router-dom";

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

export const CreateUser = () => {
  // Navigating
  const navigate = useNavigate();

  // Fetch job units and roles data
  const { data: jobsData } = useQuery("jobunits", FetchJobUnits);
  const { data: rolesData } = useQuery("roles", FetchRoles);

  // Body for store
  const [userData, setUserData] = useState({
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
  const postNewUser = async () => {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    if (
      userData.nip ||
      userData.name ||
      userData.address ||
      userData.phone ||
      userData.email ||
      userData.unit_id ||
      userData.role_id !== ""
    ) {
      try {
        await axios
          .post("http://silakend-server.xyz/api/users/", userData, config)
          .then((response) => {
            if (response.status === 200) {
              navigate("/data-user");
              swal({
                title: "Berhasil!",
                text: "User Ditambahkan",
                icon: "success",
                button: "Tutup",
              });
            }
          });
      } catch (error) {
        const e = swal({
          title: "Gagal!",
          text: "Error harap dilaporkan!",
          icon: "error",
          button: "Tutup",
        });
        throw e;
      }
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
      ...userData,
      [passwordInputFieldName]: passwordInputValue,
    };
    setUserData(NewPasswordInput);
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
        userData.password_confirmation.length > 0)
    ) {
      if (userData.password_confirmation !== userData.password) {
        setConfirmPasswordError("Password tidak sama!");
      } else {
        setConfirmPasswordError("");
      }
    }
  };
  if (useIsAuthenticated()) {
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
            <Container fluid>
              <Row>
                <Col>
                  <main className="min-vh-100">
                    <Card>
                      <Card.Title className="fs-4 color-primary p-4">
                        Silahkan Tambahkan Pengguna Baru Disini
                      </Card.Title>
                      <Card.Body className="p-0">
                        <Container>
                          <Form>
                            <Container>
                              <Row>
                                <Col>
                                  <Form.Group className="mb-3 form-floating">
                                    <Form.Control
                                      required
                                      className="input form-custom"
                                      name="nip"
                                      type="number"
                                      id="nip"
                                      placeholder="NIP"
                                      onChange={(e) =>
                                        setUserData({
                                          ...userData,
                                          nip: e.target.value,
                                        })
                                      }
                                    />
                                    <Form.Label
                                      className="color-primary"
                                      for="nip"
                                    >
                                      NIP
                                    </Form.Label>
                                  </Form.Group>
                                </Col>
                                <Col>
                                  <Form.Group className="mb-3 form-floating">
                                    <Form.Control
                                      required
                                      className="input form-custom"
                                      name="email"
                                      type="email"
                                      id="email"
                                      placeholder="Email"
                                      onChange={(e) =>
                                        setUserData({
                                          ...userData,
                                          email: e.target.value,
                                        })
                                      }
                                    />
                                    <Form.Label
                                      className="color-primary"
                                      for="email"
                                    >
                                      Email
                                    </Form.Label>
                                  </Form.Group>
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <Form.Group className="mb-3 form-floating">
                                    <Form.Control
                                      required
                                      className="input form-custom"
                                      name="name"
                                      type="text"
                                      id="name"
                                      placeholder="Nama"
                                      onChange={(e) =>
                                        setUserData({
                                          ...userData,
                                          name: e.target.value,
                                        })
                                      }
                                    />
                                    <Form.Label
                                      className="color-primary"
                                      for="name"
                                    >
                                      Nama
                                    </Form.Label>
                                  </Form.Group>
                                </Col>
                                <Col>
                                  <Form.Group className="mb-3">
                                    <Form.Select
                                      required
                                      style={{
                                        backgroundColor: "#F5F7FC",
                                        border: "none",
                                        padding: "17px",
                                      }}
                                      aria-label="Default select example"
                                      onChange={(e) =>
                                        setUserData({
                                          ...userData,
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
                                  <Form.Group className="mb-3 form-floating">
                                    <Form.Control
                                      required
                                      className="input form-custom"
                                      name="phone"
                                      type="number"
                                      id="phone"
                                      placeholder="Telepon"
                                      onChange={(e) =>
                                        setUserData({
                                          ...userData,
                                          phone: e.target.value,
                                        })
                                      }
                                    />
                                    <Form.Label
                                      className="color-primary"
                                      for="phone"
                                    >
                                      Telepon
                                    </Form.Label>
                                  </Form.Group>
                                </Col>
                                <Col>
                                  <Form.Group className="mb-3">
                                    <Form.Select
                                      required
                                      style={{
                                        backgroundColor: "#F5F7FC",
                                        border: "none",
                                        padding: "17px",
                                      }}
                                      aria-label="Default select example"
                                      onChange={(e) =>
                                        setUserData({
                                          ...userData,
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
                                  <PasswordInputField
                                    isRequired={"required"}
                                    handlePasswordChange={handlePasswordChange}
                                    handleValidation={handleValidation}
                                    passwordValue={userData.password}
                                    passwordError={passwordError}
                                  />
                                </Col>
                                <Col>
                                  <Form.Group className="mb-3 form-floating">
                                    <textarea
                                      style={{
                                        backgroundColor: "#F5F7FC",
                                        border: "none",
                                      }}
                                      className="textarea-custom form-control"
                                      rows={3}
                                      id="address"
                                      name="address"
                                      placeholder="Alamat"
                                      onChange={(e) =>
                                        setUserData({
                                          ...userData,
                                          address: e.target.value,
                                        })
                                      }
                                    ></textarea>

                                    <Form.Label
                                      className="color-primary"
                                      for="address"
                                    >
                                      Alamat
                                    </Form.Label>
                                  </Form.Group>
                                </Col>
                              </Row>

                              <Row>
                                <Col md={6}>
                                  <ConfirmPasswordInputField
                                    isRequired={"required"}
                                    handlePasswordChange={handlePasswordChange}
                                    handleValidation={handleValidation}
                                    confirmPasswordValue={
                                      userData.password_confirmation
                                    }
                                    confirmPasswordError={confirmPasswordError}
                                  />
                                </Col>
                              </Row>
                            </Container>
                          </Form>
                        </Container>
                      </Card.Body>
                      <Card.Footer>
                        <Container>
                          <Button
                            className="btn-post"
                            onClick={postNewUser}
                            type="submit"
                          >
                            Tambah
                          </Button>
                        </Container>
                      </Card.Footer>
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
    );
  } else {
    return redirect("/silakend-login");
  }
};