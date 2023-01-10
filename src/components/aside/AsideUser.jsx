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
import { TbClipboardPlus } from "react-icons/tb";
import { HiOutlineClipboardList } from "react-icons/hi";

// assets
import polmanLogo from "./../../assets/polman.webp";

// import { Menu, MenuItem, SubMenu } from "react-pro-sidebar";

export const AsideUser = () => {
  return (
    <Nav variant="pills" className="nav-pills flex-column" as="ul">
      {/* SIDEBAR BRAND START */}
      <AsideBrand logo={polmanLogo} textBrand="SiLaKend" />
      {/* SIDEBAR BRAND END */}

      {/* SIDEBAR MENU START */}
      <div className="d-flex gap-3 flex-column mx-auto ">
        <AsideMenu
          icon={<TbClipboardPlus />}
          title="Buat Pengajuan"
          link="/user/pengajuan-peminjaman"
        />

        <AsideMenu
          icon={<HiOutlineClipboardList />}
          title="Data Pengajuan Peminjaman"
          link="/user/data-pengajuan-peminjaman"
        />
      </div>
      {/* SIDEBAR MENU END */}
    </Nav>
  );
};
