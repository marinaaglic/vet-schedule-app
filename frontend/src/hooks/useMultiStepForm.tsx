import { ReactElement, useState } from "react";

export function useMultiStepForm(steps: ReactElement[]) {
  const [currentStep, setCurrentStep] = useState(0);

  function next() {
    setCurrentStep((index) => {
      if (index >= steps.length - 1) {
        return index;
      }
      return index + 1;
    });
  }

  function back() {
    setCurrentStep((index) => {
      if (index <= 0) {
        return index;
      }
      return index - 1;
    });
  }

  function goTo(index: number) {
    setCurrentStep(index);
  }

  return {
    currentStep,
    step: steps[currentStep],
    steps,
    isFirstStep: currentStep !== 0,
    isLastStep: currentStep === steps.length - 1,
    goTo,
    next,
    back,
  };
}
