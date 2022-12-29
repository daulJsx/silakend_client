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

import { Vehicles } from "./pages/Main/Vehicles";
import { CreateVehicle } from "./pages/CreatePages/CreateVehicle";
import { UpdateVehicle } from "./pages/UpdatePages/UpdateVehicle";

import { Drivers } from "./pages/Main/Drivers";

import { TasksIn } from "./pages/tasks/TasksIn";
import { VehiclesKM } from "./pages/vehiclesKM/VehiclesKM";
import { Validations } from "./pages/validations/Validations";
import { VehiclesRep } from "./pages/vehiclesRep/VehiclesRep";
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
            <Route
              path="/"
              element={
                <RequireAuth loginPath={"/silakend-login"}>
                  <Dashboard />
                </RequireAuth>
              }
            />
            {/*----- END DASHBOARD PAGES---- */}

            {/*----- START USER PAGES---- */}
            <Route
              path="/data-pengguna"
              element={
                <RequireAuth loginPath={"/silakend-login"}>
                  <Users />
                </RequireAuth>
              }
            />
            <Route
              path="/data-pengguna/tambah-pengguna"
              element={
                <RequireAuth loginPath={"/silakend-login"}>
                  <CreateUser />
                </RequireAuth>
              }
            />
            <Route
              path="/data-pengguna/edit-pengguna"
              element={
                <RequireAuth loginPath={"/silakend-login"}>
                  <UpdateUser />
                </RequireAuth>
              }
            />
            {/*----- END USER PAGES---- */}

            {/*----- START ORDER PAGES---- */}
            <Route
              path="/order-peminjaman"
              element={
                <RequireAuth loginPath={"/silakend-login"}>
                  <VehicleUsages />
                </RequireAuth>
              }
            />
            <Route
              path="/order-peminjaman/buat-order"
              element={
                <RequireAuth loginPath={"/silakend-login"}>
                  <CreateOrder />
                </RequireAuth>
              }
            />
            {/*----- END ORDER PAGES---- */}

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
              path="/data-perbaikan-kendaraan"
              element={
                <RequireAuth loginPath={"/silakend-login"}>
                  <VehiclesRep />
                </RequireAuth>
              }
            />

            {/*----- START DRIVER PAGES---- */}
            <Route
              path="/data-pengemudi"
              element={
                <RequireAuth loginPath={"/silakend-login"}>
                  <Drivers />
                </RequireAuth>
              }
            />
            {/*----- END DRIVER PAGES---- */}

            {/*----- START VEHICLE PAGES---- */}
            <Route
              path="/data-kendaraan"
              element={
                <RequireAuth loginPath={"/silakend-login"}>
                  <Vehicles />
                </RequireAuth>
              }
            />
            <Route
              path="/data-kendaraan/tambah-kendaraan"
              element={
                <RequireAuth loginPath={"/silakend-login"}>
                  <CreateVehicle />
                </RequireAuth>
              }
            />
            <Route
              path="/data-kendaraan/edit-kendaraan"
              element={
                <RequireAuth loginPath={"/silakend-login"}>
                  <UpdateVehicle />
                </RequireAuth>
              }
            />
            {/*----- END VEHICLE PAGES---- */}

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
