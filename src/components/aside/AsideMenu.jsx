import React from "react";

import { NavLink } from "react-router-dom";

// react-bootstrap
import { Nav } from "react-bootstrap";

// CSS
import "./Aside.css";
import "./../../App.css";

export const AsideMenu = ({ icon, title, link }) => {
  return (
    <Nav.Item className="side-menu" as="li">
      <NavLink to={link} exact className="nav-link">
        <div className="d-flex align-items-center gap-3">
          <span className="fs-4">{icon}</span>
          <span>{title}</span>
        </div>
      </NavLink>
    </Nav.Item>
  );
};
