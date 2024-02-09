import Input from "../reusable/Input";
import "../../styles/_registrationForms.scss";
import FormWrapper from "./FormWrapper";
import { SetStateAction, Dispatch } from "react";
import { User } from "../../types/user";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface UserRegistrationFormProps {
  userData: User;
  setUserData: Dispatch<SetStateAction<User>>;
}

const schema = z.object({
  firstName: z.string().min(1, "First Name is required."),
  lastName: z.string().min(1, "Last Name is required."),
  email: z.string().email("Invalid e-mail."),
  password: z.string().min(8, "Password must be at least 8 characters long."),
});

export default function UserRegistrationForm({
  userData,
  setUserData,
}: UserRegistrationFormProps) {
  const {
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: userData,
  });
  return (
    <FormWrapper title="User Details">
      <div>
        <Controller
          name="firstName"
          control={control}
          defaultValue={userData.firstName}
          render={({ field }) => (
            <Input
              type="text"
              label="First Name"
              id="firstName"
              {...field}
              onChange={(e) => {
                field.onChange(e);
                setUserData((prevData) => ({
                  ...prevData,
                  firstName: e.target.value,
                }));
              }}
            />
          )}
        />
        {errors.firstName && (
          <p className="error">{errors.firstName.message as string}</p>
        )}
        <Controller
          name="lastName"
          control={control}
          defaultValue={userData.lastName}
          render={({ field }) => (
            <Input
              type="text"
              label="Last Name"
              id="lastName"
              {...field}
              onChange={(e) => {
                field.onChange(e);
                setUserData((prevData) => ({
                  ...prevData,
                  lastName: e.target.value,
                }));
              }}
            />
          )}
        />
        {errors.lastName && (
          <p className="error">{errors.lastName.message as string}</p>
        )}
        <Controller
          name="email"
          control={control}
          defaultValue={userData.email}
          render={({ field }) => (
            <Input
              type="email"
              label="E-mail"
              id="email"
              {...field}
              onChange={(e) => {
                field.onChange(e);
                setUserData((prevData) => ({
                  ...prevData,
                  email: e.target.value,
                }));
              }}
            />
          )}
        />
        {errors.email && (
          <p className="error">{errors.email.message as string}</p>
        )}
        <Controller
          name="password"
          control={control}
          defaultValue={userData.password}
          render={({ field }) => (
            <Input
              type="password"
              label="Password"
              id="password"
              {...field}
              onChange={(e) => {
                field.onChange(e);
                setUserData((prevData) => ({
                  ...prevData,
                  password: e.target.value,
                }));
              }}
            />
          )}
        />
        {errors.password && (
          <p className="error">{errors.password.message as string}</p>
        )}
      </div>
    </FormWrapper>
  );
}
