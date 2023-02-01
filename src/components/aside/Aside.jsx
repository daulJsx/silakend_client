import { React } from "react";

// get current user auth data
import { useAuthUser } from "react-auth-kit";

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
import { BiCog } from "react-icons/bi";
import { TbUsers } from "react-icons/tb";
import { FaUserTie } from "react-icons/fa";
import { RiCarLine } from "react-icons/ri";
import { CgUserList } from "react-icons/cg";
import { HiOutlineClipboardList } from "react-icons/hi";
import { RiCarWashingLine } from "react-icons/ri";
import { FiClock } from "react-icons/fi";
import { MdAssignmentInd } from "react-icons/md";

// assets
import polmanLogo from "./../../assets/polman.webp";

// import { Menu, MenuItem, SubMenu } from "react-pro-sidebar";

export const Aside = () => {
  const auth = useAuthUser();

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
          icon={<MdAssignmentInd />}
          title="Pengajuan Anda"
          link="/pengajuan-saya"
        />

        <AsideMenu
          icon={<HiOutlineClipboardCopy />}
          title="Pengajuan Peminjaman"
          link="/pengajuan-peminjaman"
        />

        <AsideMenu
          icon={<FiClock />}
          title="Riwayat Peminjaman "
          link="/riwayat-peminjaman"
        />

        <AsideMenu
          icon={<BiCog />}
          title="Perbaikan Kendaraan"
          link="/perbaikan-kendaraan"
        />

        {auth().user_level === 1 ? (
          <>
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
          </>
        ) : null}

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

        {auth().user_level === 1 ? (
          <>
            <AsideMenu
              icon={<RiCommunityLine />}
              title="Unit Kerja"
              link="/unit-kerja"
            />
          </>
        ) : null}
      </div>
      {/* SIDEBAR MENU END */}
    </Nav>
  );
};
