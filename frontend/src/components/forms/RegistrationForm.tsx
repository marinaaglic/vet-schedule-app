import Input from "../reusable/Input";
import "../../styles/_registrationForm.scss";

export default function RegistrationForm() {
  return (
    <div className="form-wrapper">
      <form>
        <Input type="text" label="Name" id="name" />
        <Input type="text" label="Last Name" id="lastName" />
        <Input type="email" label="E-mail" id="email" />
        <Input type="password" label="Password" id="password" />
        <button className="btn-login" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}
