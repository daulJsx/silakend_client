import React from "react";

// Routing between pages
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// react-auth-kit
import { AuthProvider } from "react-auth-kit";
// import { RequireAuth } from "react-auth-kit";

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
            {/* <Route
              exact
              path="/"
              element={
                <RequireAuth loginPath={"/silakend-login"}>
                  <Dashboard />
                </RequireAuth>
              }
            /> */}
            <Route exact path="/" element={<Dashboard />} />
            <Route path="/data-user" element={<Users />} />
            <Route path="/order-peminjaman" element={<Orders />} />
            <Route path="/tugas-masuk" element={<TasksIn />} />
            <Route path="/edit-km-kendaraan" element={<VehiclesKM />} />
            <Route path="/validasi-order-masuk" element={<Validations />} />
            <Route path="/data-perbaikan-kendaraan" element={<VehiclesRep />} />
            <Route path="/data-pengemudi" element={<Drivers />} />
            <Route path="/data-kendaraan" element={<Vehicles />} />
            <Route path="/laporan" element={<Reports />} />
            <Route path="/silakend-login" element={<Login />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
