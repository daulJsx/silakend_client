import React, { useState } from "react";

// Cookies JS
import Cookies from "js-cookie";

// Axios
import axios from "axios";

// Functions
import { SecuringPage } from "../../functions/Securing/SecuringPage";

// Navigating
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

// Bootstrap components
import { Container, Row, Col } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import Alert from "react-bootstrap/Alert";

// Components
import { Aside } from "../../components/aside/Aside";
import { NavTop } from "../../components/navtop/NavTop";
import { Footer } from "../../components/footer/Footer";

// React Notification
import swal from "sweetalert";

// icons
import { FaArrowLeft } from "react-icons/fa";

// For checking user have done in authentication
import { useAuthUser } from "react-auth-kit";

// Icons
import { FiCheckCircle } from "react-icons/fi";

export const UpdateOrderHistory = () => {
  // Get access token
  const token = Cookies.get("token");

  const auth = useAuthUser();
  const navigate = useNavigate();

  // Initialize newest usage id
  const usageId = localStorage.getItem("usage_id");

  // Get the JSON object from local storage
  const orderString = localStorage.getItem("orderToMap");
  // Parse the JSON string into a JavaScript object
  const orderToMap = JSON.parse(orderString);

  // dynamically variable value for update
  const [vehicleId, setVehicleId] = useState("");
  const [driverId, setDriverId] = useState("");
  const [userId, setUserId] = useState("");
  const [ucategoryId, setUcategoryId] = useState("");
  const [usageDescription, setUsageDescription] = useState("");
  const [personelCount, setPersonelCount] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [departTime, setDepartTime] = useState("");
  const [arriveDate, setArriveDate] = useState("");
  const [arriveTime, setArriveTime] = useState("");
  const [dco, setDco] = useState("");
  const [dci, setDci] = useState("");
  const [status, setStatus] = useState("");
  const [statusDesc, setStatusDesc] = useState("");

  // if update necessary
  const [currentVehicleId] = [orderToMap].map((vId) => vId.vehicle_id);
  const [currentDriverId] = [orderToMap].map((dId) => dId.driver_id);
  const [currentUserId] = [orderToMap].map((uId) => uId.user_id);
  const [currentUCatId] = [orderToMap].map((uCatId) => uCatId.ucategory_id);
  const [currentUDesc] = [orderToMap].map((UDesc) => UDesc.usage_description);
  const [currentPersonelCount] = [orderToMap].map(
    (pCount) => pCount.personel_count
  );
  const [currentDestination] = [orderToMap].map((dest) => dest.destination);

  const [currentStartDate] = [orderToMap].map(
    (startDate) => startDate.start_date
  );

  const [currentEndDate] = [orderToMap].map((endDate) => endDate.end_date);
  const [currentDepartDate] = [orderToMap].map(
    (departDate) => departDate.depart_date
  );
  const [currentDepartTime] = [orderToMap].map(
    (departTime) => departTime.depart_time
  );
  const [currentArriveDate] = [orderToMap].map(
    (arriveDate) => arriveDate.arrive_date
  );
  const [currentArriveTime] = [orderToMap].map(
    (arriveTime) => arriveTime.arrive_time
  );
  const [currentDCO] = [orderToMap].map((dco) => dco.distance_count_out);
  const [currentDCI] = [orderToMap].map((dci) => dci.distance_count_in);

  const [currentStatus] = [orderToMap].map((status) => status.status);

  // format the time to hh:mm, caused by the orderToMap time format is h:i:s
  const departTimeFromMap = currentDepartTime || null;
  const formattedDepartTime = departTimeFromMap
    ? new Date(`1970-01-01T${departTimeFromMap}Z`).toISOString().substr(11, 5)
    : null;

  const arriveTimeFromMap = currentArriveTime || null;
  const formattedArriveTime = arriveTimeFromMap
    ? new Date(`1970-01-01T${arriveTimeFromMap}Z`).toISOString().substr(11, 5)
    : null;

  const body = {
    vehicle_id: vehicleId === "" ? currentVehicleId : vehicleId,
    driver_id: driverId === "" ? currentDriverId : driverId,
    user_id: userId === "" ? currentUserId : userId,
    ucategory_id: ucategoryId === "" ? currentUCatId : ucategoryId,
    usage_description:
      usageDescription === "" ? currentUDesc : usageDescription,
    personel_count: personelCount === "" ? currentPersonelCount : personelCount,
    destination: destination === "" ? currentDestination : destination,
    start_date: startDate === "" ? currentStartDate : startDate,
    end_date: endDate === "" ? currentEndDate : endDate,
    depart_date: departDate === "" ? currentDepartDate : departDate,
    depart_time: departTime === "" ? formattedDepartTime : departTime,
    arrive_date: arriveDate === "" ? currentArriveDate : arriveDate,
    arrive_time: arriveTime === "" ? formattedArriveTime : arriveTime,
    distance_count_out: dco === "" ? currentDCO : dco,
    distance_count_in: dci === "" ? currentDCI : dci,
    status: currentStatus,
    status_description: "",
  };

  const handleFinal = async (e) => {
    e.preventDefault();

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    swal({
      title: "Yakin ?",
      text: "Aksi ini akan menyelesaikan proses peminjaman kendaraan dinas",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          await axios
            .put(
              `https://silakend-server.xyz/api/vehicleusages/${usageId}`,
              body,
              config
            )
            .then((response) => {
              if (response.status === 200) {
                navigate("/riwayat-pengajuan");
                swal({
                  title: "Berhasil!",
                  text: response.data.msg,
                  icon: "success",
                  button: "Tutup",
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
        swal("Data peminjaman aman!");
      }
    });
  };

  return token ? (
    auth().user_level === 1 || auth().user_level === 2 ? (
      usageId ? (
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
                      title={"Riwayat Peminjaman Kendaraan"}
                      parentLink={"/riwayat-pengajuan"}
                    />
                  ))}
                </Col>
              </Row>
              {/* NAVBAR */}
              <main className="min-vh-100 px-2 mt-4">
                <Row>
                  <Col>
                    <Card>
                      <Form onSubmit={handleFinal}>
                        {orderToMap
                          ? [orderToMap]?.map((orderToUpdate) => (
                              <>
                                <Card.Title className="fs-4 p-4 mb-4 fw-semibold color-primary">
                                  Rincian Riwayat
                                </Card.Title>
                                <Card.Body>
                                  <Form.Group className="mb-3">
                                    <Form.Label>Peminjam</Form.Label>
                                    <Form.Select
                                      disabled
                                      style={{
                                        backgroundColor: "#ced4da",
                                        border: "none",
                                        padding: "17px",
                                      }}
                                      aria-label="Default select example"
                                      onChange={(e) =>
                                        setUserId(e.target.value)
                                      }
                                    >
                                      <option value={orderToUpdate.user_id}>
                                        {orderToUpdate.user.name}
                                      </option>
                                    </Form.Select>
                                  </Form.Group>
                                  <Form.Group className="mb-3">
                                    <Form.Label>Kategori Peminjaman</Form.Label>
                                    <Form.Select
                                      disabled
                                      style={{
                                        backgroundColor: "#ced4da",
                                        border: "none",
                                        padding: "17px",
                                      }}
                                      aria-label="Default select example"
                                      onChange={(e) =>
                                        setUcategoryId(e.target.value)
                                      }
                                    >
                                      <option
                                        value={orderToUpdate.ucategory_id}
                                      >
                                        {orderToUpdate.category.name}
                                      </option>
                                    </Form.Select>
                                  </Form.Group>
                                  <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlTextarea1"
                                  >
                                    <Form.Label>
                                      Deskripsi Peminjaman
                                    </Form.Label>
                                    <Form.Control
                                      disabled
                                      value={orderToUpdate.usage_description}
                                      as="textarea"
                                      rows={3}
                                      style={{
                                        backgroundColor: "#ced4da",
                                        border: "none",
                                      }}
                                    />
                                  </Form.Group>
                                  <Form.Group>
                                    <Form.Label>Jumlah Personil</Form.Label>
                                    <InputGroup className="mb-3">
                                      <Form.Control
                                        disabled
                                        value={orderToUpdate.personel_count}
                                        style={{
                                          backgroundColor: "#ced4da",
                                          border: "none",
                                          padding: "15px",
                                        }}
                                        type="number"
                                        aria-describedby="basic-addon2"
                                      />
                                      <InputGroup.Text
                                        style={{
                                          border: "none",
                                        }}
                                        id="basic-addon2"
                                      >
                                        Orang
                                      </InputGroup.Text>
                                    </InputGroup>
                                  </Form.Group>
                                  <Form.Group className="mb-3">
                                    <Form.Label>Destinasi</Form.Label>
                                    <Form.Control
                                      disabled
                                      value={orderToUpdate.destination}
                                      required
                                      className="input form-custom"
                                      style={{
                                        backgroundColor: "#ced4da",
                                        border: "none",
                                        padding: "15px",
                                      }}
                                      type="text"
                                    />
                                  </Form.Group>
                                  <Form.Group className="py-1">
                                    <Form.Label>waktu pinjam</Form.Label>
                                    <InputGroup className="mb-3">
                                      <Form.Control
                                        disabled
                                        style={{
                                          backgroundColor: "#ced4da",
                                          border: "none",
                                          padding: "17px",
                                        }}
                                        value={orderToUpdate.start_date}
                                        type="date"
                                        onChange={(e) =>
                                          setStartDate(e.target.value)
                                        }
                                      />
                                      <InputGroup.Text
                                        style={{
                                          border: "none",
                                        }}
                                        id="basic-addon2"
                                      >
                                        s/d
                                      </InputGroup.Text>
                                      <Form.Control
                                        disabled
                                        required
                                        style={{
                                          backgroundColor: "#ced4da",
                                          border: "none",
                                          padding: "17px",
                                        }}
                                        type="date"
                                        onChange={(e) =>
                                          setEndDate(e.target.value)
                                        }
                                        value={orderToUpdate.end_date}
                                      />
                                    </InputGroup>
                                  </Form.Group>
                                  <Form.Group className="py-1">
                                    <Form.Label>waktu berangkat</Form.Label>
                                    <InputGroup className="mb-3">
                                      <InputGroup.Text
                                        style={{
                                          border: "none",
                                        }}
                                        id="basic-addon2"
                                      >
                                        Tanggal
                                      </InputGroup.Text>
                                      <Form.Control
                                        disabled
                                        style={{
                                          backgroundColor: "#ced4da",
                                          border: "none",
                                          padding: "17px",
                                        }}
                                        type="date"
                                        onChange={(e) =>
                                          setDepartDate(e.target.value)
                                        }
                                        value={orderToUpdate.depart_date}
                                      />
                                      <InputGroup.Text
                                        style={{
                                          border: "none",
                                        }}
                                        id="basic-addon2"
                                      >
                                        Pukul
                                      </InputGroup.Text>
                                      <Form.Control
                                        value={orderToUpdate.depart_time}
                                        disabled
                                        style={{
                                          backgroundColor: "#ced4da",
                                          border: "none",
                                          padding: "17px",
                                        }}
                                        type="time"
                                        onChange={(e) =>
                                          setDepartTime(e.target.value)
                                        }
                                      />
                                    </InputGroup>
                                  </Form.Group>
                                  <Form.Group>
                                    <Form.Label>odometer</Form.Label>
                                    <InputGroup className="mb-3">
                                      <InputGroup.Text
                                        style={{
                                          border: "none",
                                        }}
                                        id="basic-addon2"
                                      >
                                        Jumlah Kilometer Pergi
                                      </InputGroup.Text>
                                      <Form.Control
                                        disabled
                                        style={{
                                          backgroundColor: "#ced4da",
                                          border: "none",
                                          padding: "17px",
                                        }}
                                        value={orderToUpdate.distance_count_out}
                                        type="number"
                                        onChange={(e) => setDco(e.target.value)}
                                      />
                                      <InputGroup.Text
                                        style={{
                                          border: "none",
                                        }}
                                        id="basic-addon2"
                                      >
                                        Jumlah Kilometer Pulang
                                      </InputGroup.Text>
                                      <Form.Control
                                        disabled
                                        style={{
                                          backgroundColor: "#ced4da",
                                          border: "none",
                                          padding: "17px",
                                        }}
                                        value={orderToUpdate.distance_count_in}
                                        className="input form-custom"
                                        style={{
                                          backgroundColor: "#F5F7FC",
                                          border: "none",
                                          padding: "15px",
                                        }}
                                        type="number"
                                        onChange={(e) => setDci(e.target.value)}
                                      />
                                    </InputGroup>
                                  </Form.Group>
                                  <Form.Group className="mb-3">
                                    <Form.Label>Kendaraan</Form.Label>
                                    <Form.Select
                                      disabled
                                      style={{
                                        backgroundColor: "#ced4da",
                                        border: "none",
                                        padding: "17px",
                                      }}
                                      aria-label="Default select example"
                                      onChange={(e) =>
                                        setVehicleId(e.target.value)
                                      }
                                    >
                                      <option value={orderToUpdate.vehicle_id}>
                                        {orderToUpdate.vehicle.name}
                                      </option>
                                    </Form.Select>
                                  </Form.Group>
                                  <Form.Group className="mb-3">
                                    <Form.Label>Pengemudi</Form.Label>
                                    <Form.Select
                                      disabled
                                      style={{
                                        backgroundColor: "#ced4da",
                                        border: "none",
                                        padding: "17px",
                                      }}
                                      aria-label="Default select example"
                                      onChange={(e) =>
                                        setDriverId(e.target.value)
                                      }
                                    >
                                      <option value={orderToUpdate.driver_id}>
                                        {orderToUpdate.driver.name}
                                      </option>
                                    </Form.Select>
                                  </Form.Group>

                                  <Alert variant="warning">
                                    <Alert.Heading>
                                      Masukkan waktu pulang
                                    </Alert.Heading>{" "}
                                    <Form.Group className="py-1">
                                      <InputGroup className="mb-3">
                                        <InputGroup.Text
                                          style={{
                                            border: "none",
                                          }}
                                          id="basic-addon2"
                                        >
                                          Tanggal
                                        </InputGroup.Text>
                                        <Form.Control
                                          required
                                          className="input form-custom"
                                          style={{
                                            backgroundColor: "#F5F7FC",
                                            border: "none",
                                            padding: "15px",
                                          }}
                                          type="date"
                                          onChange={(e) =>
                                            setArriveDate(e.target.value)
                                          }
                                        />
                                        <InputGroup.Text
                                          style={{
                                            border: "none",
                                          }}
                                          id="basic-addon2"
                                        >
                                          Pukul
                                        </InputGroup.Text>
                                        <Form.Control
                                          required
                                          className="input form-custom"
                                          style={{
                                            backgroundColor: "#F5F7FC",
                                            border: "none",
                                            padding: "15px",
                                          }}
                                          type="time"
                                          onChange={(e) =>
                                            setArriveTime(e.target.value)
                                          }
                                        />
                                      </InputGroup>
                                    </Form.Group>
                                  </Alert>
                                </Card.Body>
                                <Card.Footer className="d-flex gap-2">
                                  <Button
                                    onClick={handleFinal}
                                    className="btn-post"
                                  >
                                    <div className="d-flex gap-2">
                                      Simpan
                                      <FiCheckCircle className="fs-4" />
                                    </div>
                                  </Button>
                                </Card.Footer>
                              </>
                            ))
                          : null}
                      </Form>
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
        <Navigate to="/pengajuan-peminjaman" />
      )
    ) : (
      SecuringPage()
    )
  ) : (
    <Navigate to="/silakend-login" />
  );
};
