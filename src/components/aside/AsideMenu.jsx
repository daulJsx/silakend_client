import React from "react";

import { Nav } from "react-bootstrap";

// CSS
import "./Aside.css";
import "./../../App.css";

export const AsideMenu = ({ icon, title }) => {
  return (
    <>
      <Nav.Item>
        <Nav.Link className="d-flex side-menu text-decoration-none">
          <span className="fs-4"> {icon}</span>
          <span className="ms-3 d-none d-sm-inline mt-2">{title}</span>
        </Nav.Link>
      </Nav.Item>
    </>
  );
};
