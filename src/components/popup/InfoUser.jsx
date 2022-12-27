import React from "react";
import Modal from "react-bootstrap/Modal";
import ListGroup from "react-bootstrap/ListGroup";

function InfoUser(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {/* <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
      </Modal.Header> */}
      <Modal.Body
        closeButton
        style={{
          backgroundColor: "#F5F7FC",
          borderRadius: "10px",
        }}
      >
        <div className="fs-4 p-2 text-center color-primary fw-bold">
          Rincian Data Pengguna
        </div>
        <ListGroup as="ol" numbered className="mb-2">
          {props.currentUser != "" ? (
            props.currentUser.map((user) => {
              return (
                <>
                  <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                  >
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">NIP</div>
                      {user.nip}
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                  >
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">NAMA</div>
                      {user.name}
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                  >
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">ALAMAT</div>
                      {user.address}
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                  >
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">TELEPON</div>
                      {user.phone}
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                  >
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">EMAIL</div>
                      {user.email}
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                  >
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">UNIT KERJA</div>
                      {user.job_unit.name}
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                  >
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">PERAN</div>
                      {user.role.map((userRole, index) => {
                        return (
                          <ul className="rolesList">
                            <li key={index}>
                              {index + 1}. {userRole.name}
                            </li>
                          </ul>
                        );
                      })}
                    </div>
                  </ListGroup.Item>
                </>
              );
            })
          ) : (
            <p>Pengguna ini belum memiliki peran</p>
          )}
        </ListGroup>
      </Modal.Body>
    </Modal>
  );
}

export default InfoUser;
