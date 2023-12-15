import Input from "../reusable/Input";
import "../../styles/_registrationForms.scss";
import FormWrapper from "./FormWrapper";
import { SetStateAction, ChangeEvent, Dispatch } from "react";
import { User } from "../../types/user";

interface UserRegistrationFormProps {
  setUserData: Dispatch<SetStateAction<User>>;
}

export default function UserRegistrationForm({
  setUserData,
}: UserRegistrationFormProps) {
  function changeHandler(
    field: keyof User,
    event: ChangeEvent<HTMLInputElement>
  ) {
    const value = event.target.value;
    setUserData((prevData) => ({ ...prevData, [field]: value }));
  }
  return (
    <FormWrapper title="User Details">
      <div>
        <Input
          type="text"
          label="First Name"
          id="firstName"
          onChange={(value) => changeHandler("firstName", value)}
        />
        <Input
          type="text"
          label="Last Name"
          id="lastName"
          onChange={(value) => changeHandler("lastName", value)}
        />
        <Input
          type="email"
          label="E-mail"
          id="email"
          onChange={(value) => changeHandler("email", value)}
        />
        <Input
          type="password"
          label="Password"
          id="password"
          onChange={(value) => changeHandler("password", value)}
        />
      </div>
    </FormWrapper>
  );
}
