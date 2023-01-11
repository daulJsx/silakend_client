import React, { useState } from "react";

// Login mechanism requirements
import { useSignIn } from "react-auth-kit";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// get current user auth data
import { useAuthUser } from "react-auth-kit";

// React Notification
import swal from "sweetalert";

// React-bootstrap
import { Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// components
import { Footer } from "../../components/footer/Footer";

// Icons
import { BsFillEyeFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons/bs";

// Custom CSS
import "./login.css";

// assets
import polmanLogo from "./../../assets/polman.webp";

export const Login = (props) => {
  const signIn = useSignIn();
  const [loginForm, setLoginForm] = useState({ nip: "", password: "" });
  const navigate = useNavigate();
  const auth = useAuthUser();

  const onSubmit = async (e) => {
    e.preventDefault();
    // perform login logic
    try {
      if (loginForm.nip !== "" && loginForm.password !== "") {
        await axios
          .post("https://silakend-server.xyz/api/auth/login", loginForm) //Request to server
          .then((response) => {
            if (response.status === 200) {
              if (
                signIn({
                  token: response.data.content.access_token, // asign token to auth package
                  expiresIn: 1000, // expires token in
                  tokenType: "Bearer", // type of token
                  authState: response.data.content, // asign user datas to auth package
                })
              ) {
                localStorage.setItem(
                  "token",
                  response.data.content.access_token
                ); // asign token to local storage
                localStorage.setItem(
                  "username",
                  response.data.content.username
                ); // asign username to local storage
                localStorage.setItem(
                  "userLevel",
                  response.data.content.user_level
                ); // asign user level to local storage
                const userName = localStorage.getItem("username");
                const greetToUser = swal({
                  title: response.data.msg,
                  text: "Anda sebagai " + userName,
                  icon: "success",
                }); // notify user
                const userRole = response.data.content.user_level; // access user level for RBAC

                // Perform RBAC logic
                if (userRole === 1) {
                  navigate("/");
                  greetToUser();
                } else {
                  navigate("/user/data-pengajuan-peminjaman");
                  greetToUser();
                }
              }
            }
          });
      } else {
        swal({
          title: "Peringatan",
          text: "Harap isi semua kredensial!",
          icon: "warning",
          button: "Tutup",
        });
      }
    } catch (error) {
      const { message } = error.response.data;
      const { msg } = error.response.data;
      if (error) {
        if (message) {
          swal("Ups!", message, "error");
        } else {
          swal("Ups!", msg, "error");
        }
      }
    }
  };

  // Show/ hide password value
  const [isVisible, setVisible] = useState(false);

  const toggle = () => {
    setVisible(!isVisible);
  };

  return (
    <>
      <Container fluid className="main-container">
        <Row className="main-row min-vh-100 ">
          <Col className="logo-side2 d-none d-lg-block">
            <div className="d-flex flex-column align-items-center justify-content-center">
              <img
                src={polmanLogo}
                alt="Polman Logo"
                className="--polman-logo"
              />
              <div className="text-center color-primary fs-4 fw-bold py-4 px-5">
                Sistem Layanan Kendaraan <br /> Politeknik Manufaktur Bandung
              </div>
            </div>
          </Col>
          <Col>
            <Container className="mt-5">
              <Row>
                <Col className="p-5 mt-4">
                  <div className="d-sm-block d-lg-none mb-3">
                    <img
                      src={polmanLogo}
                      alt="Polman Logo"
                      className="polman-logo"
                    />
                    <span className="color-primary ms-2 fw-bold fs-5 ">
                      SiLaKend
                    </span>
                  </div>
                  <div className="greeting fs-4 fw-semibold ">
                    <span className="color-primary me-1">Hi,</span> Selamat
                    Datang
                  </div>
                  <div className="credential fw-semibold ">
                    Masukkan kredensial Anda untuk melanjutkan
                  </div>

                  <Form
                    className="mt-3 d-flex flex-column gap-4 py-4 mt-4"
                    onSubmit={onSubmit}
                  >
                    <Form.Group className="form-floating">
                      <input
                        name="nip"
                        required
                        type={"number"}
                        className="form-control form-login"
                        id="floatingInput"
                        placeholder="NIP"
                        onChange={(e) =>
                          setLoginForm({ ...loginForm, nip: e.target.value })
                        }
                      />
                      <label htmlFor="floatingInput">NIP</label>
                    </Form.Group>
                    <Form.Group
                      className="mb-3 form-floating"
                      controlId="formBasicPassword"
                    >
                      <input
                        type={!isVisible ? "password" : "text"}
                        {...props}
                        required
                        name="password"
                        className="form-control form-login"
                        id="floatingPassword"
                        placeholder="Password"
                        onChange={(e) =>
                          setLoginForm({
                            ...loginForm,
                            password: e.target.value,
                          })
                        }
                      />
                      <label htmlFor="floatingPassword">Password</label>
                      <i className="eye-icon fs-5" onClick={toggle}>
                        {isVisible ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
                      </i>
                    </Form.Group>
                    <Button
                      className="w-100 btn-submit p-3"
                      variant="primary"
                      type="submit"
                      onClick={onSubmit}
                    >
                      <div className="btn-text fw-bold">Log In</div>
                    </Button>

                    <div className="text-question fw-semibold">
                      {/* Belum Punya Akun ?
                    <a className="color-primary fw-semibold text-decoration-none ms-1">
                      Register
                    </a> */}
                    </div>
                  </Form>
                </Col>
              </Row>
            </Container>
            <Footer />
          </Col>
        </Row>
      </Container>
    </>
  );
};
