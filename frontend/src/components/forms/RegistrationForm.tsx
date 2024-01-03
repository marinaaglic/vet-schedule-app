import { FormEvent, useState } from "react";
import { useMultiStepForm } from "../../hooks/useMultiStepForm";
import UserRegistrationForm from "./UserRegistrationForm";
import PetRegistrationForm from "./PetRegistrationForm";
import Sidebar from "../reusable/Sidebar";
import AuthService from "../../services/AuthService";
import "../../styles/_registrationForms.scss";
import "../../styles/_sidebar.scss";
import { Pet } from "../../types/pet";
import { User } from "../../types/user";
import { useNavigate } from "react-router";

export default function RegistrationForm() {
  const [userData, setUserData] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "owner" as const,
  });

  const [petData, setPetData] = useState<Pet>({
    name: "",
    type: "",
    breed: "",
    owner: "",
  });
  const navigate = useNavigate();
  const { steps, currentStep, step, isFirstStep, isLastStep, back, next } =
    useMultiStepForm([
      <UserRegistrationForm setUserData={setUserData} />,
      <PetRegistrationForm setPetData={setPetData} />,
    ]);

  async function onSubmitHandler(event: FormEvent) {
    event.preventDefault();
    if (isLastStep) {
      try {
        const userResponse = await AuthService.register(userData);
        const userId = userResponse.userId;
        const petDataWithOwner = { ...petData, owner: userId };
        await AuthService.registerPet(userId, petDataWithOwner);

        console.log("User and pet registration successful!");
        navigate("/home");
      } catch (error) {
        console.log("Registration failed: ", error);
      }
    } else {
      next();
    }
  }

  return (
    <div className="registration-container">
      <div className="progress-bar-sidebar">
        <Sidebar totalSteps={steps.length} currentStep={currentStep} />
      </div>

      <div>
        <form onSubmit={onSubmitHandler}>
          {step}
          <div className="div-btn">
            {isFirstStep && (
              <button className="btn-reg" type="button" onClick={back}>
                Back
              </button>
            )}
            <button className="btn-reg" type="submit">
              {isLastStep ? "Finish" : "Next"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
