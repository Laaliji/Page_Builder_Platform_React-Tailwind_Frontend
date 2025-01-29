import React, { useEffect, useState, useMemo } from "react";
import { Check } from "lucide-react";

const Stepper = ({ steps, currentStep }) => {
  // Ensure steps are always strings
  const sanitizedSteps = useMemo(() => {
    return steps.map((step) =>
      typeof step === "string" ? step : step.description || step.toString()
    );
  }, [steps]);

  const createStepState = useMemo(() => {
    return sanitizedSteps.map((step, index) => ({
      description: step,
      completed: false,
      highlighted: index === 0,
      selected: index === 0,
    }));
  }, [sanitizedSteps]);

  const [newStep, setNewStep] = useState(createStepState);

  const updateStep = useMemo(() => {
    return (stepNumber, stepsArray) => {
      return stepsArray.map((step, index) => {
        const description =
          typeof step === "string" ? step : step.description || step.toString();

        return {
          description,
          completed: index < stepNumber,
          highlighted: index === stepNumber,
          selected: index <= stepNumber,
        };
      });
    };
  }, []);

  useEffect(() => {
    const current = updateStep(currentStep - 1, sanitizedSteps);
    setNewStep(current);
  }, [currentStep, sanitizedSteps, updateStep]);

  return (
    <div className="flex max-w justify-center items-center w-full py-12">
      <div className="w-full max-w flex justify-between px-12">
        {newStep.map((step, index) => (
          <div
            key={index}
            className={
              index !== newStep.length - 1
                ? "flex items-center w-full"
                : "flex items-center"
            }
          >
            <div className="relative flex flex-col items-center text-teal-600">
              <div
                className={`rounded-full transition duration-500 ease-in-out
                  border-2 h-12 w-12 flex items-center justify-center
                  ${
                    step.completed
                      ? "bg-[#1d4ed8] text-white border-[#1d4ed8]"
                      : step.highlighted
                      ? "bg-black text-white border-black"
                      : "bg-white border-gray-300 text-black"
                  }`}
              >
                {step.completed ? (
                  <Check className="h-6 w-6" />
                ) : (
                  <span
                    className={step.highlighted ? "text-white" : "text-black"}
                  >
                    {index + 1}
                  </span>
                )}
              </div>
              <div className="absolute top-16 text-center text-xs font-medium uppercase w-32 text-black">
                {step.description}
              </div>
            </div>
            {index !== newStep.length - 1 && (
              <div
                className={`flex-auto border-t-2 mx-2 ${
                  step.completed ? "border-[#1d4ed8]" : "border-gray-300"
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stepper;
