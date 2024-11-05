import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { GridBackground } from "./components/GridBackground";
import { QUADTRATIC_MASK_IMAGE } from "./constants/constant";
import AuthNavbar from "./components/AuthNavBar";
import { useQuery } from "@apollo/client";
import { GET_AUTHENTICATED_USER } from "./graphql/queries/user.query";

function AppRoutes() {
  const { data, loading, error } = useQuery(GET_AUTHENTICATED_USER);


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
          <Route
            path="/dashboard"
            element={
              <GridBackground containerClass={QUADTRATIC_MASK_IMAGE}>
                <Dashboard />
              </GridBackground>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default AppRoutes;
