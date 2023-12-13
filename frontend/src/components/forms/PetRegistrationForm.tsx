import Input from "../reusable/Input";
import FormWrapper from "./FormWrapper";
import "../../styles/_registrationForms.scss";

export default function PetRegistrationForm() {
  return (
    <FormWrapper title="Pet Details">
      <div>
        <Input type="text" label="Pet's Name" id="name" />
        <Input type="text" label="Type of Pet" id="type" />
        <Input type="text" label="Breed" id="breed" />
      </div>
    </FormWrapper>
  );
}
