import React from "react";

import { NavLink } from "react-router-dom";

// react-bootstrap
import { Nav } from "react-bootstrap";

// CSS
import "./Aside.css";
import "./../../App.css";

export const AsideMenu = ({ icon, title, link, styleSelf }) => {
  return (
    <Nav.Item className="side-menu" as="li">
      <NavLink to={link} exact className="nav-link">
        <div className="d-flex">
          <span className={styleSelf}>
            <span className="fs-4"> {icon}</span>
            <span className="ms-3 mt-2">{title}</span>
          </span>
        </div>
      </NavLink>
    </Nav.Item>
  );
};
