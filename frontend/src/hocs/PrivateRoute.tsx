import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext, AuthContextProps } from "../context/AuthContext";

export default function PrivateRoute() {
  const { isAuthenticated } = useContext<AuthContextProps>(AuthContext);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
