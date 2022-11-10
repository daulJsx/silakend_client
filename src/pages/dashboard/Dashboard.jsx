import React from "react";

// fetch data requirement
// import { useQuery } from "react-query";
// import Fetch from "./../consAPI/Fetch";

// bootstrap components
import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";

// Components
import { Aside } from "./../../components/aside/Aside";
import { NavTop } from "../../components/navtop/NavTop";
import { Footer } from "../../components/footer/Footer";

import { RiDashboardFill } from "react-icons/ri";

import "./dash.css";

function Dashboard() {
  // SHOW OFF!!!!
  // if (isError) {
  //   return <div>{error.message}</div>;
  // } else if (isLoading) {
  //   return <div>Loading...</div>;
  // } else {
  //   return (
  //     <>
  //       <Container fluid>
  //         <Row>
  //           {/* SIDEBAR */}
  //           <Col
  //             xs="auto"
  //             className="sidebar d-none d-lg-block d-md-block d-xl-block d-flex min-vh-100 px-4"
  //           >
  //             <Aside />
  //           </Col>
  //           {/* SIDEBAR */}

  //           <Col>
  //             {/* NAVBAR */}
  //             <Row>
  //               <Col>
  //                 {["end"].map((placement, idx) => (
  //                   <NavTop key={idx} placement={placement} name={placement} />
  //                 ))}
  //               </Col>
  //             </Row>
  //             {/* NAVBAR */}
  //             <Container fluid>
  //               <Row>
  //                 <Col>
  //                   <main className="min-vh-100">
  //                     <Card className="p-2">
  //                       <Card.Body>This is dashboard</Card.Body>
  //                     </Card>
  //                   </main>
  //                 </Col>
  //               </Row>
  //               <Row>
  //                 <Col>
  //                   <footer>
  //                     <nav className="footer sticky-bottom text-center">
  //                       this is footer
  //                     </nav>
  //                   </footer>
  //                 </Col>
  //               </Row>
  //             </Container>
  //           </Col>
  //         </Row>
  //       </Container>
  //     </>
  //   );
  // }

  return (
    <>
      <Container fluid>
        <main className="dashboard">
          <Row>
            <Col
              xs="auto"
              className="d-none d-lg-block d-md-block d-xl-block d-flex min-vh-100 px-4"
            >
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
                      bc={<RiDashboardFill />}
                    />
                  ))}
                </Col>
              </Row>
              {/* NAVBAR */}
              <Container fluid>
                <Row>
                  <Col>
                    <main className="min-vh-100">
                      <Card className="p-2">
                        <Card.Body>This is dashboard</Card.Body>
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
        </main>
      </Container>
    </>
  );
}

export default Dashboard;
