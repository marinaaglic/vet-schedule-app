import { Link, useNavigate } from "react-router-dom";
import "../../styles/_authenticatedNavBar.scss";
import AuthService from "../../services/AuthService";
import { useContext } from "react";
import { AuthContext, AuthContextProps } from "../../context/AuthContext";

export default function AuthenticatedNavBar() {
  const navigate = useNavigate();
  const { setAuthenticated } = useContext<AuthContextProps>(AuthContext);

  const logoutHandler = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("Token not found.");
        return;
      }
      await AuthService.logout(token, setAuthenticated);
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error: any) {
      console.log("Logout failed: ", error);
    }
  };
  return (
    <nav className="auth-navbar">
      <div className="div-links">
        <Link to="/" className="btn-link">
          Home
        </Link>
        <Link to="/profile" className="btn-link">
          Profile
        </Link>
        <Link to="/appointmens" className="btn-link">
          Appointments
        </Link>
      </div>

      <button className="btn-logout" onClick={logoutHandler}>
        Logout
      </button>
    </nav>
  );
}
