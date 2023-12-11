import { SidebarType, StepInfoMap } from "../../types/sidebar.ts";
import "../../styles/_sidebar.scss";

const stepInfoMap: StepInfoMap = {
  1: "Your Info",
  2: "Your Pet's Info",
};

function Sidebar({ totalSteps, currentStep }: SidebarType) {
  const circles = Array.from({ length: totalSteps }, (_, index) => (
    <div
      key={index}
      className={`circle ${index === currentStep ? "active" : ""}`}
    >
      <div className="step-number">{index + 1}</div>
      <div className="step-info">{stepInfoMap[index + 1]}</div>
    </div>
  ));

  return <div className="progress-bar">{circles}</div>;
}

export default Sidebar;
