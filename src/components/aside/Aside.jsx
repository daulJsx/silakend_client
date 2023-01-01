import { React } from "react";

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
import { BiDetail } from "react-icons/bi";
import { FaTools } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { FaUserTie } from "react-icons/fa";
import { AiFillCar } from "react-icons/ai";
import { FaBook } from "react-icons/fa";

// assets
import polmanLogo from "./../../assets/polman.webp";

import { Menu, MenuItem, SubMenu } from "react-pro-sidebar";

export const Aside = () => {
  return (
    <main>
      <Nav variant="pills" className="flex-column mb-5 mx-auto" as="ul">
        {/* SIDEBAR BRAND START */}
        <AsideBrand logo={polmanLogo} textBrand="SiLaKend" />
        {/* SIDEBAR BRAND END */}

        {/* SIDEBAR MENU START */}
        <div className="d-flex gap-3 flex-column gap-2 mx-auto ">
          <AsideMenu icon={<RiDashboardFill />} title="Dashboard" link="/" />

          <AsideMenu
            icon={<HiClipboardCopy />}
            title="Order Peminjaman"
            link="/order-peminjaman"
          />

          <Menu>
            <SubMenu className="submenu__title" label="Perbaikan Kendaraan">
              <Nav
                variant="pills"
                className="dropdown__menu d-flex flex-column gap-2"
              >
                <MenuItem className="MenuItem">
                  <AsideMenu
                    icon={<FaTools />}
                    title="Kategori Perbaikan"
                    link="/kategori-perbaikan"
                  />
                </MenuItem>
                <MenuItem className="MenuItem">
                  <AsideMenu
                    icon={<BiDetail />}
                    title="Rincian Perbaikan"
                    link="/rincian-perbaikan"
                  />
                </MenuItem>
              </Nav>
            </SubMenu>
          </Menu>

          <AsideMenu
            icon={<HiUserGroup />}
            title="Data Pengguna"
            link="/data-pengguna"
          />

          <AsideMenu
            icon={<FaUserTie />}
            title="Data Pengemudi"
            link="/data-pengemudi"
          />

          <AsideMenu
            icon={<AiFillCar />}
            title="Data Kendaraan"
            link="/data-kendaraan"
          />

          <AsideMenu
            icon={<FaListAlt />}
            title="Tugas Masuk"
            link="/tugas-masuk"
          />

          <AsideMenu
            icon={<AiFillDashboard />}
            title="Edit KM Kendaraan"
            link="/edit-km-kendaraan"
          />

          <AsideMenu
            icon={<BsCheckCircleFill />}
            title="Validasi Order Masuk"
            link="/validasi-order-masuk"
          />

          <AsideMenu icon={<FaBook />} title="Laporan" link="/laporan" />
        </div>
        {/* SIDEBAR MENU END */}
      </Nav>
    </main>
  );
};
