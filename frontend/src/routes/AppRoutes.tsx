import { Route, Routes } from "react-router";
import AuthenticatedNavBar from "../components/reusable/AuthenticatedNavBar";
import UnauthenticatedNavBar from "../components/reusable/UnauthenticatedNavBar";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import RegistrationForm from "../components/forms/RegistrationForm";
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
          <Route path="/registration" element={<RegistrationForm />} />
        </Routes>
      </div>
    </div>
  );
}
