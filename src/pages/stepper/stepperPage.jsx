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
    "Quick Review and Complete"
  ];
  const displayStep = (step) => {
    switch (step) {
      case 1: return <Project />;
      case 2: return <Template />;
      case 3: return <Style />;
      case 4: return <Final />;
      default: return null;
    }
  };
  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, steps.length));
  };
  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };
  return (
    <div className="w-full min-h-screen bg-gray-100 flex justify-center items-center px-4">
      <div className="w-full max-w-6xl mx-auto shadow-xl rounded-2xl pb-2 bg-white">
        <div className="container horizontal mt-5">
          <Stepper
            steps={steps}
            currentStep={currentStep}
          />
        </div>
        {displayStep(currentStep)}
        <StepperControl
          currentStep={currentStep}
          totalSteps={steps.length}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      </div>
      </div>
  );
}
export default StepperPage;