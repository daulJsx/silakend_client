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

import { TbSteeringWheel } from "react-icons/tb";
import { FiClock } from "react-icons/fi";

// assets
import polmanLogo from "./../../assets/polman.webp";

// import { Menu, MenuItem, SubMenu } from "react-pro-sidebar";

export const AsideDriver = () => {
  return (
    <Nav variant="pills" className="nav-pills flex-column" as="ul">
      {/* SIDEBAR BRAND START */}
      <AsideBrand logo={polmanLogo} textBrand="SiLaKend" />
      {/* SIDEBAR BRAND END */}

      {/* SIDEBAR MENU START */}
      <div className="d-flex gap-3 flex-column mx-auto ">
        <AsideMenu
          icon={<TbSteeringWheel />}
          title="Daftar Tugas Masuk"
          link="/driver/tugas-masuk"
        />

        <AsideMenu
          icon={<FiClock />}
          title="Riwayat Tugas "
          link="/driver/riwayat-tugas"
        />
      </div>
      {/* SIDEBAR MENU END */}
    </Nav>
  );
};
