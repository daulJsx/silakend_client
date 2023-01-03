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
import { CgHomeAlt } from "react-icons/cg";
import { HiOutlineClipboardCopy } from "react-icons/hi";
import { RiCommunityLine } from "react-icons/ri";
import { FiTool } from "react-icons/fi";
import { BiCog } from "react-icons/bi";
import { TbUsers } from "react-icons/tb";
import { FaUserTie } from "react-icons/fa";
import { RiCarLine } from "react-icons/ri";
import { CgUserList } from "react-icons/cg";
import { HiOutlineClipboardList } from "react-icons/hi";
import { RiCarWashingLine } from "react-icons/ri";

// assets
import polmanLogo from "./../../assets/polman.webp";

// import { Menu, MenuItem, SubMenu } from "react-pro-sidebar";

export const Aside = () => {
  return (
    <Nav variant="pills" className="nav-pills flex-column" as="ul">
      {/* SIDEBAR BRAND START */}
      <AsideBrand logo={polmanLogo} textBrand="SiLaKend" />
      {/* SIDEBAR BRAND END */}

      {/* SIDEBAR MENU START */}
      <div className="d-flex gap-3 flex-column mx-auto ">
        <AsideMenu icon={<CgHomeAlt />} title="Beranda" link="/" />

        <AsideMenu
          icon={<HiOutlineClipboardList />}
          title="Kategori Peminjaman"
          link="/kategori-peminjaman"
        />

        <AsideMenu
          icon={<HiOutlineClipboardCopy />}
          title="Order Peminjaman"
          link="/order-peminjaman"
        />

        <AsideMenu
          icon={<BiCog />}
          title="Kategori Perbaikan"
          link="/kategori-perbaikan"
        />

        <AsideMenu
          icon={<FiTool />}
          title="Rincian Perbaikan"
          link="/rincian-perbaikan"
        />

        <AsideMenu
          icon={<TbUsers />}
          title="Data Pengguna"
          link="/data-pengguna"
        />

        <AsideMenu
          icon={<CgUserList />}
          title="Peran Pengguna"
          link="/data-peran"
        />

        <AsideMenu
          icon={<FaUserTie />}
          title="Data Pengemudi"
          link="/data-pengemudi"
        />

        <AsideMenu
          icon={<RiCarWashingLine />}
          title="Kategori Kendaraan"
          link="/kategori-kendaraan"
        />

        <AsideMenu
          icon={<RiCarLine />}
          title="Data Kendaraan"
          link="/data-kendaraan"
        />

        <AsideMenu
          icon={<RiCommunityLine />}
          title="Unit Kerja"
          link="/unit-kerja"
        />
      </div>
      {/* SIDEBAR MENU END */}
    </Nav>
  );
};
