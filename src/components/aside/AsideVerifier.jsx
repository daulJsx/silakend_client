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
import { HiOutlineClipboardList } from "react-icons/hi";
import { FiClock } from "react-icons/fi";
import { FiUsers } from "react-icons/fi";
import { FiSend } from "react-icons/fi";

// assets
import polmanLogo from "./../../assets/polman.webp";

// import { Menu, MenuItem, SubMenu } from "react-pro-sidebar";

export const AsideVerifier = () => {
  return (
    <Nav variant="pills" className="nav-pills flex-column" as="ul">
      {/* SIDEBAR BRAND START */}
      <AsideBrand logo={polmanLogo} textBrand="SiLaKend" />
      {/* SIDEBAR BRAND END */}

      {/* SIDEBAR MENU START */}
      <div className="d-flex gap-3 flex-column mx-auto ">
        <AsideMenu
          icon={<FiSend />}
          title="Buat Pengajuan"
          link="/verifier/buat-pengajuan"
        />
        <AsideMenu
          icon={<HiOutlineClipboardList />}
          title="Data Pengajuan Saya"
          link="/verifier/pengajuan-saya"
        />

        <AsideMenu
          icon={<FiUsers />}
          title="Data Pengajuan Pegawai"
          link="/verifier/pengajuan-pegawai"
        />

        <AsideMenu
          icon={<FiClock />}
          title="Riwayat Pengajuan "
          link="/verifier/riwayat-pengajuan"
        />
      </div>
      {/* SIDEBAR MENU END */}
    </Nav>
  );
};
