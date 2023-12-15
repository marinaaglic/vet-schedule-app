import Input from "../reusable/Input";
import FormWrapper from "./FormWrapper";
import "../../styles/_registrationForms.scss";
import { Pet } from "../../types/pet";
import { SetStateAction, ChangeEvent, Dispatch } from "react";

interface PetRegistrationFormProps {
  setPetData: Dispatch<SetStateAction<Pet>>;
}

export default function PetRegistrationForm({
  setPetData,
}: PetRegistrationFormProps) {
  function changeHandler(
    field: keyof Pet,
    event: ChangeEvent<HTMLInputElement>
  ) {
    const value = event.target.value;
    setPetData((prevData) => ({ ...prevData, [field]: value }));
  }
  return (
    <FormWrapper title="Pet Details">
      <div>
        <Input
          type="text"
          label="Pet's Name"
          id="name"
          onChange={(value) => changeHandler("name", value)}
        />
        <Input
          type="text"
          label="Type of Pet"
          id="type"
          onChange={(value) => changeHandler("type", value)}
        />
        <Input
          type="text"
          label="Breed"
          id="breed"
          onChange={(value) => changeHandler("breed", value)}
        />
      </div>
    </FormWrapper>
  );
}
