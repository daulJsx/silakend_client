import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// React Bootstrap
import "./App.css";

// react-bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

import Dashboard from "./pages/dashboard/Dashboard";
import Users from "./pages/users/Users";
import { Aside } from "./components/aside/Aside";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Dashboard />}></Route>
          <Route path="/users" element={<Users />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
