import React, { useState } from "react";

// Login mechanism requirements
import { useSignIn } from "react-auth-kit";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

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

  const onSubmit = async (e) => {
    e.preventDefault();

    if (loginForm.nip !== "" && loginForm.password !== "") {
      try {
        const response = await axios.post(
          "https://silakend-server.xyz/api/auth/login",
          loginForm
        );
        const { access_token, user_name, user_level } = response.data.content;
        if (
          signIn({
            token: access_token,
            expiresIn: 1000,
            tokenType: "Bearer",
            authState: response.data.content,
          })
        ) {
          // Store token in a http-only and secure cookie
          Cookies.set("token", access_token, { secure: true });

          //notify user
          swal({
            title: response.data.msg,
            text: "Selamat Datang " + user_name,
            icon: "success",
          });

          // Perform RBAC logic
          if (user_level === 1) {
            navigate("/");
          } else {
            navigate("/user/data-pengajuan-peminjaman");
          }
        }
      } catch (error) {
        console.log(error.response.data);
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
      swal({
        title: "Peringatan",
        text: "Harap isi semua kredensial!",
        icon: "warning",
        button: "Tutup",
      });
    }
  };

  // Show/ hide password value
  const [isVisible, setVisible] = useState(false);

  const toggle = () => {
    setVisible(!isVisible);
  };

  return (
    <Container fluid className="main-container">
      <Row className="main-row min-vh-100 ">
        <Col className="logo-side2 d-none d-lg-block">
          <div className="d-flex flex-column align-items-center justify-content-center">
            <img src={polmanLogo} alt="Polman Logo" className="--polman-logo" />
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
                  <span className="color-primary me-1">Hi,</span> Selamat Datang
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
                    onClick={(e) => onSubmit(e)}
                  >
                    <div className="btn-text fw-bold">Log In</div>
                  </Button>

                  <div className="text-question fw-semibold"></div>
                </Form>
              </Col>
            </Row>
          </Container>
          <Footer />
        </Col>
      </Row>
    </Container>
  );
};
