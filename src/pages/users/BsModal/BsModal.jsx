import React, { useState } from "react";
import axios from "axios";

// Bootstrap
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Container, Row, Col } from "react-bootstrap";

// Components
import ConfirmPasswordInputField from "../passVal/ConfirmPasswordInputField";
import PasswordInputField from "../passVal/PasswordInputField";

// Fetch Requirements
import { useQuery } from "react-query";
import fetchJobUnits from "../../consAPI/FetchJobUnits";
import fetchRoles from "../../consAPI/FetchRoles";

// CSS
import "./BsModal.css";

// Body
export const BsModal = (props) => {
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
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  // Post
  const postData = () => {
    try {
      console.log(config);
      console.log(userData);
      axios
        .post(
          "https://68e1-180-244-132-214.ap.ngrok.io/api/users",
          userData,
          config
        )
        .then((response) => {
          console.log(response);
        });
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch job units and roles data
  const { data: jobsData } = useQuery("jobunits", fetchJobUnits);
  const { data: rolesData } = useQuery("roles", fetchRoles);

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

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="modalCustom px-5">
        <div className="fs-5 fw-semibold color-primary p-3 text-center">
          Tambahkan User Baru Disini
        </div>
        <Form>
          <Form.Group className="mb-3 form-floating">
            <Form.Control
              className="inputNumber"
              name="nip"
              type="number"
              id="nip"
              placeholder="NIP"
              onChange={(e) =>
                setUserData({ ...userData, nip: e.target.value })
              }
            />
            <Form.Label className="color-primary" for="nip">
              NIP
            </Form.Label>
          </Form.Group>

          <Form.Group className="mb-3 form-floating">
            <Form.Control
              name="name"
              type="text"
              id="name"
              placeholder="Nama"
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            />
            <Form.Label className="color-primary" for="name">
              Nama
            </Form.Label>
          </Form.Group>

          <PasswordInputField
            handlePasswordChange={handlePasswordChange}
            handleValidation={handleValidation}
            passwordValue={userData.password}
            passwordError={passwordError}
          />
          <ConfirmPasswordInputField
            handlePasswordChange={handlePasswordChange}
            handleValidation={handleValidation}
            confirmPasswordValue={userData.password_confirmation}
            confirmPasswordError={confirmPasswordError}
          />

          <Form.Group className="mb-3 form-floating">
            <Form.Control
              as="textarea"
              rows={3}
              id="address"
              name="address"
              placeholder="Alamat"
              onChange={(e) =>
                setUserData({ ...userData, address: e.target.value })
              }
            />
            <Form.Label className="color-primary" for="address">
              Alamat
            </Form.Label>
          </Form.Group>

          <Form.Group className="mb-3 form-floating">
            <Form.Control
              name="phone"
              type="number"
              id="phone"
              placeholder="Telepon"
              onChange={(e) =>
                setUserData({ ...userData, phone: e.target.value })
              }
            />
            <Form.Label className="color-primary" for="phone">
              Telepon
            </Form.Label>
          </Form.Group>

          <Form.Group className="mb-3 form-floating">
            <Form.Control
              name="email"
              type="email"
              id="email"
              placeholder="Email"
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
            <Form.Label className="color-primary" for="email">
              Email
            </Form.Label>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Select
              aria-label="Default select example"
              onChange={(e) =>
                setUserData({ ...userData, unit_id: e.target.value })
              }
            >
              <option>-- Pilih Unit Kerja --</option>
              {jobsData?.data.map((jobunits) => (
                <option key={jobunits.unit_id} value={jobunits.unit_id}>
                  {jobunits.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Select
              aria-label="Default select example"
              onChange={(e) =>
                setUserData({ ...userData, role_id: e.target.value })
              }
            >
              <option>-- Pilih Peran --</option>
              {rolesData?.data.map((roles) => (
                <option key={roles.role_id} value={roles.role_id}>
                  {roles.name} - Level {roles.level}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Container>
          <Row>
            <Col>
              <Button
                className="w-100 btn-post"
                onClick={postData}
                type="submit"
              >
                Tambah
              </Button>
            </Col>
            <Col>
              <Button
                className="w-100"
                onClick={props.onHide}
                variant="secondary"
              >
                Tutup
              </Button>
            </Col>
          </Row>
        </Container>
      </Modal.Footer>
    </Modal>
  );
};
