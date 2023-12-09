import { FormEvent } from "react";
import { useMultiStepForm } from "../../hooks/useMultiStepForm";
import UserRegistrationForm from "./UserRegistrationForm";
import PetRegistrationForm from "./PetRegistrationForm";
import Sidebar from "../reusable/Sidebar";
import "../../styles/_registrationForms.scss";
import "../../styles/_sidebar.scss";

export default function RegistrationForm() {
  const { steps, currentStep, step, isFirstStep, isLastStep, back, next } =
    useMultiStepForm([<UserRegistrationForm />, <PetRegistrationForm />]);

  function onSubmitHandler(e: FormEvent) {
    e.preventDefault();
    next();
  }

  return (
    <div className="registration-container">
      <div className="progress-bar-sidebar">
        <Sidebar totalSteps={steps.length} currentStep={currentStep} />
      </div>

      <div className="form-wrapper">
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
