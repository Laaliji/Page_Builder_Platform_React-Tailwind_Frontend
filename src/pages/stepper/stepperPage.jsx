import React, { useState, useEffect } from "react";
import Stepper from "../../components/stepper/Stepper";
import StepperControl from "../../components/stepper/StepperControl";
import Project from "../../components/stepper/steps/Project";
import Type from "../../components/stepper/steps/Type";
import TemplateAndStyle from "../../components/stepper/steps/TemplateAndStyle";
import Final from "../../components/stepper/steps/Final";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast.jsx";

function StepperPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const steps = [
    "Informations du projet",
    "Type du projet",
    "Modèle et Style",
    "Aperçu et confirmation",
  ];

  // Check for user authentication on page load
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "Please log in to create a project."
      });
      navigate('/login');
    }
  }, [navigate, toast]);
  
  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <Project />;
      case 2:
        return <Type />;
      case 3:
        return <TemplateAndStyle />;
      case 4:
        return <Final onNavigateToStep={(step) => setCurrentStep(step)} />;
      default:
        return null;
    }
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
            onNext={() => setCurrentStep((prev) => Math.min(prev + 1, steps.length))}
            onPrev={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
          />
        </div>
      </div>
    </div>
  );
}

export default StepperPage;
