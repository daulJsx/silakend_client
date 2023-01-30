import React from "react";

// Routing between pages
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

// react-auth-kit
import { AuthProvider } from "react-auth-kit";
import { RequireAuth } from "react-auth-kit";

// CSS
import "./App.css";

// React-bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// Pages
import { Dashboard } from "./pages/Main/Dashboard";

import { Users } from "./pages/Main/Users";
import { CreateUser } from "./pages/CreatePages/CreateUser";
import { UpdateUser } from "./pages/UpdatePages/UpdateUser";
import { UserDetail } from "./pages/Details/UserDetail";

import { VehicleUsages } from "./pages/Main/VehicleUsages";
import { CreateOrder } from "./pages/CreatePages/CreateOrder";
import { UpdateOrder } from "./pages/UpdatePages/UpdateOrder";
import { VehicleUsageDetail } from "./pages/Details/VehicleUsageDetail";
import { VehicleUsageHistory } from "./pages/Main/VehicleUsageHistory";
import { VUHistoryDetail } from "./pages/Details/VUHistoryDetail";

import { Vehicles } from "./pages/Main/Vehicles";
import { CreateVehicle } from "./pages/CreatePages/CreateVehicle";
import { UpdateVehicle } from "./pages/UpdatePages/UpdateVehicle";
import { VehicleDetail } from "./pages/Details/VehicleDetail";

import { Drivers } from "./pages/Main/Drivers";

import { VehicleMaintenances } from "./pages/Main/VehicleMaintenances";
import { CreateVM } from "./pages/CreatePages/CreateVM";
import { UpdateVM } from "./pages/UpdatePages/UpdateVM";
import { CreateVMDetail } from "./pages/CreatePages/CreateVMDetail";
import { UpdateVMDetail } from "./pages/UpdatePages/UpdateVMDetail";
import { VehicleMaintenancesDetail } from "./pages/Details/VehicleMaintenanceDetail";

import { JobUnits } from "./pages/Main/JobUnits";
import { CreateJobUnit } from "./pages/CreatePages/CreateJobUnit";
import { UpdateJobUnit } from "./pages/UpdatePages/UpdateJobUnit";

import { Roles } from "./pages/Main/Roles";
import { CreateRole } from "./pages/CreatePages/CreateRole";
import { UpdateRole } from "./pages/UpdatePages/UpdateRole";

import { UsageCategories } from "./pages/Main/UsageCategories";
import { CreateUsageCategories } from "./pages/CreatePages/CreateUsageCategories";
import { UpdateUsageCategories } from "./pages/UpdatePages/UpdateUsageCategories";

import { VehicleCategories } from "./pages/Main/VehicleCategories";
import { CreateVehicleCat } from "./pages/CreatePages/CreateVehicleCat";
import { UpdateVehicleCat } from "./pages/UpdatePages/UpdateVehicleCat";

import { Login } from "./pages/auth/Login";

// ---------------------- USER AS USER ---------------------------
import { UserCreateVU } from "./pages/asUser/UserCreateVU";
import { UserVUDetail } from "./pages/asUser/UserVUDetail";
import { MainUser } from "./pages/asUser/MainUser";
import { UserEditVU } from "./pages/asUser/UserEditVU";
import { UserHistory } from "./pages/asUser/UserHistory";

// ---------------------- USER AS VERIFIER -----------------------
import { MainVerifier } from "./pages/asVerifier/MainVerifier";
import { VerifierVUDetail } from "./pages/asVerifier/VerifierDetailVU";
import { VerifierHistory } from "./pages/asVerifier/VerifierHistory";
import { VerifierCreateVU } from "./pages/asVerifier/VerifierCreateVU";
import { VerifierSelfVU } from "./pages/asVerifier/VerifierSelfVU";
import { EmpVUDetail } from "./pages/asVerifier/EmpVUDetail";

// ---------------------- USER AS DRIVER -----------------------
import { MainDriver } from "./pages/asDriver/MainDriver";
import { DriverHistory } from "./pages/asDriver/DriverHistory";
import { TaskInfo } from "./pages/asDriver/TaskInfo";

