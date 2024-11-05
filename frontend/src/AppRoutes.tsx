import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { GridBackground } from "./components/GridBackground";

function AppRoutes() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/signup" />} />
          <Route
            path="/signup"
            element={
              <GridBackground>
                <Signup />
              </GridBackground>
            }
          />
          <Route
            path="/login"
            element={
              <GridBackground>
                <Login />
              </GridBackground>
            }
          />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default AppRoutes;
