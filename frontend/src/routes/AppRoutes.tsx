import { Route, Routes } from "react-router";
import AuthenticatedNavBar from "../components/navbars/AuthenticatedNavBar";
import UnauthenticatedNavBar from "../components/navbars/UnauthenticatedNavBar";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import RegistrationPage from "../pages/RegistrationPage";
import AppointmentsPage from "../pages/AppointmentsPage";
import ProfilePage from "../pages/ProfilePage";
import { useContext } from "react";
import { AuthContext, AuthContextProps } from "../context/AuthContext";
import PrivateRoute from "../hocs/PrivateRoute";

export default function AppRoutes() {
  const { isAuthenticated } = useContext(AuthContext) as AuthContextProps;
  return (
    <div>
      {isAuthenticated ? <AuthenticatedNavBar /> : <UnauthenticatedNavBar />}
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/appointments" element={<AppointmentsPage />} />
          </Route>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}
