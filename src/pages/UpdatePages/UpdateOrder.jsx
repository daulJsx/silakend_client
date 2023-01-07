import React, { useState, useEffect } from "react";

// Axios
import axios from "axios";

// Fetch Requirements
import { useQuery } from "react-query";
import FetchVehicles from "../../consAPI/FetchVehicles";
import FetchUsers from "../../consAPI/FetchUsers";
import FetchUsageCat from "../../consAPI/FetchUsageCat";

// Navigating
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

// Bootstrap components
import { Container, Row, Col } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";

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

export const UpdateOrder = () => {
  const auth = useAuthUser();
  const navigate = useNavigate();

  // Initialize newest usage id
  const [usageId, setUsageId] = useState(localStorage.getItem("usage_id"));

  // Get the JSON object from local storage
  const orderString = localStorage.getItem("orderToMap");
  // Parse the JSON string into a JavaScript object
  const orderToMap = JSON.parse(orderString);

  // Fetching requirement data
  const { data: vehiclesData } = useQuery("vehicles", FetchVehicles);
  const { data: usageCatData } = useQuery("usageCat", FetchUsageCat);
  const { data: usersData } = useQuery(["users"], FetchUsers);

  // dynamically variable value for update
  const [vehicleId, setVehicleId] = useState("");
  const [driverId, setDriverId] = useState("");
  const [userId, setUserId] = useState("");
  const [ucategoryId, setUcategoryId] = useState("");
  const [usageDescription, setUsageDescription] = useState("");
  const [personelCount, setPersonelCount] = useState("");
  const [destination, setDestination] = useState("");
  const [starDate, setStarDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [departTime, setDepartTime] = useState("");
  const [arriveDate, setArriveDate] = useState("");
  const [arriveTime, setArriveTime] = useState("");
  const [dco, setDco] = useState("");
  const [dci, setDci] = useState("");
  const [status, setStatus] = useState("");
  const [statusDesc, setStatusDesc] = useState("");

  const body = {
    vehicle_id: vehicleId,
    driver_id: driverId,
    user_id: userId,
    ucategory_id: ucategoryId,
    usage_description: usageDescription,
    personel_count: personelCount,
    destination: destination,
    start_date: starDate,
    end_date: endDate,
    depart_date: departDate,
    depart_time: departTime,
    arrive_date: arriveDate,
    arrive_time: arriveTime,
    distance_count_out: dco,
    distance_count_in: dci,
    status: status,
    status_description: statusDesc,
  };

  const handleUpdateOrder = async () => {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };

    swal({
      title: "Yakin?",
      text: "Pastikan kembali perubahan data peminjaman",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        await axios
          .put(
            `https://silakend-server.xyz/api/vehicleusages/${usageId}`,
            body,
            config
          )
          .then((response) => {
            navigate("/pengajuan-peminjaman");
            if (response.status === 200) {
              swal({
                title: "Berhasil!",
                text: response.data.msg,
                icon: "success",
                button: "Tutup",
              });
              const updateV = response.data;
              return updateV;
            } else {
              console.log(response.data);
            }
          })
          .catch((error) => {
            if (error.response.data.message) {
              swal("Ups!", error.response.data.message, "error");
            } else {
              swal("Ups!", error.response.data.msg, "error");
            }
          });
      } else {
        swal("Data peminjaman aman!");
      }
    });
  };

  if (localStorage.getItem("token") && auth()) {
    if (localStorage.getItem("usage_id")) {
      return (
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
                      title={"Edit Pengajuan Peminjaman Kendaraan"}
                      parentLink={"/pengajuan-peminjaman"}
                    />
                  ))}
                </Col>
              </Row>
              {/* NAVBAR */}
              <main className="min-vh-100 px-2 mt-4">
                <Row>
                  <Col>
                    <Card>
                      <Card.Title className="fs-4 p-4 mb-4 fw-semibold color-primary">
                        Silahkan Edit Data Peminjaman Kendaraan Dinas Disini
                      </Card.Title>
                      <Card.Body>
                        {orderToMap != ""
                          ? [orderToMap].map((orderToUpdate) => (
                              <>
                                <Form.Group className="mb-3">
                                  <Form.Label>Kendaraan</Form.Label>
                                  <Form.Select
                                    required
                                    style={{
                                      backgroundColor: "#F5F7FC",
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
                                    {vehiclesData?.map((vehicles) => (
                                      <option
                                        key={vehicles.vehicle_id}
                                        value={vehicles.vehicle_id}
                                      >
                                        {vehicles.name}
                                      </option>
                                    ))}
                                  </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                  <Form.Label>Pengemudi</Form.Label>
                                  <Form.Select
                                    required
                                    style={{
                                      backgroundColor: "#F5F7FC",
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
                                    {usersData?.map((users) =>
                                      users.role.map((userAsDriver) => {
                                        return userAsDriver.name == "Driver" ? (
                                          <option
                                            value={users.user_id}
                                            key={users.user_id}
                                          >
                                            {users.name}
                                          </option>
                                        ) : null;
                                      })
                                    )}
                                  </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                  <Form.Label>Peminjam</Form.Label>
                                  <Form.Select
                                    required
                                    style={{
                                      backgroundColor: "#F5F7FC",
                                      border: "none",
                                      padding: "17px",
                                    }}
                                    aria-label="Default select example"
                                    onChange={(e) => setUserId(e.target.value)}
                                  >
                                    <option value={orderToUpdate.user_id}>
                                      {orderToUpdate.user.name}
                                    </option>
                                    {usersData?.map((users) =>
                                      users.role.map((userAsSuper) => {
                                        return userAsSuper.level != 1 ? (
                                          <option
                                            value={users.user_id}
                                            key={users.user_id}
                                          >
                                            {users.name}
                                          </option>
                                        ) : null;
                                      })
                                    )}
                                  </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                  <Form.Label>Kategori Peminjaman</Form.Label>
                                  <Form.Select
                                    required
                                    style={{
                                      backgroundColor: "#F5F7FC",
                                      border: "none",
                                      padding: "17px",
                                    }}
                                    aria-label="Default select example"
                                    onChange={(e) =>
                                      setUcategoryId(e.target.value)
                                    }
                                  >
                                    <option value={orderToUpdate.ucategory_id}>
                                      {orderToUpdate.category.name}
                                    </option>
                                    {usageCatData?.map((usageCat) => (
                                      <option
                                        value={usageCat.ucategory_id}
                                        key={usageCat.ucategory_id}
                                      >
                                        {usageCat.name}
                                      </option>
                                    ))}
                                  </Form.Select>
                                </Form.Group>

                                <Form.Group
                                  className="mb-3"
                                  controlId="exampleForm.ControlTextarea1"
                                >
                                  <Form.Label>Deskripsi Peminjaman</Form.Label>
                                  <Form.Control
                                    placeholder={
                                      orderToUpdate.usage_description
                                    }
                                    as="textarea"
                                    rows={3}
                                    style={{
                                      backgroundColor: "#F5F7FC",
                                      border: "none",
                                    }}
                                    onChange={(e) =>
                                      setUsageDescription(e.target.value)
                                    }
                                  />
                                </Form.Group>

                                <Form.Group>
                                  <Form.Label>Jumlah Personil</Form.Label>
                                  <InputGroup className="mb-3">
                                    <Form.Control
                                      onChange={(e) =>
                                        setPersonelCount(e.target.value)
                                      }
                                      placeholder={orderToUpdate.personel_count}
                                      style={{
                                        backgroundColor: "#F5F7FC",
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
                                    onChange={(e) =>
                                      setDestination(e.target.value)
                                    }
                                    placeholder={orderToUpdate.destination}
                                    required
                                    className="input form-custom"
                                    style={{
                                      backgroundColor: "#F5F7FC",
                                      border: "none",
                                      padding: "15px",
                                    }}
                                    type="text"
                                    //    onChange={(e) =>
                                    //      setOrderData({
                                    //        ...orderData,
                                    //        destination: e.target.value,
                                    //      })
                                    //    }
                                  />
                                </Form.Group>

                                <Form.Group className="py-1">
                                  <Form.Label>
                                    Tanggal pinjam saat ini :{" "}
                                    <span className="fw-bold text-dark">
                                      {orderToUpdate.start_date} s/d{" "}
                                      {orderToUpdate.end_date}
                                    </span>
                                  </Form.Label>
                                  <InputGroup className="mb-3">
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
                                        setStarDate(e.target.value)
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
                                      required
                                      className="input form-custom"
                                      style={{
                                        backgroundColor: "#F5F7FC",
                                        border: "none",
                                        padding: "15px",
                                      }}
                                      type="date"
                                      onChange={(e) =>
                                        setEndDate(e.target.value)
                                      }
                                    />
                                  </InputGroup>
                                </Form.Group>

                                <Form.Group className="py-1">
                                  <Form.Label>
                                    Waktu Berangkat saat ini :{" "}
                                    <span className="fw-bold text-dark">
                                      {orderToUpdate.depart_date} Pukul{" "}
                                      {orderToUpdate.depart_time}
                                    </span>
                                  </Form.Label>
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
                                        setDepartDate(e.target.value)
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
                                        setDepartTime(e.target.value)
                                      }
                                    />
                                  </InputGroup>
                                </Form.Group>

                                <Form.Group className="py-1">
                                  <Form.Label>
                                    Waktu tiba saat ini :{" "}
                                    <span className="fw-bold text-dark">
                                      {orderToUpdate.arrive_date} Pukul{" "}
                                      {orderToUpdate.arrive_time}
                                    </span>
                                  </Form.Label>
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

                                <Form.Group>
                                  <Form.Label>Jarak</Form.Label>
                                  <InputGroup className="mb-3">
                                    <InputGroup.Text
                                      style={{
                                        border: "none",
                                      }}
                                      id="basic-addon2"
                                    >
                                      Jarak Pergi
                                    </InputGroup.Text>
                                    <Form.Control
                                      required
                                      placeholder={
                                        orderToUpdate.distance_count_out
                                      }
                                      className="input form-custom"
                                      style={{
                                        backgroundColor: "#F5F7FC",
                                        border: "none",
                                        padding: "15px",
                                      }}
                                      type="number"
                                      onChange={(e) => setDco(e.target.value)}
                                    />
                                    <InputGroup.Text
                                      style={{
                                        border: "none",
                                      }}
                                      id="basic-addon2"
                                    >
                                      Jarak Pulang
                                    </InputGroup.Text>
                                    <Form.Control
                                      required
                                      placeholder={
                                        orderToUpdate.distance_count_in
                                      }
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

                                <Form.Group>
                                  <Form.Label>Status</Form.Label>
                                  <InputGroup className="mb-3">
                                    <Form.Select
                                      required
                                      style={{
                                        backgroundColor: "#F5F7FC",
                                        border: "none",
                                        padding: "17px",
                                      }}
                                      aria-label="Default select example"
                                      onChange={(e) =>
                                        setStatus(e.target.value)
                                      }
                                    >
                                      <option value={orderToUpdate.status}>
                                        {orderToUpdate.status}
                                      </option>
                                      <option>APPROVED</option>
                                      <option>READY</option>
                                      <option>PROGRESS</option>
                                      <option>DONE</option>
                                      <option>REJECTED</option>
                                      <option>WAITING</option>
                                      <option>CANCEL</option>
                                    </Form.Select>
                                    <InputGroup.Text
                                      style={{
                                        border: "none",
                                      }}
                                      id="basic-addon2"
                                    >
                                      Keterangan
                                    </InputGroup.Text>
                                    <Form.Control
                                      required
                                      placeholder={
                                        orderToUpdate.status_description
                                      }
                                      as="textarea"
                                      rows={3}
                                      style={{
                                        backgroundColor: "#F5F7FC",
                                        border: "none",
                                      }}
                                      onChange={(e) =>
                                        setStatusDesc(e.target.value)
                                      }
                                    />
                                  </InputGroup>
                                </Form.Group>
                              </>
                            ))
                          : null}
                      </Card.Body>
                      <Card.Footer>
                        <Button
                          className="btn-post"
                          onClick={handleUpdateOrder}
                          type="submit"
                        >
                          Simpan
                        </Button>
                      </Card.Footer>
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
      );
    } else {
      return <Navigate to="/order-peminjaman" />;
    }
  } else {
    return <Navigate to="/silakend-login" />;
  }
};
