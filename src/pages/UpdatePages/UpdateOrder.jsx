import React, { useState } from "react";

// Cookies JS
import Cookies from "js-cookie";

// Axios
import axios from "axios";

// Functions
import { SecuringPage } from "../../functions/Securing/SecuringPage";
import { ApproveVU } from "../../functions/Update/ApproveVU";
import { RejectVU } from "../../functions/Update/RejectVU";

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
import { FiXCircle } from "react-icons/fi";
import { FiCheckCircle } from "react-icons/fi";

export const UpdateOrder = () => {
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
  const [currentStatusDesc] = [orderToMap].map(
    (status) => status.status_description
  );

  // format the time to hh:mm, caused by the orderToMap time format is h:i:s
  const departTimeFromMap = currentDepartTime;
  const getDepartDate = new Date(`1970-01-01T${departTimeFromMap}Z`);
  const departHours = getDepartDate.getUTCHours().toString().padStart(2, "0");
  const departMinutes = getDepartDate
    .getUTCMinutes()
    .toString()
    .padStart(2, "0");
  const formattedDepartTime = `${departHours}:${departMinutes}`;

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
    status: status === "" ? currentStatus : status,
    status_description: statusDesc === "" ? currentStatusDesc : statusDesc,
  };

  const handleUpdateOrder = async (e) => {
    e.preventDefault();

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    swal({
      title: "Yakin?",
      text: "Pastikan kembali perubahan data peminjaman",
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
                navigate("/pengajuan-peminjaman");
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
                      <Form onSubmit={handleUpdateOrder}>
                        {orderToMap
                          ? [orderToMap]?.map((orderToUpdate) => (
                              <>
                                <Card.Title className="fs-4 p-4 mb-4 fw-semibold color-primary">
                                  Silahkan Edit Data Peminjaman Kendaraan Dinas
                                  Disini
                                </Card.Title>
                                <Card.Body>
                                  <Form.Group className="mb-3">
                                    <Form.Label>Peminjam</Form.Label>
                                    <Form.Select
                                      disabled
                                      required
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
                                      {auth().user_level === 1
                                        ? usersData?.map((users) =>
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
                                          )
                                        : null}
                                    </Form.Select>
                                  </Form.Group>

                                  <Form.Group className="mb-3">
                                    <Form.Label>Kategori Peminjaman</Form.Label>
                                    <Form.Select
                                      disabled
                                      required
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
                                    <Form.Label>
                                      Tanggal pinjam yang diajukan :{" "}
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
                                      {orderToUpdate.depart_date ||
                                      orderToUpdate.depart_time ? (
                                        <>
                                          <p>Waktu berangkat saat ini:</p>{" "}
                                          <span className="fw-bold text-dark">
                                            {orderToUpdate.depart_date} Pukul{" "}
                                            {orderToUpdate.depart_time}
                                          </span>
                                        </>
                                      ) : (
                                        <p className="text-warning">
                                          Waktu berangkat belum ditentukan
                                        </p>
                                      )}
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
                                      {orderToUpdate.arrive_date ||
                                      orderToUpdate.arrive_time ? (
                                        <>
                                          <p>Waktu pulang saat ini:</p>{" "}
                                          <span className="fw-bold text-dark">
                                            {orderToUpdate.arrive_date} Pukul{" "}
                                            {orderToUpdate.arrive_time}
                                          </span>
                                        </>
                                      ) : (
                                        <p className="text-warning">
                                          Waktu tiba belum dimasukkan
                                        </p>
                                      )}
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
                                    <Form.Label>
                                      {orderToUpdate.distance_count_out ||
                                      orderToUpdate.distance_count_in ? (
                                        <p>ODOMETER</p>
                                      ) : (
                                        <p className="text-warning">
                                          ODOMETER BELUM DIMASUKKAN
                                        </p>
                                      )}
                                    </Form.Label>
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
                                        Jumlah Kilometer Pulang
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

                                  {orderToMap.status === "WAITING" ||
                                  orderToMap.status === "APPROVED" ? (
                                    <Alert variant="warning">
                                      <Alert.Heading>
                                        Tugaskan Pengemudi Dan Kendaraan
                                      </Alert.Heading>{" "}
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
                                          <option
                                            value={orderToUpdate.vehicle_id}
                                          >
                                            {orderToUpdate.vehicle !== null ? (
                                              orderToUpdate.vehicle.name
                                            ) : (
                                              <p>-- Pilih Kendaraan --</p>
                                            )}
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
                                          <option
                                            value={orderToUpdate.driver_id}
                                          >
                                            {orderToUpdate.driver !== null ? (
                                              orderToUpdate.driver.name
                                            ) : (
                                              <p>-- Pilih Pengemudi --</p>
                                            )}
                                          </option>
                                          {auth().user_level === 1
                                            ? usersData?.map((users) =>
                                                users.role.map(
                                                  (userAsDriver) => {
                                                    return userAsDriver.name ==
                                                      "Driver" ? (
                                                      <option
                                                        value={users.user_id}
                                                        key={users.user_id}
                                                      >
                                                        {users.name}
                                                      </option>
                                                    ) : null;
                                                  }
                                                )
                                              )
                                            : null}
                                        </Form.Select>
                                      </Form.Group>
                                    </Alert>
                                  ) : null}
                                </Card.Body>
                                {orderToUpdate.status === "WAITING" ? (
                                  <Card.Footer className="d-flex gap-2">
                                    <Button
                                      onClick={() => ApproveVU(orderToUpdate)}
                                      variant="success"
                                    >
                                      <div className="d-flex gap-2">
                                        Approve
                                        <FiCheckCircle className="fs-4" />
                                      </div>
                                    </Button>

                                    <Button
                                      onClick={() => RejectVU(orderToUpdate)}
                                      variant="danger"
                                    >
                                      <div className="d-flex gap-2">
                                        Reject
                                        <FiXCircle className="fs-4" />
                                      </div>
                                    </Button>
                                  </Card.Footer>
                                ) : null}
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
