import { Route, Routes, Navigate } from "react-router";
import AuthenticatedNavBar from "../components/navbars/AuthenticatedNavBar";
import UnauthenticatedNavBar from "../components/navbars/UnauthenticatedNavBar";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import RegistrationPage from "../pages/RegistrationPage";
import { useContext } from "react";
import { AuthContext, AuthContextProps } from "../context/AuthContext";
import PrivateRoute from "../hocs/PrivateRoute";

export default function AppRoutes() {
  const { isAuthenticated } = useContext(AuthContext) as AuthContextProps;
  console.log(isAuthenticated);
  return (
    <div>
      {isAuthenticated ? <AuthenticatedNavBar /> : <UnauthenticatedNavBar />}
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route
            path="/profile"
            element={
              isAuthenticated ? <PrivateRoute /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/profile"
            element={
              isAuthenticated ? (
                <PrivateRoute />
              ) : (
                <Navigate to="/appointments" />
              )
            }
          />
        </Routes>
      </div>
    </div>
  );
}
