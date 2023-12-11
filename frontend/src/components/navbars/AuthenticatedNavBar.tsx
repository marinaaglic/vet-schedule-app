import { Link } from "react-router-dom";
import "../../styles/_authenticatedNavBar.scss";

export default function AuthenticatedNavBar() {
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

      <Link to="/logout" className="btn-link">
        Logout
      </Link>
    </nav>
  );
}
