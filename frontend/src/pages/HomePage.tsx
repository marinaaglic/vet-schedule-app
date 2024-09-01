import "../styles/_homepage.scss";
import landingPageImg from "/landing-page-svg.svg";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="homepage-div">
      <div className="div-content">
        <h1>Welcome to Vet Clinic!</h1>
        <h2>Book your appointment now.</h2>
        <p className="sign-in-content">
          At Vet Clinic you can book your appointments online, edit them if you
          had a change of plans and cancel them.
        </p>
        <Link to="/login" className="link-login-homepage">
          Sign In
        </Link>
        <p className="sign-up-content">
          Don't have an account? Sign up
          <Link to="/registration" className="link-registration-homepage">
            Here
          </Link>
          .
        </p>
      </div>

      <div className="img-container">
        <img
          src={landingPageImg}
          alt="Landing SVG image."
          className="dog-img"
        />
      </div>
    </div>
  );
}

export default HomePage;
