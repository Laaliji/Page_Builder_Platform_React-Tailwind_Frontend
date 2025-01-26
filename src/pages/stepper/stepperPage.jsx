import React, { useState, useRef } from "react";
import Stepper from "../../components/stepper/Stepper";
import StepperControl from "../../components/stepper/StepperControl";
import Project from "../../components/stepper/steps/Project";
import Template from "../../components/stepper/steps/Type";
import Final from "../../components/stepper/steps/Final";
import TemplateAndStyle from "../../components/stepper/steps/TemplateAndStyle";
import { toast } from "react-hot-toast";

const StepperPage = () => {
  const [formValidations, setFormValidations] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [currentStep, setCurrentStep] = useState(1);
  const projectRef = useRef(null);

  const steps = [
    "Informations du projet",
    "Type du projet",
    "Modèle et Style",
    "Aperçu général et confirmation",
  ];

  const handleNext = async () => {
    if (currentStep === 1) {
      try {
        const success = await projectRef.current?.saveProject();
        if (!success) {
          return;
        }
      } catch (error) {
        console.error("Error saving project:", error);
        toast.error("Failed to save project");
        return;
      }
    }
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return (
          <Project
            ref={projectRef}
            onValidate={(isValid) => handleValidate(0, isValid)}
          />
        );
      case 2:
        return (
          <Template onValidate={(isValid) => handleValidate(1, isValid)} />
        );
      case 3:
        return (
          <TemplateAndStyle
            onValidate={(isValid) => handleValidate(2, isValid)}
          />
        );
      case 4:
        return <Final onValidate={(isValid) => handleValidate(3, isValid)} />;
      default:
        return null;
    }
  };

  const handleValidate = (stepIndex, isValid) => {
    const updatedValidations = [...formValidations];
    updatedValidations[stepIndex] = isValid;
    setFormValidations(updatedValidations);
  };

  return (
    <div className="w-full min-h-screen bg-white flex justify-center items-center">
      <div className="w-full max-w-7xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        <div className="bg-white p-4">
          <Stepper steps={steps} currentStep={currentStep} />
        </div>
        <div className="p-8 flex-grow flex justify-center items-start">
          <div className="w-full max-w-4xl">{displayStep(currentStep)}</div>
        </div>
        <div className="bg-white p-4 border-t border-gray-200">
          <StepperControl
            currentStep={currentStep}
            totalSteps={steps.length}
            onNext={handleNext}
            onPrev={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
            formValidations={formValidations}
          />
        </div>
      </div>
    </div>
  );
};

export default StepperPage;
