import { useMultiStepForm } from "../../hooks/useMultiStepForm";
import UserRegistrationForm from "./UserRegistrationForm";
import PetRegistrationForm from "./PetRegistrationForm";
import "../../styles/_registrationForms.scss";
import { FormEvent } from "react";

export default function RegistrationForm() {
  const { steps, currentStep, step, isFirstStep, isLastStep, back, next } =
    useMultiStepForm([<UserRegistrationForm />, <PetRegistrationForm />]);
  function onSubmitHandler(e: FormEvent) {
    e.preventDefault();
    next();
  }
  return (
    <div className="form-wrapper">
      <form onSubmit={onSubmitHandler}>
        <div className="div-steps">
          {currentStep + 1} / {steps.length}
        </div>
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
  );
}
