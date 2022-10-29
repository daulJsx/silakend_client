import React from "react";

// React Bootstrap
import { Nav, Navbar } from "react-bootstrap";

// Components
import { AsideMenu } from "./AsideMenu.jsx";

// CSS
import "./Aside.css";
import "./../../App.css";

// Icons
import { RiDashboardFill } from "react-icons/ri";
import { MdTableChart } from "react-icons/md";
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
  return (
    <>
      <Nav className="flex-column mb-5 mx-auto">
        {/* SIDEBAR BRAND START */}
        <Nav.Item className="silakend py-5 mx-auto">
          <Navbar.Brand
            href="/"
            className="d-flex mb-md-0 me-md-auto brand-icon"
          >
            <img src={polmanLogo} alt="Polman Logo" className="polman-logo" />
            <span className="color-primary ms-2 d-none d-sm-inline fw-bold fs-5">
              SiLaKend
            </span>
          </Navbar.Brand>
        </Nav.Item>
        {/* SIDEBAR BRAND END */}

        {/* SIDEBAR MENU START */}
        <div className="d-flex gap-3 flex-column side-content gap-2 mx-auto w-100">
          <AsideMenu icon={<RiDashboardFill />} title="Dashboard" />
          <AsideMenu icon={<HiClipboardCopy />} title="Order Peminjaman" />
          <AsideMenu icon={<FaListAlt />} title="Tugas Masuk" />
          <AsideMenu icon={<AiFillDashboard />} title="Edit KM Kendaraan" />
          <AsideMenu
            icon={<BsCheckCircleFill />}
            title=" Validasi Order Masuk"
          />
          <AsideMenu icon={<MdTableChart />} title="Rekaman Order" />
          <AsideMenu icon={<FaTools />} title="Perbaikan Kendaraan" />
          <AsideMenu icon={<HiUserGroup />} title="Data User" />
          <AsideMenu icon={<FaUserTie />} title=" Data Pengemudi" />
          <AsideMenu icon={<AiFillCar />} title="Data Kendaraan" />
          <AsideMenu icon={<FaBook />} title="Laporan" />
        </div>
        {/* SIDEBAR MENU END */}
      </Nav>
    </>
  );
};