function App() {
  return (
    <>
      <AuthProvider
        authType={"cookie"}
        authName={"_auth"}
        cookieDomain={window.location.hostname}
        cookieSecure={false}
      >
        <Router>
          <Routes>
            {/*------------------------------- START USER AS ADMIN PAGES-------------------------------- */}

            {/*----- START DASHBOARD PAGES---- */}

            <Route exact path="/" element={<Dashboard />} />
            {/*----- END DASHBOARD PAGES---- */}

            {/*----- START USER PAGES---- */}
            <Route exact path="/data-pengguna" element={<Users />} />
            <Route
              path="/data-pengguna/tambah-pengguna"
              element={<CreateUser />}
            />
            <Route
              path="/data-pengguna/edit-pengguna"
              element={<UpdateUser />}
            />
            <Route
              path="/data-pengguna/rincian-pengguna"
              element={<UserDetail />}
            />
            {/*----- END USER PAGES---- */}

            {/*----- START ORDER CATEGORIES PAGES---- */}
            <Route
              exact
              path="/kategori-peminjaman"
              element={<UsageCategories />}
            />
            <Route
              path="/kategori-peminjaman/tambah-kategori-peminjaman"
              element={<CreateUsageCategories />}
            />
            <Route
              path="/kategori-peminjaman/edit-kategori-peminjaman"
              element={<UpdateUsageCategories />}
            />
            {/*----- END ORDER CATEGORIES PAGES---- */}

            {/*----- START ORDER PAGES---- */}
            <Route
              exact
              path="/pengajuan-peminjaman"
              element={<VehicleUsages />}
            />
            <Route
              path="/pengajuan-peminjaman/buat-pengajuan"
              element={<CreateOrder />}
            />
            <Route
              path="/pengajuan-peminjaman/edit-pengajuan"
              element={<UpdateOrder />}
            />
            <Route
              path="/pengajuan-peminjaman/rincian-pengajuan"
              element={<VehicleUsageDetail />}
            />
            <Route
              exact
              path="/riwayat-peminjaman"
              element={<VehicleUsageHistory />}
            />
            <Route
              path="/riwayat-peminjaman/rincian-peminjaman"
              element={<VUHistoryDetail />}
            />
            {/*----- END ORDER PAGES---- */}

            {/*----- START VM PAGES---- */}
            <Route
              exact
              path="/perbaikan-kendaraan"
              element={
                <RequireAuth loginPath={"/silakend-login"}>
                  <VehicleMaintenances />
                </RequireAuth>
              }
            />
            <Route
              path="/perbaikan-kendaraan/tambah-perbaikan-kendaraan"
              element={
                <RequireAuth loginPath={"/silakend-login"}>
                  <CreateVM />
                </RequireAuth>
              }
            />
            <Route
              path="/perbaikan-kendaraan/edit-perbaikan-kendaraan"
              element={
                <RequireAuth loginPath={"/silakend-login"}>
                  <UpdateVM />
                </RequireAuth>
              }
            />
            <Route
              path="/perbaikan-kendaraan/rincian-perbaikan-kendaraan"
              element={
                <RequireAuth loginPath={"/silakend-login"}>
                  <VehicleMaintenancesDetail />
                </RequireAuth>
              }
            />
            <Route
              path="/perbaikan-kendaraan/rincian-perbaikan-kendaraan/tambah-rincian"
              element={
                <RequireAuth loginPath={"/silakend-login"}>
                  <CreateVMDetail />
                </RequireAuth>
              }
            />
            <Route
              path="/perbaikan-kendaraan/rincian-perbaikan-kendaraan/edit-rincian"
              element={
                <RequireAuth loginPath={"/silakend-login"}>
                  <UpdateVMDetail />
                </RequireAuth>
              }
            />
            {/*----- END VM PAGES---- */}

            {/*----- START DRIVER PAGES---- */}
            <Route path="/data-pengemudi" element={<Drivers />} />
            {/*----- END DRIVER PAGES---- */}

            {/*----- START VEHICLE PAGES---- */}
            <Route exact path="/data-kendaraan" element={<Vehicles />} />
            <Route
              path="/data-kendaraan/tambah-kendaraan"
              element={<CreateVehicle />}
            />
            <Route
              path="/data-kendaraan/edit-kendaraan"
              element={<UpdateVehicle />}
            />
            <Route
              path="/data-kendaraan/rincian-kendaraan"
              element={<VehicleDetail />}
            />
            {/*----- END VEHICLE PAGES---- */}

            {/*----- START VEHICLE PAGES---- */}
            <Route
              exact
              path="/kategori-kendaraan"
              element={<VehicleCategories />}
            />
            <Route
              path="/kategori-kendaraan/tambah-kategori-kendaraan"
              element={<CreateVehicleCat />}
            />
            <Route
              path="/kategori-kendaraan/edit-kategori-kendaraan"
              element={<UpdateVehicleCat />}
            />
            {/*----- END VEHICLE PAGES---- */}

            {/*----- START JOB UNITS PAGES---- */}
            <Route
              exact
              path="/unit-kerja"
              element={
                <RequireAuth loginPath={"/silakend-login"}>
                  <JobUnits />
                </RequireAuth>
              }
            />
            <Route
              path="/unit-kerja/tambah-unit-kerja"
              element={
                <RequireAuth loginPath={"/silakend-login"}>
                  <CreateJobUnit />
                </RequireAuth>
              }
            />
            <Route
              path="/unit-kerja/edit-unit-kerja"
              element={
                <RequireAuth loginPath={"/silakend-login"}>
                  <UpdateJobUnit />
                </RequireAuth>
              }
            />
            {/*----- END JOB UNITS PAGES---- */}

            {/*----- START ROLE PAGES---- */}
            <Route exact path="/data-peran" element={<Roles />} />
            <Route path="/data-peran/tambah-peran" element={<CreateRole />} />
            <Route path="/data-peran/edit-peran" element={<UpdateRole />} />
            {/*----- END ROLE PAGES---- */}
            {/*------------------------------- END USER AS ADMIN PAGES-------------------------------- */}

            {/*----- START AUTH PAGES---- */}
            <Route path="/silakend-login" element={<Login />} />

            {/*----- END AUTH PAGES---- */}

            {/*------------------------------- START USER AS VERIFIER PAGES-------------------------------- */}
            <Route
              exact
              path="/verifier/pengajuan-pegawai"
              element={<MainVerifier />}
            />
            <Route
              exact
              path="/verifier/pengajuan-saya"
              element={<VerifierSelfVU />}
            />
            <Route
              path="/verifier/pengajuan-saya/rincian-pengajuan"
              element={<VerifierVUDetail />}
            />
            <Route
              path="/verifier/pengajuan-pegawai/rincian-pengajuan"
              element={<EmpVUDetail />}
            />
            <Route
              path="/verifier/riwayat-pengajuan"
              element={<VerifierHistory />}
            />
            <Route
              path="/verifier/buat-pengajuan"
              element={<VerifierCreateVU />}
            />

            {/*------------------------------- END USER AS VERIFIER PAGES-------------------------------- */}

            {/*------------------------------- START USER AS DRIVER PAGES-------------------------------- */}
            <Route exact path="/driver/tugas-masuk" element={<MainDriver />} />
            <Route
              exact
              path="/driver/riwayat-tugas"
              element={<DriverHistory />}
            />
            <Route
              exact
              path="/driver/tugas-masuk/rincian-tugas"
              element={<TaskInfo />}
            />
            {/*------------------------------- END USER AS DRIVER PAGES-------------------------------- */}

            {/*------------------------------- START USER AS USER PAGES-------------------------------- */}
            <Route exact path="/user/pengajuan-saya" element={<MainUser />} />
            <Route path="/user/buat-pengajuan" element={<UserCreateVU />} />
            <Route
              path="/user/pengajuan-saya/rincian-pengajuan"
              element={<UserVUDetail />}
            />
            <Route
              path="/user/pengajuan-saya/edit-pengajuan"
              element={<UserEditVU />}
            />
            <Route path="/user/riwayat-pengajuan" element={<UserHistory />} />
            {/*------------------------------- END USER AS USER PAGES-------------------------------- */}
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
