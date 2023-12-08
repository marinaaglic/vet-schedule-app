import Input from "../reusable/Input";
import "../../styles/_registrationForms.scss";
import FormWrapper from "./FormWrapper";

export default function UserRegistrationForm() {
  return (
    <FormWrapper title="User Details">
      <form>
        <Input type="text" label="Name" id="name" />
        <Input type="text" label="Last Name" id="lastName" />
        <Input type="email" label="E-mail" id="email" />
        <Input type="password" label="Password" id="password" />
      </form>
    </FormWrapper>
  );
}
