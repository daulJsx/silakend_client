import React, { useEffect } from "react";

// Push notify
import Push from "push.js";

// fetch data requirement
import { useQuery } from "react-query";
import FetchVehicleUsages from "../../consAPI/FetchVehicleUsages";

// Cookies JS
import Cookies from "js-cookie";

// Navigating
import { NavLink } from "react-router-dom";
import { Navigate } from "react-router-dom";

// Bootstrap components
import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Breadcrumb from "react-bootstrap/Breadcrumb";

// Components
import MUIDataTable from "mui-datatables";
import { Aside } from "../../components/aside/Aside";
import { NavTop } from "../../components/navtop/NavTop";
import { Footer } from "../../components/footer/Footer";

// Icons
import { HiOutlineClipboardCopy } from "react-icons/hi";
import { HiPlusSm } from "react-icons/hi";
import { AiFillEdit } from "react-icons/ai";
import { FaInfo } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";

// Functions
import { GetOrderId } from "../../functions/GetOrderId";
import { SecuringPage } from "../../functions/Securing/SecuringPage";

// For checking user have done in authentication
import { useAuthUser } from "react-auth-kit";

export const VehicleUsages = () => {
  // Listener
  // useEffect(() => {
  //   window.Echo.channel("vehicleusage").listen("VehicleUsageUpdate", (e) => {
  //     Push.create("Info Data Peminjaman", {
  //       body: e.vehicleUsage,
  //       icon: "/polman.ico",
  //       timeout: 4000,
  //       onClick: function () {
  //         window.focus();
  //         this.close();
  //       },
  //     });
  //     // Setelah tampil, refetch data
  //     FetchVehicleUsages();
  //   });
  // }, []);

  const auth = useAuthUser();
  // Fetching orders data
  const {
    data: ordersData,
    error,
    isLoading,
    isError,
  } = useQuery("orders", FetchVehicleUsages);

  // Get access token
  const token = Cookies.get("token");

  const columns = [
    {
      name: "No",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div>{tableMeta.rowIndex + 1}</div>;
        },
      },
    },
    {
      name: "peminjam",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return ordersData[tableMeta.rowIndex]["user"]["name"];
        },
      },
    },
    {
      name: "Waktu Pinjam",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const orders = ordersData[tableMeta.rowIndex];
          const startDate = new Date(orders.start_date);
          const endDate = new Date(orders.end_date);

          const startOptions = {
            year: "numeric",
            month: "long",
            day: "numeric",
          };
          const endOptions = {
            year: "numeric",
            month: "long",
            day: "numeric",
          };

          const formattedStartDate = startDate.toLocaleDateString(
            "id-ID",
            startOptions
          );
          const formattedEndDate = endDate.toLocaleDateString(
            "id-ID",
            endOptions
          );

          return (
            <>
              {formattedStartDate} - {formattedEndDate}
            </>
          );
        },
      },
    },
    {
      name: "destinasi",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return ordersData[tableMeta.rowIndex]["destination"];
        },
      },
    },
    {
      name: "status",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          let bgColor = "";
          let text = "";

          if (value === "CANCELED") {
            bgColor = "danger";
            text = "Batal";
          } else if (value === "REJECTED") {
            bgColor = "danger";
            text = "Ditolak";
          } else if (value === "WAITING") {
            bgColor = "warning";
            text = "Diajukan";
          } else if (value === "READY") {
            bgColor = "primary";
            text = "Siap berangkat";
          } else if (value === "APPROVED") {
            bgColor = "info";
            text = "Disetujui";
          } else if (value === "PROGRESS") {
            bgColor = "secondary";
            text = "Berlangsung";
          } else {
            bgColor = "success";
            text = "Selesai";
          }

          return <Badge bg={bgColor}>{text}</Badge>;
        },
      },
    },
    {
      name: "aksi",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          const order = ordersData[tableMeta.rowIndex];
          if (order.status !== "DONE") {
            return (
              <NavLink to={"/pengajuan-peminjaman/edit-data-pengajuan"}>
                <Button
                  onClick={() => GetOrderId(order)}
                  className="btn-warning btn-edit position-relative"
                >
                  <AiFillEdit className="fs-6" />
                </Button>
              </NavLink>
            );
          }
          return null;
        },
      },
    },
    {
      name: "rincian",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          const order = ordersData[tableMeta.rowIndex];
          return (
            <NavLink to={"/pengajuan-peminjaman/rincian-pengajuan"}>
              <Button
                onClick={() => GetOrderId(order)}
                className="btn-primary btn-detail"
              >
                <FaInfo className="fs-6" />
              </Button>
            </NavLink>
          );
        },
      },
    },
  ];

  const options = {
    filterType: "dropdown",
    responsive: "scrollMaxHeight",
    selectableRows: "none",
    viewColumns: false,
  };

  return token ? (
    auth().user_level === 1 || auth().user_level === 2 ? (
      isError ? (
        <div>{error.message}</div>
      ) : isLoading ? (
        <div className="loading-io">
          <div className="loadingio-spinner-ripple-bc4s1fo5ntn">
            <div className="ldio-c0sicszbk9i">
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      ) : (
        <Container fluid>
          <Row>
            <Col xs="auto" className="d-none d-lg-block d-flex min-vh-100 px-4">
              <Aside />
            </Col>
            <Col>
              {/* NAVBAR */}
              <Row>
                <Col>
                  {["end"].map((placement, idx) => (
                    <NavTop
                      key={idx}
                      placement={placement}
                      name={placement}
                      bc={<HiOutlineClipboardCopy />}
                    />
                  ))}
                </Col>
              </Row>
              {/* NAVBAR */}

              <main className="px-2 min-vh-100 mt-4">
                <Row>
                  <Col>
                    <Card className="bg__primary">
                      <Card.Header>
                        <Container>
                          <Row className="gap-3 mt-4 me-3">
                            <Col>
                              <h3 className="main__title">
                                Pengajuan Peminjaman Kendaraan Dinas
                              </h3>
                              <Breadcrumb className="breadcrumb__item mt-3">
                                <Breadcrumb.Item
                                  className="breadcrumb__item"
                                  href="#"
                                >
                                  <div className="d-flex color-primary justify-content-center align-items-center gap-2 breadcrumb__text">
                                    <HiOutlineClipboardCopy className="fs-5" />
                                    Data
                                    <FiChevronRight className="fs-6 breadcrumb__divider" />
                                  </div>
                                </Breadcrumb.Item>
                              </Breadcrumb>
                            </Col>
                            <Col md={2}>
                              <NavLink
                                to={"/pengajuan-peminjaman/buat-pengajuan"}
                              >
                                <Button className="btn btn-add d-flex gap-1 align-items-center justify-content-center">
                                  Tambah
                                  <HiPlusSm className="fs-3" />
                                </Button>
                              </NavLink>
                            </Col>
                          </Row>
                        </Container>
                      </Card.Header>
                      <Card.Body className="p-4">
                        {/* <Container className="p-4">
                          <Row>
                            <Col>
                              <Table hover responsive>
                                <thead>
                                  <tr>
                                    <th>No</th>
                                    <th>peminjam</th>
                                    <th>waktu pinjam</th>
                                    <th>destinasi</th>
                                    <th>status</th>
                                    <th>aksi</th>
                                    <th>rincian</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {ordersData?.map((orders, index) => {
                                    const startDate = new Date(
                                      orders.start_date
                                    );
                                    const endDate = new Date(orders.end_date);

                                    // Date formatter
                                    const startOptions = {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    };
                                    const endOptions = {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    };

                                    const formattedStartDate =
                                      startDate.toLocaleDateString(
                                        "id-ID",
                                        startOptions
                                      );
                                    const formattedEndDate =
                                      endDate.toLocaleDateString(
                                        "id-ID",
                                        endOptions
                                      );
                                    return orders.status !== "DONE" ? (
                                      <tr key={orders.usage_id}>
                                        <td>{index + 1}</td>
                                        <td>{orders.user.name}</td>
                                        <td>
                                          {formattedStartDate} -{" "}
                                          {formattedEndDate}
                                        </td>
                                        <td>{orders.destination}</td>
                                        <td>
                                          <Badge
                                            bg={
                                              orders.status === "CANCELED" ||
                                              orders.status === "REJECTED"
                                                ? "danger"
                                                : orders.status === "WAITING"
                                                ? "warning"
                                                : orders.status === "READY"
                                                ? "primary"
                                                : orders.status === "APPROVED"
                                                ? "info"
                                                : orders.status === "PROGRESS"
                                                ? "secondary"
                                                : "success"
                                            }
                                          >
                                            {orders.status === "CANCELED"
                                              ? "Batal"
                                              : orders.status === "REJECTED"
                                              ? "Ditolak"
                                              : orders.status === "WAITING"
                                              ? "Diajukan"
                                              : orders.status === "READY"
                                              ? "Siap berangkat"
                                              : orders.status === "APPROVED"
                                              ? "Disetujui"
                                              : orders.status === "PROGRESS"
                                              ? "Berlangsung"
                                              : "Selesai"}
                                          </Badge>
                                        </td>

                                        <td>
                                          {orders.status !== "CANCELED" ? (
                                            <NavLink
                                              to={
                                                auth().user_level === 1
                                                  ? "/pengajuan-peminjaman/edit-data-pengajuan"
                                                  : "/pengajuan-peminjaman/edit-pengajuan"
                                              }
                                            >
                                              <Button
                                                onClick={() =>
                                                  GetOrderId(orders)
                                                }
                                                className="btn-warning btn-edit position-relative"
                                              >
                                                {orders.vehicle ||
                                                orders.driver ||
                                                orders.status ===
                                                  "REJECTED" ? null : (
                                                  <Badge
                                                    className="position-absolute top-0 start-100 translate-middle rounded-pill"
                                                    bg="danger"
                                                  >
                                                    !
                                                  </Badge>
                                                )}
                                                <AiFillEdit className="fs-6" />
                                              </Button>
                                            </NavLink>
                                          ) : null}
                                        </td>

                                        <td>
                                          <>
                                            <NavLink
                                              to={
                                                "/pengajuan-peminjaman/rincian-pengajuan"
                                              }
                                            >
                                              <Button
                                                onClick={() =>
                                                  GetOrderId(orders)
                                                }
                                                className="btn-primary btn-detail"
                                              >
                                                <FaInfo className="fs-6" />
                                              </Button>
                                            </NavLink>
                                          </>
                                        </td>
                                      </tr>
                                    ) : null;
                                  })}
                                </tbody>
                              </Table>
                            </Col>
                          </Row>
                        </Container> */}
                        <MUIDataTable
                          data={ordersData}
                          columns={columns}
                          options={options}
                        />
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
      )
    ) : (
      SecuringPage()
    )
  ) : (
    <Navigate to="/silakend-login" />
  );
};
