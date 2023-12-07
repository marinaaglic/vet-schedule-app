import Input from "../reusable/Input";
import "../../styles/_loginForm.scss";

export default function LoginForm() {
  return (
    <div className="form-wrapper">
      <form className="login-form">
        <Input type="email" label="E-mail" id="email" />
        <Input type="password" label="Password" id="password" />
        <button className="btn-login" type="submit">
          Sign in
        </button>
      </form>
    </div>
  );
}
