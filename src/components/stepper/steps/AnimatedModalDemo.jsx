"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
} from "../../ui/template-animated-modal";
import { motion } from "framer-motion";
import { Check } from 'lucide-react';

export function AnimatedModalDemo({ setCurrentStep, currentStep }) {
  const templates = [
    {
      image: "../../../../public/assets/templates/blank.png",
      description: "Modèle vierge : commencez avec une page blanche pour une personnalisation ultime.",
    },
    {
      image: "../../../../public/assets/templates/dashboard.png",
      description: "Modèle de tableau de bord : mise en page prédéfinie pour la visualisation.",
    },
    {
      image: "../../../../public/assets/templates/minimal.png",
      description: "Modèle minimaliste : conception élégante et simple pour un look moderne.",
    },
  ];

  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleNext = () => {
    if (selectedTemplate !== null) {
      setCurrentStep((prev) => Math.min(prev + 1, 5));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleImageClick = (index) => {
    setSelectedTemplate(index);
  };

  return (
    <div className="py-40 flex items-center justify-center">
      <Modal initialOpen={true}>
        <ModalBody disableOutsideClick={true}>
          <ModalContent>
            <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
              Choisissez votre modèle de démarrage !
            </h4>
            <div className="flex flex-col items-center">
              <div className="flex justify-center items-center mb-4">
                {templates.map((template, idx) => (
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
                        ? "border-4 border-blue-500"
                        : ""
                    }`}
                    onClick={() => handleImageClick(idx)}
                  >
                    <img
                      src={template.image}
                      alt={`Template ${idx + 1}`}
                      loading="lazy"
                      className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0"
                    />
                    {selectedTemplate === idx && (
                      <div className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md">
                        <Check className="text-blue-600 h-6 w-6" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
              {selectedTemplate !== null && (
                <div className="mt-4 text-center text-sm text-black dark:text-neutral-300">
                  {templates[selectedTemplate].description}
                </div>
              )}
            </div>
          </ModalContent>
          <ModalFooter className="gap-4">
            <button
              className={`px-4 py-2 ${
                currentStep === 2
                  ? "bg-gray-300 text-gray-500"
                  : "bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white"
              } border border-gray-300 rounded-md text-sm w-28`}
              onClick={handleBack}
              disabled={currentStep === 2}
            >
              Back
            </button>
            <button
              className={`px-4 py-2 ${
                selectedTemplate !== null
                  ? "bg-black text-white"
                  : "bg-gray-300 text-gray-500"
              } dark:bg-white dark:text-black text-sm rounded-md border border-black w-28`}
              onClick={handleNext}
              disabled={selectedTemplate === null}
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