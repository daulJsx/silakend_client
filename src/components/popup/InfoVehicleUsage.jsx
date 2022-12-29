import React from "react";
import Modal from "react-bootstrap/Modal";
import ListGroup from "react-bootstrap/ListGroup";
import { Row, Col } from "react-bootstrap";

function InfoVehicleUsage(props) {
  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      size="lg"
    >
      <Modal.Body
        style={{
          backgroundColor: "#F5F7FC",
          borderRadius: "10px",
        }}
      >
        <div className="fs-4 p-2 text-center color-primary fw-bold">
          Rincian Data Peminjaman
        </div>
        <ListGroup as="ol" className="mb-2 gap-2">
          {props.currentOrder !== ""
            ? props.currentOrder.map((order) => {
                return (
                  <>
                    <Row>
                      <Col>
                        <ListGroup.Item
                          as="li"
                          className="d-flex justify-content-between align-items-start rounded"
                        >
                          <div className="ms-2 me-auto">
                            <div className="fw-bold">PEMINJAM</div>
                            {order.user.name}
                          </div>
                        </ListGroup.Item>
                      </Col>
                      <Col>
                        <ListGroup.Item
                          as="li"
                          className="d-flex justify-content-between align-items-start rounded"
                        >
                          <div className="ms-2 me-auto">
                            <div className="fw-bold">KENDARAAN</div>
                            {order.vehicle.name}
                          </div>
                        </ListGroup.Item>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <ListGroup.Item
                          as="li"
                          className="d-flex justify-content-between align-items-start rounded"
                        >
                          <div className="ms-2 me-auto">
                            <div className="fw-bold">PENGEMUDI</div>
                            {order.driver.name}
                          </div>
                        </ListGroup.Item>
                      </Col>
                      <Col>
                        <ListGroup.Item
                          as="li"
                          className="d-flex justify-content-between align-items-start rounded"
                        >
                          <div className="ms-2 me-auto">
                            <div className="fw-bold">TUJUAN PEMINJAMAN</div>
                            {order.usage_description}
                          </div>
                        </ListGroup.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <ListGroup.Item
                          as="li"
                          className="d-flex justify-content-between align-items-start rounded"
                        >
                          <div className="ms-2 me-auto">
                            <div className="fw-bold">JUMLAH PERSONIL</div>
                            {order.personel_count} Orang
                          </div>
                        </ListGroup.Item>
                      </Col>
                      <Col>
                        <ListGroup.Item
                          as="li"
                          className="d-flex justify-content-between align-items-start rounded"
                        >
                          <div className="ms-2 me-auto">
                            <div className="fw-bold">DESTINASI</div>
                            {order.destination}
                          </div>
                        </ListGroup.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <ListGroup.Item
                          as="li"
                          className="d-flex justify-content-between align-items-start rounded"
                        >
                          <div className="ms-2 me-auto">
                            <div className="fw-bold">WAKTU MEMINJAM</div>
                            {order.start_date}
                          </div>
                        </ListGroup.Item>
                      </Col>
                      <Col>
                        <ListGroup.Item
                          as="li"
                          className="d-flex justify-content-between align-items-start rounded"
                        >
                          <div className="ms-2 me-auto">
                            <div className="fw-bold">
                              WAKTU SELESAI MEMINJAM
                            </div>
                            {order.end_date}
                          </div>
                        </ListGroup.Item>
                      </Col>
                    </Row>

                    <ListGroup.Item
                      as="li"
                      className="d-flex justify-content-between align-items-start rounded"
                    >
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">KETERANGAN</div>
                        {order.status_description}
                      </div>
                    </ListGroup.Item>
                  </>
                );
              })
            : null}
        </ListGroup>
      </Modal.Body>
    </Modal>
  );
}

export default InfoVehicleUsage;
