import Input from "../reusable/Input";
import AuthService from "../../services/AuthService";
import { AuthContext, AuthContextProps } from "../../context/AuthContext";
import "../../styles/_loginForm.scss";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { LoginCredentials } from "../../types/user";
import { useNavigate } from "react-router";

export default function LoginForm() {
  const [user, setUser] = useState<LoginCredentials>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { setAuthenticated } = useContext(AuthContext) as AuthContextProps;
  const navigate = useNavigate();

  function changeHandler(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    setUser({ ...user, [event.target.name]: event.target.value });
  }
  async function submitHandler(event: FormEvent) {
    event.preventDefault();

    if (user.email === "" && user.password === "") {
      setError("Both e-mail and password are required.");
    } else if (user.email === "") {
      setError("E-mail is required.");
    } else if (user.password === "") {
      setError("Password is required.");
    }

    if (user.email !== "" && user.password !== "") {
      try {
        await AuthService.login(user, setAuthenticated);
        setAuthenticated(true);
        navigate("/appointments");
      } catch (error) {
        console.log("Login failed: ", error);
        setError("Invalid e-mail or password.");
      }
    }
  }

  return (
    <div className="form-wrapper">
      <form className="login-form" onSubmit={submitHandler}>
        <h3>Log Into Your Account</h3>
        <Input
          type="email"
          label="E-mail"
          id="email"
          name="email"
          onChange={changeHandler}
        />
        <Input
          type="password"
          label="Password"
          id="password"
          name="password"
          onChange={changeHandler}
        />
        <p className="error">{error ? `${error}` : ""}</p>
        <button className="btn-login" type="submit">
          Sign in
        </button>
      </form>
    </div>
  );
}
