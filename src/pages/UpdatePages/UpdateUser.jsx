import React, { useState, useEffect } from "react";

// Cookies JS
import Cookies from "js-cookie";

// API Consume
import axios from "axios";
import { useQuery } from "react-query";
import FetchRoles from "../../consAPI/FetchRoles";
import FetchJobUnits from "../../consAPI/FetchJobUnits";

// Functions
import { SecuringPage } from "../../functions/Securing/SecuringPage";

// Redirecting
import { useNavigate, Navigate, NavLink } from "react-router-dom";

// Icons
import { RiCloseFill } from "react-icons/ri";

// Bootstrap Components
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Table from "react-bootstrap/Table";
import Breadcrumb from "react-bootstrap/Breadcrumb";

// Components
import { Aside } from "../../components/aside/Aside";
import { NavTop } from "../../components/navtop/NavTop";
import { Footer } from "../../components/footer/Footer";
import PasswordInputField from "../../components/passVal/PasswordInputField";
import ConfirmPasswordInputField from "../../components/passVal/ConfirmPasswordInputField";

// Icons
import { FaArrowLeft } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import { TbUsers } from "react-icons/tb";

// React Notification
import swal from "sweetalert";

// For checking user have done in authentication
import { useAuthUser } from "react-auth-kit";

export const UpdateUser = () => {
  // Get access token
  const token = Cookies.get("token");

  const navigate = useNavigate();
  const auth = useAuthUser();

  // Update users data dynamically
  const [userId, setUserId] = useState("");
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
    if (localStorage.getItem("role")) {
      var roleNow = JSON.parse(localStorage.getItem("role") || "");
      setRole(roleNow);
    }
  }, []);

  const handleRoleChanges = async (event) => {
    const selectedRole = event.target.value;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const getRoleByIdApi = `http://silakend-server-realtime.test/api/roles/${selectedRole}`;
    const response = await axios
      .get(getRoleByIdApi, config)
      .then((response) => {
        const selectedRoleData = response.data;
        setTableRoles([...tableRoles, selectedRoleData]);
      });
  };

  const deleteRole = (id) => {
    const newRoles = tableRoles.filter(([row, index]) => row.role_id !== id);
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

  const updateCurrentUser = async (e) => {
    e.preventDefault();
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    swal({
      title: "Yakin?",
      text: "Jika anda mengganti peran pengguna ini, peran sebelumnya akan dihilangkan",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          await axios
            .put(
              `http://silakend-server-realtime.test/api/users/${userId}`,
              body,
              config
            )
            .then((response) => {
              if (response.status === 200) {
                const { msg } = response.data;
                navigate(-1);
                swal({
                  title: "Berhasil!",
                  text: msg,
                  icon: "success",
                  button: false,
                  timer: 2000,
                });
              }
            });
        } catch (error) {
          if (error.response) {
            const { message, msg } = error.response.data;
            if (message) {
              swal("Ups!", message, "error");
            } else {
              swal("Ups!", msg, "error");
            }
          } else {
            swal("Ups!", "Something went wrong", "error");
          }
        }
      } else {
        swal("Data pengguna aman!");
      }
    });
  };

  // Fetch job units and roles data
  const { data: rolesData } = useQuery("roles", FetchRoles);
  const { data: jobsData } = useQuery("jobunits", FetchJobUnits);

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

  return token ? (
    auth().user_level === 1 ? (
      localStorage.getItem("user_id") ? (
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
                      title={"Edit Data Pengguna"}
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
                          <Row className="gap-3 mt-4">
                            <Col>
                              <h3 className="main__title">Data Pengguna</h3>
                              <Breadcrumb className="breadcrumb__item mt-3">
                                <Breadcrumb.Item className="breadcrumb__item">
                                  <div className="d-flex justify-content-center align-items-center gap-2">
                                    <NavLink
                                      to={"/data-pengguna"}
                                      className="d-flex justify-content-center align-items-center text-muted gap-2"
                                    >
                                      <TbUsers className="fs-5" />
                                      Data
                                    </NavLink>

                                    <FiChevronRight className="fs-6 breadcrumb__divider" />
                                    <span className="color-primary">
                                      Edit Pengguna
                                    </span>
                                  </div>
                                </Breadcrumb.Item>
                              </Breadcrumb>
                            </Col>
                          </Row>
                        </Container>
                      </Card.Header>

                      <Card.Body className="p-4">
                        <Container
                          className="p-4"
                          style={{ background: "#fff", borderRadius: "10px" }}
                        >
                          <Form onSubmit={updateCurrentUser}>
                            <Form.Group className="mb-3">
                              <Form.Label>NIP</Form.Label>
                              <Form.Control
                                required
                                value={nip}
                                className="input form-custom"
                                type="number"
                                onChange={(e) => setNip(e.target.value)}
                              />
                            </Form.Group>
                            <Form.Group className="mb-3">
                              <Form.Label>Email</Form.Label>
                              <Form.Control
                                required
                                value={email}
                                className="input form-custom"
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                              />
                            </Form.Group>
                            <Form.Group className="mb-3 ">
                              <Form.Label>Nama</Form.Label>
                              <Form.Control
                                required
                                value={name}
                                className="input form-custom"
                                type="text"
                                placeholder="Nama"
                                onChange={(e) => setName(e.target.value)}
                              />
                            </Form.Group>
                            <Form.Group className="mb-3">
                              <Form.Label>Telepon</Form.Label>
                              <Form.Control
                                required
                                value={phone}
                                className="input form-custom"
                                type="number"
                                placeholder="Telepon"
                                onChange={(e) => setPhone(e.target.value)}
                              />
                            </Form.Group>
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
                                onChange={(e) => setUnitId(e.target.value)}
                              >
                                <option>{jobUnit}</option>
                                {jobsData?.map((jobunits) => {
                                  return jobunits.name != jobUnit ? (
                                    <option
                                      key={jobunits.unit_id}
                                      value={jobunits.unit_id}
                                    >
                                      {jobunits.name}
                                    </option>
                                  ) : null;
                                })}
                              </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                              <Form.Label>Alamat</Form.Label>
                              <Form.Control
                                as="textarea"
                                rows={3}
                                style={{
                                  backgroundColor: "#F5F7FC",
                                  border: "none",
                                  padding: "15px",
                                }}
                                type="text"
                                value={address}
                                className="input form-custom"
                                onChange={(e) => setAddress(e.target.value)}
                              />
                            </Form.Group>
                            <Alert className="alert__outlinePrimary p-4">
                              <Alert.Heading className="fs-6 mb-3">
                                Tambah peran baru untuk pengguna
                              </Alert.Heading>

                              <Form.Group>
                                <Form.Select
                                  id="roleSelect"
                                  onChange={handleRoleChanges}
                                  required
                                  style={{
                                    backgroundColor: "#fff",
                                    border: "none",
                                    padding: "17px",
                                    marginBottom: "10px",
                                  }}
                                  aria-label="Default select example"
                                >
                                  <option>-- Pilih Peran Baru --</option>

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
                            </Alert>
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
                                              deleteRole(newRoles.role_id)
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
                            <Card>
                              <Container>
                                <Card.Title className="mt-4 ms-3 fs-6">
                                  Bagian Ini dapat dikosongkan
                                </Card.Title>
                                <Card.Body>
                                  <PasswordInputField
                                    handlePasswordChange={handlePasswordChange}
                                    handleValidation={handleValidation}
                                    passwordValue={userPassword.password}
                                    passwordError={passwordError}
                                  />

                                  <ConfirmPasswordInputField
                                    handlePasswordChange={handlePasswordChange}
                                    handleValidation={handleValidation}
                                    confirmPasswordValue={
                                      userPassword.password_confirmation
                                    }
                                    confirmPasswordError={confirmPasswordError}
                                  />
                                </Card.Body>
                              </Container>
                            </Card>
                            <Form.Group className="mt-4">
                              <Button
                                className="btn-post"
                                onClick={updateCurrentUser}
                                type="submit"
                              >
                                Simpan
                              </Button>
                            </Form.Group>
                          </Form>
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
      ) : (
        <Navigate to="/data-pengguna" />
      )
    ) : (
      SecuringPage()
    )
  ) : (
    <Navigate to="/silakend-login" />
  );
};
