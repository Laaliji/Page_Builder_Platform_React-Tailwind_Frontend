import React, { useState } from "react";
import Stepper from "../../components/stepper/Stepper";
import StepperControl from "../../components/stepper/StepperControl";
import Project from "../../components/stepper/steps/Project";
import Template from "../../components/stepper/steps/Type";
import Style from "../../components/stepper/steps/Style";
import Final from "../../components/stepper/steps/Final";
import TemplateStarter from "../../components/stepper/steps/TemplateStarter";
import AnimatedModalDemo from "../../components/stepper/steps/AnimatedModalDemo"

function StepperPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const steps = [
    "Informations du projet",
    "Type du projet",
    "Template de démarrage",
    "Style et palette de couleurs",
    "Aperçu général et confirmation",
  ];

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <Project />;
      case 2:
        return <Template />;
      case 3:
        return <AnimatedModalDemo setCurrentStep={setCurrentStep} />;
      case 4:
        return <Style />;
      case 5:
        return <Final onNavigateToStep={(step) => setCurrentStep(step)} />;
      default:
        return null;
    }
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };

  return (
    <div className="w-full min-h-screen bg-white flex justify-center items-center ">
      <div className="w-full max-w-7xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* Stepper Header */}
        <div className="bg-white p-4">
          <Stepper steps={steps} currentStep={currentStep} />
        </div>
        {/* Stepper Content */}
        <div className="p-8 flex-grow flex justify-center items-start">
          <div className="w-full max-w-4xl">{displayStep(currentStep)}</div>
        </div>
        {/* Stepper Controls */}
        <div className="bg-white p-4 border-t border-gray-200">
          <StepperControl
            currentStep={currentStep}
            totalSteps={steps.length}
            onNext={handleNext}
            onPrev={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
          />
        </div>
      </div>
    </div>
  );
}

export default StepperPage;
