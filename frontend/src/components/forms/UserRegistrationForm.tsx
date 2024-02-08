import Input from "../reusable/Input";
import "../../styles/_registrationForms.scss";
import FormWrapper from "./FormWrapper";
import { SetStateAction, ChangeEvent, Dispatch } from "react";
import { User } from "../../types/user";

interface UserRegistrationFormProps {
  userData: User;
  setUserData: Dispatch<SetStateAction<User>>;
}

export default function UserRegistrationForm({
  userData,
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
          value={userData.firstName}
          onChange={(value) => changeHandler("firstName", value)}
        />
        <Input
          type="text"
          label="Last Name"
          id="lastName"
          value={userData.lastName}
          onChange={(value) => changeHandler("lastName", value)}
        />
        <Input
          type="email"
          label="E-mail"
          id="email"
          value={userData.email}
          onChange={(value) => changeHandler("email", value)}
        />
        <Input
          type="password"
          label="Password"
          id="password"
          value={userData.password}
          onChange={(value) => changeHandler("password", value)}
        />
      </div>
    </FormWrapper>
  );
}
