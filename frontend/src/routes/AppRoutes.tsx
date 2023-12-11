import { Route, Routes } from "react-router";
import AuthenticatedNavBar from "../components/navbars/AuthenticatedNavBar";
import UnauthenticatedNavBar from "../components/navbars/UnauthenticatedNavBar";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import RegistrationPage from "../pages/RegistrationPage";
import { useState } from "react";

export default function AppRoutes() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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
