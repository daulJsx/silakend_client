import React, { useState } from "react";

// Cookies JS
import Cookies from "js-cookie";

// Axios
import axios from "axios";

// Functions
import { SecuringPage } from "../../functions/Securing/SecuringPage";
import { CancelVU } from "../../functions/Update/CancelVU";

// Fetch Requirements
import { useQuery } from "react-query";
import FetchVehicles from "../../consAPI/FetchVehicles";
import FetchUsers from "../../consAPI/FetchUsers";
import FetchUsageCat from "../../consAPI/FetchUsageCat";

// Navigating
import { Navigate, NavLink, useNavigate } from "react-router-dom";

// Bootstrap components
import { Container, Row, Col } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import Alert from "react-bootstrap/Alert";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Badge from "react-bootstrap/Badge";

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
import { HiOutlineClipboardCopy, HiOutlineClipboardList } from "react-icons/hi";
import { FiChevronRight } from "react-icons/fi";
import { FcFinePrint } from "react-icons/fc";

export const UpdateVUAdmin = () => {
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
  const [currentDco] = [orderToMap].map((dco) => dco.distance_count_out);
  const [currentDci] = [orderToMap].map((dci) => dci.distance_count_in);
  const [currentStatus] = [orderToMap].map((status) => status.status);
  const [currentStatusDesc] = [orderToMap].map(
    (status) => status.status_description
  );

  // format the time to hh:mm, caused by the orderToMap time format is h:i:s
  // const departTimeFromMap = currentDepartTime || null;
  // const formattedDepartTime = departTimeFromMap
  //   ? new Date(`1970-01-01T${departTimeFromMap}Z`).toISOString().substr(11, 5)
  //   : null;

  // const arriveTimeFromMap = currentArriveTime || null;
  // const formattedArriveTime = arriveTimeFromMap
  //   ? new Date(`1970-01-01T${arriveTimeFromMap}Z`).toISOString().substr(11, 5)
  //   : null;

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
    distance_count_out: dco === "" ? currentDco : dco,
    distance_count_in: dci === "" ? currentDci : dci,
    status: status === "" ? currentStatus : status,
    status_description: statusDesc === "" ? currentStatusDesc : statusDesc,
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    swal({
      title: "Yakin ?",
      text: "Pastikan kembali pengajuan, sebelum ditindak lanjuti",
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
                const { msg } = response.data;
                navigate(-1);
                swal({
                  text: msg,
                  icon: "success",
                  button: false,
                  timer: 3000,
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
    auth().user_level === 1 ? (
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
                      parentLink={-1}
                    />
                  ))}
                </Col>
              </Row>
              {/* NAVBAR */}

              <main className="min-vh-100 mt-4">
                <Row>
                  <Col>
                    <Card className="bg__primary" style={{ boxShadow: "none" }}>
                      <Card.Header>
                        <Container>
                          <Row className="gap-3 mt-4">
                            <Col>
                              <h3 className="main__title">
                                Pengajuan Peminjaman Kendaraan Dinas
                              </h3>
                              <Breadcrumb className="breadcrumb__item mt-3">
                                <Breadcrumb.Item className="breadcrumb__item">
                                  <div className="d-flex justify-content-center align-items-center gap-2">
                                    <NavLink
                                      to={-1}
                                      className="d-flex justify-content-center align-items-center text-muted gap-2"
                                    >
                                      <HiOutlineClipboardCopy className="fs-5" />
                                      Data
                                    </NavLink>

                                    <FiChevronRight className="fs-6 breadcrumb__divider" />
                                    <span className="color-primary">
                                      Edit Pengajuan
                                    </span>
                                  </div>
                                </Breadcrumb.Item>
                              </Breadcrumb>
                            </Col>
                          </Row>
                        </Container>
                      </Card.Header>

                      <Card.Body className="p-4">
                        {orderToMap
                          ? [orderToMap]?.map((orderToUpdate) => (
                              <Container
                                className="p-4 position-relative card__content"
                                style={{
                                  background: "#fff",
                                  borderRadius: "10px",
                                }}
                              >
                                <Badge
                                  className="position-absolute top-0 start-100 translate-middle rounded-pill"
                                  bg={
                                    orderToUpdate.status === "CANCELED" ||
                                    orderToUpdate.status === "REJECTED"
                                      ? "danger"
                                      : orderToUpdate.status === "WAITING"
                                      ? "warning"
                                      : orderToUpdate.status === "READY"
                                      ? "primary"
                                      : orderToUpdate.status === "APPROVED"
                                      ? "info"
                                      : orderToUpdate.status === "PROGRESS"
                                      ? "secondary"
                                      : "success"
                                  }
                                >
                                  {orderToUpdate.status === "CANCELED"
                                    ? "Batal"
                                    : orderToUpdate.status === "REJECTED"
                                    ? "Ditolak"
                                    : orderToUpdate.status === "WAITING"
                                    ? "Diajukan"
                                    : orderToUpdate.status === "READY"
                                    ? "Siap berangkat"
                                    : orderToUpdate.status === "APPROVED"
                                    ? "Disetujui"
                                    : orderToUpdate.status === "PROGRESS"
                                    ? "Berlangsung"
                                    : "Selesai"}
                                </Badge>
                                <Row>
                                  <Col>
                                    <Form onSubmit={handleUpdate}>
                                      <>
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
                                            onChange={(e) =>
                                              setUserId(e.target.value)
                                            }
                                          >
                                            <option
                                              value={orderToUpdate.user_id}
                                            >
                                              {orderToUpdate.user.name}
                                            </option>
                                            {usersData?.map((users) => (
                                              <option
                                                value={users.user_id}
                                                key={users.user_id}
                                              >
                                                {users.name} - {users.nip}
                                              </option>
                                            ))}
                                          </Form.Select>
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                          <Form.Label>
                                            Kategori Peminjaman
                                          </Form.Label>
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
                                            onChange={(e) =>
                                              setUsageDescription(
                                                e.target.value
                                              )
                                            }
                                            placeholder={
                                              orderToUpdate.usage_description
                                            }
                                            as="textarea"
                                            rows={3}
                                            style={{
                                              backgroundColor: "#F5F7FC",
                                              border: "none",
                                              padding: "17px",
                                            }}
                                          />
                                        </Form.Group>

                                        <Form.Group>
                                          <Form.Label>
                                            Jumlah Personil
                                          </Form.Label>
                                          <InputGroup className="mb-3">
                                            <Form.Control
                                              onChange={(e) =>
                                                setPersonelCount(e.target.value)
                                              }
                                              placeholder={
                                                orderToUpdate.personel_count
                                              }
                                              style={{
                                                backgroundColor: "#F5F7FC",
                                                border: "none",
                                                padding: "17px",
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
                                            placeholder={
                                              orderToUpdate.destination
                                            }
                                            required
                                            className="input form-custom"
                                            style={{
                                              backgroundColor: "#F5F7FC",
                                              border: "none",
                                              padding: "17px",
                                            }}
                                            type="text"
                                            onChange={(e) =>
                                              setDestination(e.target.value)
                                            }
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

                                        <Form.Group className="mb-3 mt-3">
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
                                              value={
                                                orderToUpdate.vehicle_id
                                                  ? orderToUpdate.vehicle_id
                                                  : null
                                              }
                                            >
                                              {orderToUpdate.vehicle !==
                                              null ? (
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
                                              value={
                                                orderToUpdate.driver_id
                                                  ? orderToUpdate.driver_id
                                                  : null
                                              }
                                            >
                                              {orderToUpdate.driver !== null ? (
                                                orderToUpdate.driver.name
                                              ) : (
                                                <p>-- Pilih Pengemudi --</p>
                                              )}
                                            </option>
                                            {usersData?.map((users) =>
                                              users.role.map((userAsDriver) => {
                                                return userAsDriver.level ===
                                                  4 ? (
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

                                        <Form.Group className="py-1">
                                          <Form.Label>ODOMETER</Form.Label>
                                          <InputGroup className="mb-3">
                                            <InputGroup.Text
                                              style={{
                                                border: "none",
                                              }}
                                              id="basic-addon2"
                                            >
                                              Pergi
                                            </InputGroup.Text>
                                            <Form.Control
                                              required
                                              placeholder={
                                                orderToUpdate.distance_count_out
                                                  ? orderToUpdate.distance_count_out
                                                  : null
                                              }
                                              className="input form-custom"
                                              style={{
                                                backgroundColor: "#F5F7FC",
                                                border: "none",
                                                padding: "15px",
                                              }}
                                              type="text"
                                              onChange={(e) =>
                                                setDco(e.target.value)
                                              }
                                            />
                                            <InputGroup.Text
                                              style={{
                                                border: "none",
                                              }}
                                              id="basic-addon2"
                                            >
                                              Pulang
                                            </InputGroup.Text>
                                            <Form.Control
                                              required
                                              placeholder={
                                                orderToUpdate.distance_count_in
                                                  ? orderToUpdate.distance_count_in
                                                  : null
                                              }
                                              className="input form-custom"
                                              style={{
                                                backgroundColor: "#F5F7FC",
                                                border: "none",
                                                padding: "15px",
                                              }}
                                              type="text"
                                              onChange={(e) =>
                                                setDci(e.target.value)
                                              }
                                            />
                                          </InputGroup>
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                          <Form.Label>status</Form.Label>
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
                                            <option
                                              value={
                                                orderToUpdate.driver_id
                                                  ? orderToUpdate.driver_id
                                                  : null
                                              }
                                            >
                                              {orderToUpdate.status !== null ? (
                                                orderToUpdate.status
                                              ) : (
                                                <p>-- Pilih Status --</p>
                                              )}
                                            </option>
                                            <option value="WAITING">
                                              WAITING
                                            </option>
                                            <option value="APPROVED">
                                              APPROVED
                                            </option>
                                            <option value="READY">READY</option>
                                            <option value="PROGRESS">
                                              PROGRESS
                                            </option>
                                            <option value="DONE">DONE</option>
                                            <option value="CANCEL">
                                              CANCEL
                                            </option>
                                            <option value="REJECTED">
                                              REJECTED
                                            </option>
                                          </Form.Select>
                                        </Form.Group>

                                        <Form.Group
                                          className="mb-4"
                                          controlId="exampleForm.ControlTextarea1"
                                        >
                                          <Form.Label>KETERANGAN</Form.Label>
                                          <Form.Control
                                            placeholder={
                                              orderToUpdate.status_description
                                                ? orderToUpdate.status_description
                                                : null
                                            }
                                            as="textarea"
                                            rows={3}
                                            style={{
                                              backgroundColor: "#F5F7FC",
                                              border: "none",
                                              padding: "17px",
                                            }}
                                            onChange={(e) =>
                                              setStatusDesc(e.target.value)
                                            }
                                          />
                                        </Form.Group>

                                        <Button
                                          className="btn__primary"
                                          onClick={handleUpdate}
                                          type="submit"
                                        >
                                          <div className="d-flex gap-2">
                                            Simpan
                                          </div>
                                        </Button>
                                      </>
                                    </Form>
                                  </Col>
                                </Row>
                              </Container>
                            ))
                          : null}
                      </Card.Body>
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
        <Navigate to={-1} />
      )
    ) : (
      SecuringPage()
    )
  ) : (
    <Navigate to="/silakend-login" />
  );
};
