import React, { useState, useEffect } from "react";

// API Consume
import axios from "axios";
import { useQuery } from "react-query";
import FetchRoles from "../../consAPI/FetchRoles";

// Redirecting
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

// Icons
import { RiCloseFill } from "react-icons/ri";

// Bootstrap Components
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Table from "react-bootstrap/Table";

// Components
import { Aside } from "../../components/aside/Aside";
import { NavTop } from "../../components/navtop/NavTop";
import { Footer } from "../../components/footer/Footer";
import PasswordInputField from "../../components/passVal/PasswordInputField";
import ConfirmPasswordInputField from "../../components/passVal/ConfirmPasswordInputField";

// Icons
import { FaArrowLeft } from "react-icons/fa";

// React Notification
import swal from "sweetalert";

// CSS
import "../CustomStyles/users.css";

export const UpdateUser = () => {
  const navigate = useNavigate();

  // Update users data dynamically
  const [userId, setUserId] = useState(null);
  const [nip, setNip] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [unitId, setUnitId] = useState("");
  const [jobUnit, setJobUnit] = useState("");
  const [userPassword, setUserPassword] = useState({
    password: "",
    password_confirmation: "",
  });
  const [role, setRole] = useState([]);
  const [oldRole, setOldRole] = useState([]);

  const [tableRoles, setTableRoles] = useState([]);

  useEffect(() => {
    setUserId(localStorage.getItem("user_id"));
    setNip(localStorage.getItem("nip"));
    setName(localStorage.getItem("name"));
    setAddress(localStorage.getItem("address"));
    setPhone(localStorage.getItem("phone"));
    setEmail(localStorage.getItem("email"));
    setJobUnit(localStorage.getItem("job_unit"));
    setUnitId(localStorage.getItem("unit_id"));
    setOldRole(localStorage.getItem("oldRoleId"));
    var roleNow = JSON.parse(localStorage.getItem("role") || "");
    setRole(roleNow);
  }, []);

  const handleRoleChanges = async (event) => {
    const selectedRole = event.target.value;
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    const getRoleByIdApi = `https://silakend-server.xyz/api/roles/${selectedRole}`;
    const response = await axios
      .get(getRoleByIdApi, config)
      .then((response) => {
        const selectedRoleData = response.data;
        setTableRoles([...tableRoles, selectedRoleData]);
      });
  };

  const deleteRole = (id) => {
    const newRoles = tableRoles.filter(([row, index]) => index !== id);
    setTableRoles(newRoles);
  };
  // Update Function
  const body = {
    nip: nip,
    name: name,
    password: userPassword.password,
    password_confirmation: userPassword.password_confirmation,
    address: address,
    phone: phone,
    email: email,
    unit_id: unitId,
    newRoles: tableRoles.map(([newRoles]) => ({ role_id: newRoles.role_id })),
    role_id: oldRole,
  };

  const updateCurrentUser = async () => {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    swal({
      title: "Yakin?",
      text: "Jika anda mengganti peran pengguna ini, peran sebelumnya akan dihilangkan",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const response = await axios
          .put(`https://silakend-server.xyz/api/users/${userId}`, body, config)
          .then((response) => {
            if (response.status === 200) {
              navigate("/data-pengguna");
              swal({
                title: "Berhasil!",
                text: response.data.msg,
                icon: "success",
                button: "Tutup",
              });
            } else {
              swal({
                title: "Gagal!",
                text: response.data.msg,
                icon: "error",
                button: "Tutup",
              });
            }
          });
        return response;
      } else {
        swal("Data pengguna aman!");
      }
    });
  };

  // Fetch job units and roles data
  const { data: rolesData } = useQuery("roles", FetchRoles);

  // Password confirmation logic
  const [passwordError, setPasswordErr] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handlePasswordChange = (e) => {
    const passwordInputValue = e.target.value.trim();
    const passwordInputFieldName = e.target.name;
    const NewPasswordInput = {
      ...userPassword,
      [passwordInputFieldName]: passwordInputValue,
    };
    setUserPassword(NewPasswordInput);
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
        userPassword.password_confirmation.length > 0)
    ) {
      if (userPassword.password_confirmation !== userPassword.password) {
        setConfirmPasswordError("Password tidak sama!");
      } else {
        setConfirmPasswordError("");
      }
    }
  };

  if (localStorage.getItem("token")) {
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
                    parentLink={"/data-pengguna"}
                    title={"Rincian Dan Edit Data Pengguna"}
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
                        <Card.Title className="fs-4 p-4 color-primary">
                          Edit Data Pengguna Disini
                        </Card.Title>

                        <Container>
                          <Form>
                            <Container>
                              <Row>
                                <Col>
                                  <Form.Group className="mb-3 form-floating">
                                    <Form.Control
                                      required
                                      value={nip}
                                      className="input form-custom"
                                      name="nip"
                                      type="number"
                                      id="nip"
                                      placeholder="NIP"
                                      onChange={(e) => setNip(e.target.value)}
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
                                      value={email}
                                      className="input form-custom"
                                      name="email"
                                      type="email"
                                      id="email"
                                      placeholder="Email"
                                      onChange={(e) => setEmail(e.target.value)}
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
                                      value={name}
                                      className="input form-custom"
                                      name="name"
                                      type="text"
                                      id="name"
                                      placeholder="Nama"
                                      onChange={(e) => setName(e.target.value)}
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
                                  <Form.Group className="mb-3 form-floating">
                                    <textarea
                                      value={address}
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
                                        setAddress(e.target.value)
                                      }
                                    >
                                      {address}
                                    </textarea>

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
                                <Col>
                                  <Form.Group className="mb-3 form-floating">
                                    <Form.Control
                                      required
                                      value={phone}
                                      className="input form-custom"
                                      name="phone"
                                      type="number"
                                      id="phone"
                                      placeholder="Telepon"
                                      onChange={(e) => setPhone(e.target.value)}
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
                                  <Form.Group className="mb-3 form-floating">
                                    <Form.Control
                                      disabled
                                      value={jobUnit}
                                      type="text"
                                      id="jobunit"
                                      placeholder="Unit Kerja"
                                    />
                                    <Form.Label
                                      for="jobunit"
                                      className="color-primary"
                                    >
                                      Unit kerja
                                    </Form.Label>
                                  </Form.Group>
                                </Col>
                              </Row>
                              <Row>
                                <Container>
                                  <Alert variant="primary">
                                    <Alert.Heading className="p-2 fs-6">
                                      Pilih peran baru untuk pengguna
                                    </Alert.Heading>
                                    <Col>
                                      <Form.Group>
                                        <Form.Select
                                          id="roleSelect"
                                          onChange={handleRoleChanges}
                                          required
                                          style={{
                                            backgroundColor: "#F5F7FC",
                                            border: "none",
                                            padding: "17px",
                                            marginBottom: "10px",
                                          }}
                                          aria-label="Default select example"
                                        >
                                          <option>
                                            -- Pilih Peran Baru --
                                          </option>

                                          {rolesData?.map((roles) => {
                                            return roles.level != 1 &&
                                              oldRole != [roles.role_id] ? (
                                              <option
                                                key={roles.role_id}
                                                value={roles.role_id}
                                              >
                                                {roles.name}
                                              </option>
                                            ) : null;
                                          })}
                                        </Form.Select>

                                        {/* <Button onClick={AddNewRoleToTable}>
                                          Tambahkan Peran
                                        </Button> */}
                                      </Form.Group>
                                    </Col>
                                  </Alert>
                                </Container>
                              </Row>
                              <Row>
                                <Col>
                                  <Form.Group className="mb-3">
                                    <Form.Label className="color-primary">
                                      Peran Saat Ini
                                    </Form.Label>
                                    <Table responsive bordered>
                                      <thead>
                                        <tr>
                                          <th>Peran saat ini</th>
                                          <th>Hapus peran</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {role.map((rolesNow, index) => {
                                          return (
                                            <>
                                              <tr key={index}>
                                                <td>{rolesNow.name}</td>

                                                <td></td>
                                              </tr>
                                            </>
                                          );
                                        })}
                                        {tableRoles.map(([newRoles, index]) => {
                                          return (
                                            <tr key={index}>
                                              <td>{newRoles.name}</td>
                                              <td>
                                                <Button
                                                  onClick={() =>
                                                    deleteRole(index)
                                                  }
                                                  className="btn-sm btn-danger"
                                                >
                                                  <RiCloseFill className="fs-3" />
                                                </Button>
                                              </td>
                                            </tr>
                                          );
                                        })}
                                      </tbody>
                                    </Table>
                                  </Form.Group>
                                </Col>
                              </Row>

                              <Row>
                                <Col>
                                  <Alert
                                    variant="secondary"
                                    className="alert-custom col-md-6"
                                  >
                                    <Alert.Heading className="p-2 fs-6">
                                      Bagian Ini dapat dikosongkan
                                    </Alert.Heading>
                                    <Row>
                                      <Col>
                                        <PasswordInputField
                                          handlePasswordChange={
                                            handlePasswordChange
                                          }
                                          handleValidation={handleValidation}
                                          passwordValue={userPassword.password}
                                          passwordError={passwordError}
                                        />
                                      </Col>
                                    </Row>

                                    <Row>
                                      <Col>
                                        <ConfirmPasswordInputField
                                          handlePasswordChange={
                                            handlePasswordChange
                                          }
                                          handleValidation={handleValidation}
                                          confirmPasswordValue={
                                            userPassword.password_confirmation
                                          }
                                          confirmPasswordError={
                                            confirmPasswordError
                                          }
                                        />
                                      </Col>
                                    </Row>
                                  </Alert>
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
                            type="submit"
                            onClick={updateCurrentUser}
                          >
                            Simpan
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
    return <Navigate to="/silakend-login" />;
  }
};
