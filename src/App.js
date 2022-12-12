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
import Dashboard from "./pages/dashboard/Dashboard";
import Users from "./pages/users/Users";
import { Orders } from "./pages/orders/Orders";
import { TasksIn } from "./pages/tasks/TasksIn";
import { VehiclesKM } from "./pages/vehiclesKM/VehiclesKM";
import { Validations } from "./pages/validations/Validations";
import { VehiclesRep } from "./pages/vehiclesRep/VehiclesRep";
import { Drivers } from "./pages/drivers/Drivers";
import { Vehicles } from "./pages/vehicles/Vehicles";
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
            <Route
              path="/"
              element={
                <RequireAuth loginPath={"/silakend-login"}>
                  <Dashboard />
                </RequireAuth>
              }
            />

            <Route
              path="/data-user"
              element={
                <RequireAuth loginPath={"/silakend-login"}>
                  <Users />
                </RequireAuth>
              }
            />
            <Route
              path="/order-peminjaman"
              element={
                <RequireAuth loginPath={"/silakend-login"}>
                  <Orders />
                </RequireAuth>
              }
            />
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
            <Route
              path="/data-pengemudi"
              element={
                <RequireAuth loginPath={"/silakend-login"}>
                  <Drivers />
                </RequireAuth>
              }
            />
            <Route
              path="/data-kendaraan"
              element={
                <RequireAuth loginPath={"/silakend-login"}>
                  <Vehicles />
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
            <Route path="/silakend-login" element={<Login />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
