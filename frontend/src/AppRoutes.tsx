import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { GridBackground } from "./components/GridBackground";
import { QUADTRATIC_MASK_IMAGE } from "./constants/constant";
import { useApolloClient, useQuery } from "@apollo/client";
import { GET_AUTHENTICATED_USER } from "./graphql/queries/user.query";
import Test from "./components/Test";

const fetchImageAsBase64 = async (imageUrl: string) => {
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  const base64Image = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
  return base64Image;
};

function AppRoutes() {
  const { data, loading, error } = useQuery(GET_AUTHENTICATED_USER);
  const client = useApolloClient(); // Apollo Client instance

  const profileUrl = data?.authUser.profilePicture;

  if (
    profileUrl &&
    !client.readQuery({ query: GET_AUTHENTICATED_USER }).profileImageBase64
  ) {
    fetchImageAsBase64(profileUrl)
      .then((base64Image) => {
        // Store the base64 image in Apollo Cache
        client.writeQuery({
          query: GET_AUTHENTICATED_USER,
          data: {
            authUser: {
              ...data.authUser,
              profileImageBase64: base64Image,
              test:"Hey sammy"
            },
          },
        });
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
      });
  }

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <h1 className="mt-4 text-xl font-semibold text-blue-600">
            Loading, please wait...
          </h1>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen ">
        <div className="text-center flex flex-col justify-center items-center gap-3">
          <img
            className="w-16"
            src="https://juststickers.in/wp-content/uploads/2019/11/Internet-error.png"
            alt=""
          />
          <h1 className=" text-xl italic font-semibold">
            Something went wrong. Please try again later.
          </h1>
        </div>
      </div>
    );

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
          <Route path="/test" element={<Test />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default AppRoutes;
