import React from "react";

// react-bootstrap
import { Nav } from "react-bootstrap";

// CSS
import "./Aside.css";
import "./../../App.css";

export const AsideMenu = ({ icon, title }) => {
  return (
    <>
      <div className=" d-flex">
        <span className="fs-4"> {icon}</span>
        <span className="ms-3 mt-2">{title}</span>
      </div>
    </>
  );
};
