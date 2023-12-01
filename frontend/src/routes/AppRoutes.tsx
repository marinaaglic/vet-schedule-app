import { Route, Routes } from "react-router";
import AuthenticatedNavBar from "../components/reusable/AuthenticatedNavBar";
import UnauthenticatedNavBar from "../components/reusable/UnauthenticatedNavBar";
import { useState } from "react";

export default function AppRoutes() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <div>
      {isAuthenticated ? <AuthenticatedNavBar /> : <UnauthenticatedNavBar />}
    </div>
  );
}
