import React, { useState } from "react";
import Stepper from "../../components/stepper/Stepper";
import StepperControl from "../../components/stepper/StepperControl";
import Project from "../../components/stepper/steps/Project";
import Template from "../../components/stepper/steps/Template";
import Style from "../../components/stepper/steps/Style";
import Final from "../../components/stepper/steps/Final";

function StepperPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const steps = [
    "Project Information",
    "Template and Responsiveness",
    "Style and Color Palette",
    "Quick Review and Complete",
  ];

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <Project />;
      case 2:
        return <Template />;
      case 3:
        return <Style />;
      case 4:
        return (
          <Final
            onNavigateToStep={(step) => setCurrentStep(step)}
            // Pass any other required props to Final
          />
        );
      default:
        return null;
    }
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="w-full min-h-screen bg-white flex justify-center items-center px-4 py-8">
      <div className="w-full max-w-6xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        <div className="bg-white p-4">
          <Stepper steps={steps} currentStep={currentStep} />
        </div>

        <div className="p-8 min-h-[500px] flex justify-center items-center">
          <div className="w-full max-w-4xl">{displayStep(currentStep)}</div>
        </div>

        <div className="bg-white p-4 border-t border-gray-200">
          <StepperControl
            currentStep={currentStep}
            totalSteps={steps.length}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        </div>
      </div>
    </div>
  );
}

export default StepperPage;
