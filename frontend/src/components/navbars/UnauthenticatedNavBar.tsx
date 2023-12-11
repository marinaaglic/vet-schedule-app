import { Link } from "react-router-dom";
import "../../styles/_unauthenticatedNavbar.scss";

export default function UnauthenticatedNavBar() {
  return (
    <nav className="unauth-navbar">
      <Link to="/" className="btn-link">
        Home
      </Link>
      <Link to="/login" className="btn-link">
        Login
      </Link>
      <Link to="/registration" className="btn-link">
        Registration
      </Link>
    </nav>
  );
}
