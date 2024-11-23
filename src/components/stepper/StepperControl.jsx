import React, { useState } from "react";
import { Button } from "../ui/button";
import TopBarProgress from "react-topbar-progress-indicator";

TopBarProgress.config({
  barColors: {
    "0": "#2563eb",
    "1.0": "#1d4ed8",
  },
  shadowBlur: 5,
});

const StepperControl = ({ currentStep, totalSteps, onNext, onPrev }) => {
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setLoading(true);
      onNext();
      setTimeout(() => {
        setLoading(false);
      }, 1000); 
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setLoading(true);
      onPrev();
      setTimeout(() => {
        setLoading(false);
      }, 1000); 
    }
  };

  return (
    <div className="container flex justify-around mt-4 mb">
      {loading && <TopBarProgress />}
      <Button
        onClick={handlePrev}
        disabled={currentStep === 1}
        variant="secondary"
        className={`uppercase font-semibold ${
          currentStep === 1
            ? "opacity-50 cursor-not-allowed"
            : "bg-black hover:bg-slate-700 hover:text-white"
        }`}
      >
        Back
      </Button>
      <Button
        onClick={handleNext}
        disabled={currentStep === totalSteps}
        className={`uppercase font-semibold ${
          currentStep === totalSteps
            ? "opacity-50 cursor-not-allowed"
            : "bg-black hover:bg-slate-700 hover:text-white"
        }`}
      >
        {currentStep === totalSteps ? "Finish" : "Next"}
      </Button>
    </div>
  );
};

export default StepperControl;
