import Input from "../reusable/Input";
import FormWrapper from "./FormWrapper";
import "../../styles/_registrationForms.scss";
import { Pet } from "../../types/pet";
import { SetStateAction, ChangeEvent, Dispatch, useState } from "react";

export interface PetRegistrationFormProps {
  petData: Pet[];
  setPetData: Dispatch<SetStateAction<Pet[]>>;
}

export default function PetRegistrationForm({
  petData,
  setPetData,
}: PetRegistrationFormProps) {
  const [currentPet, setCurrentPet] = useState<Pet>({
    name: "",
    type: "",
    breed: "",
    age: 0,
    owner: "",
  });

  const [errorMessage, setErrorMessage] = useState<string>("");

  function changeHandler(
    field: keyof Pet,
    event: ChangeEvent<HTMLInputElement>
  ) {
    const value = event.target.value;
    setCurrentPet((prevPet) => ({ ...prevPet, [field]: value }));
  }

  function validateCurrentPetForm(): boolean {
    if (
      currentPet.name === "" ||
      currentPet.type === "" ||
      currentPet.breed === "" ||
      currentPet.age <= 0
    ) {
      setErrorMessage("All fields are required.");
      return false;
    }
    setErrorMessage("");
    return true;
  }

  function addPet() {
    if (!validateCurrentPetForm()) {
      return;
    }

    setPetData((prevData) => [...prevData, currentPet]);
    setCurrentPet({ name: "", type: "", breed: "", age: 0, owner: "" });
  }

  function removePet(index: number) {
    setPetData((prevData) => prevData.filter((_, i) => i !== index));
  }

  return (
    <FormWrapper title="Pet Details">
      <div>
        <Input
          type="text"
          label="Pet's name"
          id="name"
          value={currentPet.name}
          onChange={(event) => changeHandler("name", event)}
        />
        <Input
          type="text"
          label="Type of Pet"
          id="type"
          value={currentPet.type}
          onChange={(event) => changeHandler("type", event)}
        />
        <Input
          type="text"
          label="Breed"
          id="breed"
          value={currentPet.breed}
          onChange={(event) => changeHandler("breed", event)}
        />
        <Input
          type="number"
          label="Age"
          id="age"
          value={currentPet.age}
          onChange={(event) => changeHandler("age", event)}
        />
      </div>
      <p className="error-message">{errorMessage}</p>
      <button type="button" onClick={addPet} className="btn-add">
        Add pet
      </button>
      {petData.length > 0 && (
        <div className="div-pets">
          <h3>Added Pets:</h3>
          <ul>
            {petData.map((pet, index) => (
              <li key={index}>
                {pet.name} ({pet.type}, {pet.breed}, {pet.age} years old)
                <button
                  className="btn-remove"
                  onClick={() => removePet(index)}
                  title="Remove"
                >
                  -
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </FormWrapper>
  );
}
