import { Route, Routes } from "react-router";
import AuthenticatedNavBar from "../components/navbars/AuthenticatedNavBar";
import UnauthenticatedNavBar from "../components/navbars/UnauthenticatedNavBar";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import RegistrationPage from "../pages/RegistrationPage";
import { useContext } from "react";
import { AuthContext, AuthContextProps } from "../context/AuthContext";

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
        </Routes>
      </div>
    </div>
  );
}
