import "../../styles/_sidebar.scss";

interface SidebarProps {
  totalSteps: number;
  currentStep: number;
}

interface StepInfoMap {
  [key: number]: string;
}

const stepInfoMap: StepInfoMap = {
  1: "Your Info",
  2: "Your Pet's Info",
};

function Sidebar({ totalSteps, currentStep }: SidebarProps) {
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
