import { React } from "react";

import { NavLink, useLocation } from "react-router-dom";

// React Bootstrap
import { Nav } from "react-bootstrap";

// Components
import { AsideMenu } from "./AsideMenu.jsx";
import { AsideBrand } from "./AsideBrand.jsx";

// CSS
import "./Aside.css";
import "./../../App.css";

// Icons
import { RiDashboardFill } from "react-icons/ri";
import { HiClipboardCopy } from "react-icons/hi";
import { FaListAlt } from "react-icons/fa";
import { AiFillDashboard } from "react-icons/ai";
import { BsCheckCircleFill } from "react-icons/bs";
import { FaTools } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { FaUserTie } from "react-icons/fa";
import { AiFillCar } from "react-icons/ai";
import { FaBook } from "react-icons/fa";

// assets
import polmanLogo from "./../../assets/polman.webp";

export const Aside = () => {
  const pathname = useLocation().pathname;

  return (
    <>
      <main>
        <Nav className="nav nav-pills flex-column mb-5 mx-auto" as="ul">
          {/* SIDEBAR BRAND START */}
          <Nav.Item className="py-5 mx-auto" as="li">
            <AsideBrand logo={polmanLogo} textBrand="SiLaKend" />
          </Nav.Item>
          {/* SIDEBAR BRAND END */}

          {/* SIDEBAR MENU START */}
          <div className="d-flex gap-3 flex-column gap-2 mx-auto ">
            <Nav.Item className="side-menu" as="li">
              <NavLink to={"/"} exact className="nav-link">
                <AsideMenu icon={<RiDashboardFill />} title="Dashboard" />
              </NavLink>
            </Nav.Item>

            {/* <Nav.Item className="side-menu">
              <AsideMenu icon={<HiClipboardCopy />} title="Order Peminjaman" />
            </Nav.Item>

            <Nav.Item className="side-menu">
              <AsideMenu icon={<FaListAlt />} title="Tugas Masuk" />
            </Nav.Item>

            <Nav.Item className="side-menu">
              <AsideMenu icon={<AiFillDashboard />} title="Edit KM Kendaraan" />
            </Nav.Item>

            <Nav.Item className="side-menu">
              <AsideMenu
                icon={<BsCheckCircleFill />}
                title="Validasi Order Masuk"
              />
            </Nav.Item>

            <Nav.Item className="side-menu">
              <AsideMenu icon={<FaTools />} title="Perbaikan Kendaraan" />
            </Nav.Item> */}

            <Nav.Item className="side-menu" as="li">
              <NavLink to={"/users"} exact className="nav-link">
                <AsideMenu icon={<HiUserGroup />} title="Data User" />
              </NavLink>
            </Nav.Item>

            {/* <Nav.Item className="side-menu">
              <AsideMenu icon={<FaUserTie />} title="Data Pengemudi" />
            </Nav.Item>

            <Nav.Item className="side-menu">
              <AsideMenu icon={<AiFillCar />} title="Data Kendaraan" />
            </Nav.Item>

            <Nav.Item className="side-menu">
              <AsideMenu icon={<FaBook />} title="Laporan" />
            </Nav.Item> */}
          </div>
          {/* SIDEBAR MENU END */}
        </Nav>
      </main>
    </>
  );
};
