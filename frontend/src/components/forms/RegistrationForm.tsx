import { FormEvent, useState, useContext } from "react";
import { useMultiStepForm } from "../../hooks/useMultiStepForm";
import UserRegistrationForm from "./UserRegistrationForm";
import PetRegistrationForm from "./PetRegistrationForm";
import Sidebar from "../reusable/Sidebar";
import AuthService from "../../services/AuthService";
import { AuthContext, AuthContextProps } from "../../context/AuthContext";
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
    age: 0,
    owner: "",
  });
  const { setAuthenticated } = useContext(AuthContext) as AuthContextProps;
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
        const userResponse = await AuthService.register(
          userData,
          setAuthenticated
        );
        const userId = userResponse.userId;
        const petDataWithOwner = { ...petData, owner: userId };
        await AuthService.registerPet(userId, petDataWithOwner);
        setAuthenticated(true);
        navigate("/appointments");
        console.log("User and pet registration successful!");
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
              <button className="btn-back" type="button" onClick={back}>
                Back
              </button>
            )}
            <button className="btn-registration" type="submit">
              {isLastStep ? "Finish" : "Next"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
