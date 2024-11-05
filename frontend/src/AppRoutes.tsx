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
  console.log("this is the data", data?.authUser);

  if (loading) return <h1>Loading...</h1>;
  if (error) return null;

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/signup" />} />
          <Route
            path="/signup"
            element={
              !data.authUser ? (
                <GridBackground>
                  <Signup />
                </GridBackground>
              ) : (
                <Navigate to="/dashboard" />
              )
            }
          />
          <Route
            path="/login"
            element={
              !data.authUser ? (
                <GridBackground>
                  <Login />
                </GridBackground>
              ) : (
                <Navigate to="/dashboard" />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              !data.authUser ? (
                <Navigate to="/login" />
              ) : (
                <GridBackground containerClass={QUADTRATIC_MASK_IMAGE}>
                  <Dashboard />
                </GridBackground>
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default AppRoutes;
