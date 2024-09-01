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

  const [petData, setPetData] = useState<Pet[]>([
    { name: "", type: "", breed: "", age: 0, owner: "" },
  ]);
  const [errorMessage, setErrorMessage] = useState("");
  const { setAuthenticated } = useContext(AuthContext) as AuthContextProps;
  const navigate = useNavigate();
  const { steps, currentStep, step, isFirstStep, isLastStep, back, next } =
    useMultiStepForm([
      <UserRegistrationForm userData={userData} setUserData={setUserData} />,
      <PetRegistrationForm petData={petData} setPetData={setPetData} />,
    ]);

  function validateUserForm(userData: User) {
    if (
      userData.firstName === "" ||
      userData.lastName === "" ||
      userData.email === "" ||
      userData.password === ""
    ) {
      setErrorMessage("All fields are required.");
      return false;
    }
    setErrorMessage("");
    return true;
  }
  function validatePetForm(petData: Pet[]) {
    for (const pet of petData) {
      if (
        pet.name === "" ||
        pet.type === "" ||
        pet.breed === "" ||
        pet.age === 0
      ) {
        setErrorMessage("All fields are required.");
        return false;
      }
    }
    setErrorMessage("");
    return true;
  }
  async function onSubmitHandler(event: FormEvent) {
    event.preventDefault();

    const isUserFormValid = validateUserForm(userData);

    if (isLastStep) {
      const isPetFormValid = validatePetForm(petData);
      if (!isUserFormValid || !isPetFormValid) {
        return;
      }
      try {
        const userResponse = await AuthService.register(
          userData,
          setAuthenticated
        );
        const userId = userResponse.userId;
        const petDataWithOwner = petData.map((pet) => ({
          ...pet,
          owner: userId,
        }));
        for (const pet of petDataWithOwner) {
          await AuthService.registerPet(userId, pet);
        }
        setAuthenticated(true);
        navigate("/appointments");
        console.log("User and pet registration successful!");
      } catch (error) {
        console.log("Registration failed: ", error);
      }
    } else {
      if (!isUserFormValid) {
        return;
      }
      setErrorMessage("");
      next();
    }
  }

  return (
    <div className="registration-container">
      <div className="progress-bar-sidebar">
        <Sidebar totalSteps={steps.length} currentStep={currentStep} />
      </div>

      <form onSubmit={onSubmitHandler} className="reg-form">
        {step}
        <p className="error-message">{errorMessage ? `${errorMessage}` : ""}</p>

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
  );
}
