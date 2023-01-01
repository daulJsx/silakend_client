import React from "react";

// Routing between pages
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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

import { VehicleUsages } from "./pages/Main/VehicleUsages";
import { CreateOrder } from "./pages/CreatePages/CreateOrder";
import { UpdateOrder } from "./pages/UpdatePages/UpdateOrder";

import { Vehicles } from "./pages/Main/Vehicles";
import { CreateVehicle } from "./pages/CreatePages/CreateVehicle";
import { UpdateVehicle } from "./pages/UpdatePages/UpdateVehicle";

import { Drivers } from "./pages/Main/Drivers";

import { VehicleMaintenances } from "./pages/Main/VehicleMaintenances";
import { CreateVM } from "./pages/CreatePages/CreateVM";
import { UpdateVM } from "./pages/UpdatePages/UpdateVM";
import { VehicleMDetails } from "./pages/Main/VehicleMDetails";
import { CreateVMDetail } from "./pages/CreatePages/CreateVMDetail";

import { TasksIn } from "./pages/tasks/TasksIn";
import { VehiclesKM } from "./pages/vehiclesKM/VehiclesKM";
import { Validations } from "./pages/validations/Validations";
import { Reports } from "./pages/reports/Reports";
import { Login } from "./pages/auth/Login";

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
            {/*----- START DASHBOARD PAGES---- */}
            <Route path="/" element={<Dashboard />} />
            {/*----- END DASHBOARD PAGES---- */}

            {/*----- START USER PAGES---- */}
            <Route path="/data-pengguna" element={<Users />} />
            <Route
              path="/data-pengguna/tambah-pengguna"
              element={<CreateUser />}
            />
            <Route
              path="/data-pengguna/edit-pengguna"
              element={<UpdateUser />}
            />
            {/*----- END USER PAGES---- */}

            {/*----- START ORDER PAGES---- */}
            <Route path="/order-peminjaman" element={<VehicleUsages />} />
            <Route
              path="/order-peminjaman/buat-order"
              element={<CreateOrder />}
            />
            <Route
              path="/order-peminjaman/edit-order"
              element={<UpdateOrder />}
            />
            {/*----- END ORDER PAGES---- */}

            {/*----- START VM PAGES---- */}
            <Route
              path="/kategori-perbaikan"
              element={
                <RequireAuth loginPath={"/silakend-login"}>
                  <VehicleMaintenances />
                </RequireAuth>
              }
            />
            <Route
              path="/kategori-perbaikan/tambah-kategori-perbaikan"
              element={
                <RequireAuth loginPath={"/silakend-login"}>
                  <CreateVM />
                </RequireAuth>
              }
            />
            <Route
              path="/kategori-perbaikan/edit-kategori-perbaikan"
              element={
                <RequireAuth loginPath={"/silakend-login"}>
                  <UpdateVM />
                </RequireAuth>
              }
            />
            <Route
              path="/rincian-perbaikan"
              element={
                <RequireAuth loginPath={"/silakend-login"}>
                  <VehicleMDetails />
                </RequireAuth>
              }
            />
            <Route
              path="/rincian-perbaikan/tambah-rincian-perbaikan"
              element={
                <RequireAuth loginPath={"/silakend-login"}>
                  <CreateVMDetail />
                </RequireAuth>
              }
            />
            {/*----- END VM PAGES---- */}

            {/*----- START DRIVER PAGES---- */}
            <Route path="/data-pengemudi" element={<Drivers />} />
            {/*----- END DRIVER PAGES---- */}

            {/*----- START VEHICLE PAGES---- */}
            <Route path="/data-kendaraan" element={<Vehicles />} />
            <Route
              path="/data-kendaraan/tambah-kendaraan"
              element={<CreateVehicle />}
            />
            <Route
              path="/data-kendaraan/edit-kendaraan"
              element={<UpdateVehicle />}
            />
            {/*----- END VEHICLE PAGES---- */}

            <Route
              path="/tugas-masuk"
              element={
                <RequireAuth loginPath={"/silakend-login"}>
                  <TasksIn />
                </RequireAuth>
              }
            />
            <Route
              path="/edit-km-kendaraan"
              element={
                <RequireAuth loginPath={"/silakend-login"}>
                  <VehiclesKM />
                </RequireAuth>
              }
            />
            <Route
              path="/validasi-order-masuk"
              element={
                <RequireAuth loginPath={"/silakend-login"}>
                  <Validations />
                </RequireAuth>
              }
            />
            <Route
              path="/laporan"
              element={
                <RequireAuth loginPath={"/silakend-login"}>
                  <Reports />
                </RequireAuth>
              }
            />

            {/*----- START AUTH PAGES---- */}
            <Route path="/silakend-login" element={<Login />} />
            {/*----- END AUTH PAGES---- */}
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
