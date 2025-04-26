import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { X } from "lucide-react";

// Define tour steps with targets and content
const tourSteps = [
  {
    id: 1,
    title: "Welcome to the Editor",
    description: "This tour will guide you through the main features of our page builder.",
    target: null, // No specific target for intro
  },
  {
    id: 2,
    title: "Toolbar",
    description: "Use these tools to save your work, add new pages, and preview your site.",
    target: ".w-full.overflow-hidden.bg-white.py-\\[9px\\].flex.flex-row.items-center.border-b-\\[1px\\]", // Target the toolbar
  },
  {
    id: 3,
    title: "Left Panel",
    description: "Access page structure, project settings, and other editor tools.",
    target: ".w-\\[5\\%\\].bg-white.pt-2.px-2.border-r-\\[1px\\]", // Target the left panel
  },
  {
    id: 4,
    title: "Canvas Area",
    description: "This is your canvas where you can drag and drop elements to build your page.",
    target: "#gjs", // Target the editor canvas
  },
  {
    id: 5,
    title: "Style Panel",
    description: "Customize the appearance of your selected elements, manage components, and edit page properties.",
    target: ".w-\\[25\\%\\].h-full.bg-background.pt-2.px-2", // Target the styles panel
  },
];

const GuidedTour = ({ onComplete }) => {
  const [open, setOpen] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [highlightPosition, setHighlightPosition] = useState(null);
  const lang = useSelector((state) => state.values.selectedLang || "en");

  // Position highlight around the target element
  useEffect(() => {
    const step = tourSteps[currentStep];
    if (!step || !step.target) {
      setHighlightPosition(null);
      return;
    }

    const targetElement = document.querySelector(step.target);
    if (targetElement) {
      const rect = targetElement.getBoundingClientRect();
      setHighlightPosition({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
      
      // Scroll to the element if needed
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    setOpen(false);
    if (onComplete) {
      onComplete();
    }
    // Save to localStorage to not show again
    localStorage.setItem('editorTourCompleted', 'true');
  };

  const handleSkip = () => {
    handleComplete();
  };

  const currentStepData = tourSteps[currentStep];

  return (
    <>
      {/* Tour Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{currentStepData.title}</DialogTitle>
            <DialogDescription>{currentStepData.description}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-row justify-between mt-4">
            <div>
              {currentStep > 0 && (
                <Button variant="outline" onClick={handlePrevious}>
                  Previous
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={handleSkip}>
                Skip
              </Button>
              <Button onClick={handleNext}>
                {currentStep < tourSteps.length - 1 ? "Next" : "Finish"}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Highlight Overlay */}
      {highlightPosition && (
        <div
          className="fixed pointer-events-none z-50 transition-all duration-300 ease-in-out"
          style={{
            top: `${highlightPosition.top}px`,
            left: `${highlightPosition.left}px`,
            width: `${highlightPosition.width}px`,
            height: `${highlightPosition.height}px`,
            boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5), 0 0 15px 5px rgba(59, 130, 246, 0.5)',
            borderRadius: '4px',
            border: '2px solid #3b82f6',
          }}
        />
      )}
    </>
  );
};

// Helper component for showing the guided tour only to new users
export const GuidedTourTrigger = () => {
  const [showTour, setShowTour] = useState(false);

  useEffect(() => {
    // Check if the user has completed the tour
    const tourCompleted = localStorage.getItem('editorTourCompleted') === 'true';
    if (!tourCompleted) {
      // Wait a bit for the UI to load completely
      const timer = setTimeout(() => {
        setShowTour(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!showTour) return null;
  return <GuidedTour onComplete={() => setShowTour(false)} />;
};

export default GuidedTour; 