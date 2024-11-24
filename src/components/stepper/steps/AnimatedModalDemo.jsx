"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "../../ui/template-animated-modal";
import { motion } from "framer-motion";
import { Check } from "lucide-react"; // Import the Check icon

export function AnimatedModalDemo({ setCurrentStep, currentStep }) {
  // Array of images (template starters)
  const images = [
    "../../../../public/assets/templates/blank.png",
    "../../../../public/assets/templates/dashboard.png",
    "../../../../public/assets/templates/minimal.png",
  ];

  // State to track the selected template index
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  // Handle Next and Back logic
  const handleNext = () => {
    if (selectedTemplate !== null) {
      setCurrentStep((prev) => Math.min(prev + 1, 5)); // Go to next step
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1)); // Go to previous step (ensure step doesn't go below 1)
  };

  // Handle image click to select a template
  const handleImageClick = (index) => {
    setSelectedTemplate(index); // Set the selected template index
  };

  return (
    <div className="py-40 flex items-center justify-center">
      <Modal initialOpen={true}>
        <ModalBody>
          <ModalContent>
            <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
              Choose your Template Starter!
            </h4>
            <div className="flex justify-center items-center">
              {images.map((image, idx) => (
                <motion.div
                  key={`images-${idx}`}
                  style={{
                    rotate: Math.random() * 20 - 10,
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotate: 0,
                    zIndex: 100,
                  }}
                  whileTap={{
                    scale: 1.1,
                    rotate: 0,
                    zIndex: 100,
                  }}
                  className={`relative rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 flex-shrink-0 overflow-hidden cursor-pointer ${
                    selectedTemplate === idx
                      ? "border-4 border-blue-500" // Highlight selected image
                      : ""
                  }`}
                  onClick={() => handleImageClick(idx)} // Handle image click
                >
                  <img
                    src={image}
                    alt={`Template ${idx + 1}`}
                    loading="lazy"
                    className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0"
                  />

                  {/* Check icon overlay */}
                  {selectedTemplate === idx && (
                    <div className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md">
                      <Check className="text-blue-600 h-6 w-6" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </ModalContent>
          <ModalFooter className="gap-4">
            {/* Back Button */}
            <button
              className="px-4 py-2 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28"
              onClick={handleBack}
            >
              Back
            </button>

            {/* Next Button */}
            <button
              className={`px-4 py-2 ${
                selectedTemplate !== null
                  ? "bg-black text-white"
                  : "bg-gray-300 text-gray-500"
              } dark:bg-white dark:text-black text-sm rounded-md border border-black w-28`}
              onClick={handleNext}
              disabled={selectedTemplate === null} // Disable if no template is selected
            >
              Next
            </button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default AnimatedModalDemo;



