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
  const { setAuthenticated } = useContext(AuthContext) as AuthContextProps;
  const navigate = useNavigate();

  function changeHandler(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    setUser({ ...user, [event.target.name]: event.target.value });
  }
  async function submitHandler(event: FormEvent) {
    event.preventDefault();
    try {
      const authResponse = await AuthService.login(user, setAuthenticated);
      setAuthenticated(true);
      navigate("/home");
      console.log("Login successful. Response:", authResponse);
    } catch (error) {
      console.log("Login failed: ", error);
    }
  }
  return (
    <div className="form-wrapper">
      <form className="login-form" onSubmit={submitHandler}>
        <h3>Login to your account</h3>
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
        <button className="btn-login" type="submit">
          Sign in
        </button>
      </form>
    </div>
  );
}
