import React from "react";

// Login mechanism requirements
import { useSignIn } from "react-auth-kit";
import axios from "axios";

// React-bootstrap
import { Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// components
import { Footer } from "../../components/footer/Footer";

// Custom CSS
import "./login.css";

// assets
import polmanLogo from "./../../assets/polman.webp";

export const Login = () => {
  const signIn = useSignIn();
  const [formData, setFormData] = React.useState({ nip: "", password: "" });

  const onSubmit = (e) => {
    e.preventDefault();
    try {
      axios
        .post("https://8334-114-122-104-243.ap.ngrok.io/api/login", formData)
        .then((res) => {
          if (res.status === 200) {
            if (
              signIn({
                token: res.data.token,
                expiresIn: res.data.expiresIn,
                tokenType: "Bearer",
                authState: res.data.authUserState,
                refreshToken: res.data.refreshToken, // Only if using refreshToken feature
                refreshTokenExpireIn: res.data.refreshTokenExpireIn, // Only if using refreshToken feature
              })
            ) {
              // Only if using refreshToken feature
              // Redirect or do-something
              console.log(res.data.msg);
            } else {
              //Throw error
              console.log(res.data.msg);
            }
          }
        });
    } catch (err) {
      console.log(err.res.data.errors);
    }
  };

  return (
    <Container fluid className="main-container">
      <Row className="main-row min-vh-100">
        <Col className="logo-side2 text-center d-none d-lg-block">
          <img src={polmanLogo} alt="Polman Logo" className="--polman-logo" />
          <div className="logo-text color-primary fs-4 fw-bold py-4 px-5">
            Sistem Layanan Kendaraan <br /> Politeknik Manufaktur Bandung
          </div>
        </Col>
        <Col className="mt-3">
          <Container className="mt-5">
            <Row>
              <Col className="p-5">
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
                      type="number"
                      class="form-control"
                      id="floatingInput"
                      placeholder="NIP"
                      onChange={(e) =>
                        setFormData({ ...formData, nip: e.target.value })
                      }
                    />
                    <label for="floatingInput">NIP</label>
                  </Form.Group>

                  <Form.Group
                    className="mb-3 form-floating"
                    controlId="formBasicPassword"
                  >
                    <input
                      type="password"
                      class="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                    <label for="floatingPassword">Password</label>
                  </Form.Group>

                  <Button
                    className="w-100 btn-submit p-3"
                    variant="primary"
                    type="submit"
                  >
                    <div className="btn-text">Login</div>
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
  );
};
