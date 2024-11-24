import React, { useState } from "react";
import Final from "./steps/Final";
import Stepper from "./Stepper";
import StepperControl from "./StepperControl";

const ParentComponentForFinalStep = () => {
  const steps = ["Project Information", "Template & Color", "Review & Finish"];
  const [currentStep, setCurrentStep] = useState(1);

  // State for the selected template
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [projectData, setProjectData] = useState({
    projectName: "My Awesome Project",
    websiteTitle: "awesome-project.com",
    repoUrl: "https://github.com/username/awesome-project"
  });
  const [colorPalette, setColorPalette] = useState("#dfe1ec");

  const handleNavigateToStep = (step) => {
    setCurrentStep(step);
  };

  const handleNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    alert("Finished!");
  };

  return (
    <div className="container mx-auto p-6">
      <Stepper steps={steps} currentStep={currentStep} />
      {currentStep === steps.length ? (
        <Final 
          onNavigateToStep={handleNavigateToStep}
          projectData={projectData}
          selectedTemplate={selectedTemplate} 
          colorPalette={colorPalette} 
        />
      ) : (
        <div className="step-content">
          {/* Add content of other steps here */}
          <p>Step {currentStep}: {steps[currentStep - 1]}</p>
        </div>
      )}
      <StepperControl
        currentStep={currentStep}
        totalSteps={steps.length}
        onNext={handleNextStep}
        onPrev={handlePreviousStep}
        onFinish={handleFinish}
      />
    </div>
  );
};

export default ParentComponentForFinalStep;
