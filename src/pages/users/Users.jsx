import React from "react";

// fetch data requirement
import { useQuery } from "react-query";
import Fetch from "../consAPI/Fetch";

// bootstrap components
import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";

// Components
import { Aside } from "../../components/aside/Aside";
import { NavTop } from "../../components/navtop/NavTop";
import { Footer } from "../../components/footer/Footer";

import { HiUserGroup } from "react-icons/hi";

import "./../../App.css";
import "./users.css";

function Users() {
  // then using the hook
  const { data, error, isLoading, isError } = useQuery("roles", Fetch);

  // SHOW OFF!!!!
  if (isError) {
    return <div>{error.message}</div>;
  } else if (isLoading) {
    console.log(data);
    return (
      <div className="loading-io">
        <div class="loadingio-spinner-ripple-bc4s1fo5ntn">
          <div class="ldio-c0sicszbk9i">
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <>
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
                      bc={<HiUserGroup />}
                    />
                  ))}
                </Col>
              </Row>
              {/* NAVBAR */}
              <Container fluid>
                <Row>
                  <Col>
                    <main className="min-vh-100">
                      <Card>
                        <Card.Body className="p-0">
                          <Card.Title className="fs-3 p-3 mb-3">
                            {/* Data User */}
                            Roles
                          </Card.Title>
                          <div className="w-full">
                            <Table borderless responsive className="px-2">
                              <thead>
                                <tr>
                                  {/* <th>No</th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>PHONE</th>
                                <th>CITY</th> */}
                                  <th>Role ID</th>
                                  <th>NAME</th>
                                  <th>Level</th>
                                </tr>
                              </thead>
                              <tbody>
                                {/* {data.data.map((users) => (
                                <tr>
                                  <td key={users.id}></td>
                                  <td>{users.name}</td>
                                  <td>{users.email}</td>
                                  <td>{users.phone}</td>
                                  <td>{users.address.city}</td>
                                </tr>
                              ))} */}
                                {data?.data.map((roles) => (
                                  <tr>
                                    <td key={roles.role_id}>{roles.role_id}</td>
                                    <td>{roles.name}</td>
                                    <td>{roles.level}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                          </div>
                        </Card.Body>
                      </Card>
                    </main>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Footer />
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Users;
