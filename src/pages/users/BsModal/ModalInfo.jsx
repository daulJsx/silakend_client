import React from "react";

import axios from "axios";
import { useQuery } from "react-query";

// Bootstrap
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import Form from "react-bootstrap/Form";
import { Container, Row, Col } from "react-bootstrap";

export const ModalInfo = (props) => {
  const fetchUserById = async () => {
    const currentUserId = props.userId;
    console.log(currentUserId);
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const response = await axios.get(
      `https://9302-103-108-158-34.ap.ngrok.io/api/users/${currentUserId}`,
      config
    );

    return response;
  };
  const { data } = useQuery("currentUser", fetchUserById);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="modalCustom px-5">
        <div className="fs-5 fw-semibold color-primary text-center">
          Rincian Data Milik
          {data?.data.map((currentUser) => (
            <span className="fs-5 fw-semibold ms-2 text-dark text-center">
              {currentUser.name}
            </span>
          ))}
        </div>
        <div className="fs-5 fw-semibold color-primary">
          Nama:
          {data?.data.map((currentUser) => (
            <span className="fs-5 fw-semibold ms-2 text-dark">
              {currentUser.name}
            </span>
          ))}
        </div>
        <div className="fs-5 fw-semibold color-primary">
          NIP:
          {data?.data.map((currentUser) => (
            <span className="fs-5 fw-semibold ms-2 text-dark">
              {currentUser.nip}
            </span>
          ))}
        </div>
        <div className="fs-5 fw-semibold color-primary">
          Telepon:
          {data?.data.map((user) => (
            <span className="fs-5 fw-semibold ms-2 text-dark">
              {user.phone}
            </span>
          ))}
        </div>
        <div className="fs-5 fw-semibold color-primary">
          Email:
          {data?.data.map((currentUser) => (
            <span className="fs-5 fw-semibold ms-2 text-dark">
              {currentUser.email}
            </span>
          ))}
        </div>
        <div className="fs-5 fw-semibold color-primary">
          Unit Kerja:
          {data?.data.map((currentUser) => (
            <span className="fs-5 fw-semibold ms-2 text-dark">
              {currentUser.job_unit.name}
            </span>
          ))}
        </div>
        <div className="fs-5 fw-semibold color-primary">
          Status:
          {data?.data.map((currentUser) => (
            <span className="fs-5 fw-semibold ms-2 text-dark">
              {currentUser.status}
            </span>
          ))}
        </div>

        {/* <Form>
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
        </Form> */}
      </Modal.Body>
      <Modal.Footer>
        <Container>
          <Row>
            <Col>
              <Button className="w-100 btn-post" type="submit">
                Simpan Perubahan
              </Button>
            </Col>
            <Col>
              <Button
                className="w-100"
                variant="secondary"
                onClick={props.onHide}
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
