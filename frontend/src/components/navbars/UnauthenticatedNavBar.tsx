import { Link } from "react-router-dom";
import "../../styles/_unauthenticatedNavbar.scss";

export default function UnauthenticatedNavBar() {
  return (
    <>
      <div className="div-unauth">
        <Link to="/" className="link-home">
          Home
        </Link>
        <nav className="unauth-navbar">
          <Link to="/login" className="link-login">
            Login
          </Link>
          <Link to="/registration" className="link-registration">
            Registration
          </Link>
        </nav>
      </div>
      <hr className="navbar-divider" />
    </>
  );
}
