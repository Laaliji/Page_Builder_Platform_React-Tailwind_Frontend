import React, { useState } from 'react';
import { CheckCircle, Circle, Layout, Palette, Type } from 'lucide-react';

const steps = [
  {
    title: 'Project Information',
    icon: <Layout className="w-5 h-5" />,
    description: 'Enter the details about your project.',
  },
  {
    title: 'Template and Responsiveness',
    icon: <Palette className="w-5 h-5" />,
    description: 'Choose a template and ensure it’s responsive.',
  },
  {
    title: 'Style and Color Palette',
    icon: <Type className="w-5 h-5" />,
    description: 'Customize the style of your project.',
  },
  {
    title: 'Review and Save',
    icon: <CheckCircle className="w-5 h-5" />,
    description: 'Review your settings and save your project.',
  },
];

export default function CustomStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  const isStepOptional = (step) => step === 1;
  const isStepSkipped = (step) => skipped.has(step);

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {/* Step indicators */}
      <div className="mb-16">
        <div className="flex items-center justify-between space-x-12">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center relative">
              <div
                className={`flex items-center justify-center w-16 h-16 rounded-full border-4 
                  ${index <= activeStep ? 'border-blue-500 text-blue-500' : 'border-gray-300 text-gray-300'} 
                  transition-all duration-300 ease-in-out transform 
                  ${index === activeStep ? 'scale-110' : ''}`}
                onClick={() => setActiveStep(index)}
              >
                {index < activeStep ? <CheckCircle className="w-6 h-6" /> : step.icon}
              </div>
              <div className="mt-2 text-center">{step.title}</div>
              {index < steps.length - 1 && (
                <div
                  className={`absolute w-full left-1/2 
                    ${index < activeStep ? 'bg-blue-500' : 'bg-gray-300'} 
                    transition-all duration-300`}
                  style={{ width: '100%' }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step content */}
      <div className="mt-16 p-8 border rounded-lg shadow-lg transition-transform duration-500 ease-in-out transform">
        <h2 className="text-2xl font-semibold mb-6">{steps[activeStep].title}</h2>
        <p className="text-gray-600 mb-6">{steps[activeStep].description}</p>

        {/* Navigation buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handleBack}
            disabled={activeStep === 0}
            className={`px-8 py-4 rounded-lg transition-colors mr-2 
              ${activeStep === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            Back
          </button>
          <div className="flex">
            {isStepOptional(activeStep) && (
              <button
                onClick={handleSkip}
                className="px-8 py-4 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors mr-2"
              >
                Skip
              </button>
            )}
            <button
              onClick={handleNext}
              className="px-8 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      </div>

      {/* Reset button after completion */}
      {activeStep === steps.length && (
        <div className="flex flex-col items-center mt-8">
          <p className="my-4 text-center text-xl">All steps completed - you're finished</p>
          <button
            onClick={handleReset}
            className="mt-4 px-8 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
}
