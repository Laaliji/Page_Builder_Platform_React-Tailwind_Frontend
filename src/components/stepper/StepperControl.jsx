import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import TopBarProgress from "react-topbar-progress-indicator";
import { useNavigate } from "react-router-dom";

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
  onFinish,
}) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  const handleFinish = async () => {
    setLoading(true);
    // Call the onFinish callback if provided
    if (onFinish) {
      await onFinish();
    }

    setTimeout(() => {
      setLoading(false);
      navigate("/editor");
    }, 1000);
  };

  return (
    <div className="container flex justify-between items-center mt-4 mb-4 w-full">
      {loading && <TopBarProgress />}
      {/* Back Button */}
      <Button
        onClick={handlePrev}
        disabled={currentStep === 1}
        className={`uppercase font-semibold bg-black text-white ${
          currentStep === 1 ? "bg-[#1d4ed8] cursor-not-allowed" : ""
        }`}
      >
        Back
      </Button>
      {/* Conditional Rendering for Finish or Next Button */}
      {currentStep === totalSteps ? (
        <Button
          onClick={handleFinish}
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
