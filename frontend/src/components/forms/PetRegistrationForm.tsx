import Input from "../reusable/Input";
import FormWrapper from "./FormWrapper";
import "../../styles/_registrationForms.scss";
import { Pet } from "../../types/pet";
import { SetStateAction, ChangeEvent, Dispatch } from "react";
interface PetRegistrationFormProps {
  petData: Pet[];
  setPetData: Dispatch<SetStateAction<Pet[]>>;
}

export default function PetRegistrationForm({
  petData,
  setPetData,
}: PetRegistrationFormProps) {
  function changeHandler(
    index: number,
    field: keyof Pet,
    event: ChangeEvent<HTMLInputElement>
  ) {
    const value = event.target.value;

    setPetData((prevData) =>
      prevData.map((pet, i) => (i === index ? { ...pet, [field]: value } : pet))
    );
  }
  return (
    <FormWrapper title="Pet Details">
      {petData.map((pet, index) => (
        <div key={index}>
          <Input
            type="text"
            label="Pet's name"
            id={`name-${index}`}
            value={pet.name}
            onChange={(value) => changeHandler(index, "name", value)}
          />
          <Input
            type="text"
            label="Type of Pet"
            id={`type-${index}`}
            value={pet.type}
            onChange={(value) => changeHandler(index, "type", value)}
          />
          <Input
            type="text"
            label="Breed"
            id={`breed-${index}`}
            value={pet.breed}
            onChange={(value) => changeHandler(index, "breed", value)}
          />
          <Input
            type="number"
            label="Age"
            id={`age-${index}`}
            value={pet.age}
            onChange={(value) => changeHandler(index, "age", value)}
          />
        </div>
      ))}
    </FormWrapper>
  );
}
