import React from "react";
import Modal from "react-bootstrap/Modal";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";

function InfoVehicleUsage(props) {
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
          Rincian Data Peminjaman
        </div>
        <ListGroup as="ol" numbered className="mb-2">
          {props.currentOrder !== ""
            ? props.currentOrder.map((order) => {
                return (
                  <>
                    <ListGroup.Item
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                    >
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">Peminjam</div>
                        {order.user.name}
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                    >
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">Kendaraan</div>
                        {order.vehicle.name}
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                    >
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">Pengemudi</div>
                        {order.driver.name}
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                    >
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">Tujuan Peminjaman</div>
                        {order.usage_description}
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                    >
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">Jumlah Personil</div>
                        {order.personel_count} Orang
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                    >
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">Destinasi</div>
                        {order.destination}
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                    >
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">Waktu Meminjam</div>
                        {order.start_date}
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                    >
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">Waktu Selesai Meminjam</div>
                        {order.end_date}
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                    >
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">Status</div>
                        <Badge
                          bg={
                            order.status === "CANCELED"
                              ? "danger"
                              : order.status === "WAITING"
                              ? "warning"
                              : "success"
                          }
                        >
                          {order.status === "CANCELED"
                            ? "Batal"
                            : order.status === "WAITING"
                            ? "Pending"
                            : "Selesai"}
                        </Badge>
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
