import React from "react";
import Modal from "react-bootstrap/Modal";
import ListGroup from "react-bootstrap/ListGroup";

function InfoVehicle(props) {
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
          Rincian Data Kendaraan
        </div>
        <ListGroup as="ol" numbered className="mb-2">
          {props.currentVehicle !== ""
            ? props.currentVehicle.map((vehicle) => {
                return (
                  <>
                    <ListGroup.Item
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                    >
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">NAMA KENDARAAN</div>
                        {vehicle.name}
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                    >
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">NOMOR POLISI</div>
                        {vehicle.license_number}
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                    >
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">TAHUN PEMBUATAN</div>
                        {vehicle.year}
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                    >
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">WAKTU PAJAK</div>
                        {vehicle.tax_date}
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                    >
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">WAKTU VALID</div>
                        {vehicle.valid_date}
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                    >
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">JUMLAH KILOMETER TEMPUH</div>
                        {vehicle.distance_count} KM
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                    >
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">KATEGORI KENDARAAN</div>
                        {vehicle.category.name}
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

export default InfoVehicle;
