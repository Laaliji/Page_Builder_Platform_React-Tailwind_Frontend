import React, { useEffect, useState, useRef } from "react";

const Stepper = ({ steps, currentStep }) => {
  const [newStep, setNewStep] = useState([]);
  const stepRef = useRef();

  const updateStep = (stepNumber, steps) => {
    return steps.map((step, index) => ({
      ...step,
      completed: index < stepNumber,
      highlighted: index === stepNumber,
      selected: index <= stepNumber
    }));
  };

  useEffect(() => {
    const stepsState = steps.map((step, index) => ({
      description: step,
      completed: false,
      highlighted: index === 0,
      selected: index === 0
    }));

    stepRef.current = stepsState;
    const current = updateStep(currentStep - 1, stepRef.current);
    setNewStep(current);
  }, [steps, currentStep]);

  return (
    <div className="mx-4 p-4 flex items-center justify-between">
      {newStep.map((step, index) => (
        <div 
          key={index} 
          className={index !== newStep.length - 1 ? "w-full flex items-center" : "flex items-center"}
        >
          <div className="relative flex flex-col items-center text-teal-600">
            <div 
              className={`rounded-full transition duration-500 ease-in-out 
              border-2 h-12 w-12 flex items-center justify-center 
              ${step.completed ? 'bg-green-600 text-white border-green-600' : 
                step.highlighted ? 'bg-blue-600 text-white border-blue-600' : 
                'bg-white border-gray-300'}`}
            >
              {index + 1}
            </div>
            <div className="absolute top-14 text-center text-xs font-medium uppercase">
              {step.description}
            </div>
          </div>
          {index !== newStep.length - 1 && (
            <div 
              className={`flex-auto border-t-2 mx-2 
              ${step.completed ? 'border-green-600' : 'border-gray-300'}`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
