import React from "react";

const StepperControl = ({ currentStep, totalSteps, onNext, onPrev }) => {
  return (
    <div className="container flex justify-around mt-4 mb-8">
      <button
        onClick={onPrev}
        disabled={currentStep === 1}
        className={`uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer 
        transition duration-200 ease-in-out
        ${currentStep === 1 
          ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
          : 'bg-white text-black border-2 border-slate-300 hover:bg-slate-700 hover:text-white'}`}
      >
        Back
      </button>
      <button
        onClick={onNext}
        disabled={currentStep === totalSteps}
        className={`uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer
        transition duration-200 ease-in-out
        ${currentStep === totalSteps 
          ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
          : 'bg-blue-500 text-white hover:bg-slate-700 hover:text-white'}`}
      >
        {currentStep === totalSteps ? 'Finish' : 'Next'}
      </button>
    </div>
  );
};

export default StepperControl;