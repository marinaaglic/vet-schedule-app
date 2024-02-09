import Input from "../reusable/Input";
import FormWrapper from "./FormWrapper";
import "../../styles/_registrationForms.scss";
import { Pet } from "../../types/pet";
import { SetStateAction, Dispatch } from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface PetRegistrationFormProps {
  petData: Pet;
  setPetData: Dispatch<SetStateAction<Pet>>;
}

const schema = z.object({
  name: z.string().min(1, "Name is required."),
  type: z.string().min(1, "Type is required."),
  breed: z.string().min(1, "Breed is required."),
  age: z.number().refine((age) => age > 0, {
    message: "Age must be greater than 0.",
  }),
});

export default function PetRegistrationForm({
  petData,
  setPetData,
}: PetRegistrationFormProps) {
  const {
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: petData,
  });

  return (
    <FormWrapper title="Pet Details">
      <div>
        <Controller
          name="name"
          control={control}
          defaultValue={petData.name}
          render={({ field }) => (
            <Input
              type="text"
              label="Pet's Name"
              id="name"
              {...field}
              onChange={(e) => {
                field.onChange(e);
                setPetData((prevData) => ({
                  ...prevData,
                  firstName: e.target.value,
                }));
              }}
            />
          )}
        />
        {errors.name && (
          <p className="error">{errors.name.message as string}</p>
        )}
        <Controller
          name="type"
          control={control}
          defaultValue={petData.type}
          render={({ field }) => (
            <Input
              type="text"
              label="Type of Pet"
              id="type"
              {...field}
              onChange={(e) => {
                field.onChange(e);
                setPetData((prevData) => ({
                  ...prevData,
                  type: e.target.value,
                }));
              }}
            />
          )}
        />
        {errors.type && (
          <p className="error">{errors.type.message as string}</p>
        )}
        <Controller
          name="breed"
          control={control}
          defaultValue={petData.breed}
          render={({ field }) => (
            <Input
              type="text"
              label="Breed"
              id="breed"
              {...field}
              onChange={(e) => {
                field.onChange(e);
                setPetData((prevData) => ({
                  ...prevData,
                  breed: e.target.value,
                }));
              }}
            />
          )}
        />
        {errors.breed && (
          <p className="error">{errors.breed.message as string}</p>
        )}
        <Controller
          name="age"
          control={control}
          defaultValue={petData.age}
          render={({ field }) => (
            <Input
              type="number"
              label="Age"
              id="age"
              {...field}
              onChange={(e) => {
                field.onChange(e);
                setPetData((prevData) => ({
                  ...prevData,
                  age: Number(e.target.value),
                }));
              }}
            />
          )}
        />
        {errors.age && <p className="error">{errors.age.message as string}</p>}
      </div>
    </FormWrapper>
  );
}
