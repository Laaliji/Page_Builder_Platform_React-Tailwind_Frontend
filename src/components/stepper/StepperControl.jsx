import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import TopBarProgress from "react-topbar-progress-indicator";

TopBarProgress.config({
  barColors: {
    0: "#2563eb",
    "1.0": "#1d4ed8",
  },
  shadowBlur: 5,
});

const StepperControl = ({
  currentStep,
  totalSteps,
  onNext,
  onPrev,
  formValidations,
}) => {
  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    if (!formValidations[currentStep - 1]) {
      alert("Please complete the form before proceeding.");
      return;
    }

    setLoading(true);
    try {
      await onNext();
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const handlePrev = () => {
    setLoading(true);
    onPrev();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="container flex justify-between items-center mt-4 mb-4 w-full">
      {loading && <TopBarProgress />}
      <Button
        onClick={handlePrev}
        disabled={currentStep === 1}
        className={`uppercase font-semibold bg-black text-white ${
          currentStep === 1 ? "bg-[#1d4ed8] cursor-not-allowed" : ""
        }`}
      >
        Back
      </Button>
      {currentStep === totalSteps ? (
        <Button
          onClick={handleNext}
          className="uppercase font-semibold bg-black text-white"
        >
          Finish
        </Button>
      ) : (
        <Button
          onClick={handleNext}
          className="uppercase font-semibold bg-black text-white"
        >
          Next
        </Button>
      )}
    </div>
  );
};

export default StepperControl;
