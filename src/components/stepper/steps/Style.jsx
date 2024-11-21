"use client";

import React, { useState } from "react";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalTrigger } from "../../ui/animated-modal";

const colorPalettes = [
  { 
    id: "minimal-light", 
    name: "Minimal Light", 
    colors: ["#FFFFFF", "#F5F5F5", "#000000", "#4A4A4A"],
    description: "Clean, crisp, and professional",
  },
  { 
    id: "ocean-breeze", 
    name: "Ocean Breeze", 
    colors: ["#E0F2F1", "#4DB6AC", "#00796B", "#004D40"],
    description: "Calm and refreshing blues and greens",
  },
  { 
    id: "sunset-warm", 
    name: "Sunset Warm", 
    colors: ["#FFF3E0", "#FFB74D", "#FF9800", "#F57C00"],
    description: "Vibrant and energetic oranges",
  },
  { 
    id: "dark-mode", 
    name: "Dark Mode", 
    colors: ["#121212", "#1E1E1E", "#BB86FC", "#03DAC6"],
    description: "Modern and sleek dark theme",
  },
  { 
    id: "pastel-soft", 
    name: "Pastel Soft", 
    colors: ["#FFE5B4", "#FFCDD2", "#C5E1A5", "#80DEEA"],
    description: "Soft and gentle color combinations",
  },
];

export default function Style() {
  const [selectedPalette, setSelectedPalette] = useState(null);
  const [customColors, setCustomColors] = useState([]);

  const handleCustomColorChange = (index, value) => {
    const updatedColors = [...customColors];
    updatedColors[index] = value;
    setCustomColors(updatedColors);
  };

  const addCustomColor = () => setCustomColors([...customColors, "#000000"]);
  const removeCustomColor = (index) => {
    setCustomColors(customColors.filter((_, i) => i !== index));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Color Palette Section */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-center">Choose Color Palette</h3>
        <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
          {colorPalettes.map((palette) => (
            <div 
              key={palette.id}
              onClick={() => setSelectedPalette(palette.id)}
              className={`
                flex-shrink-0 w-[220px] p-6 rounded-lg cursor-pointer 
                transition-all duration-300 text-center
                ${selectedPalette === palette.id 
                  ? "bg-blue-100 border-2 border-blue-500 scale-105" 
                  : "bg-white hover:bg-gray-50 border border-gray-200"}
              `}
            >
              <div className="flex justify-center mb-4">
                {palette.colors.map((color, index) => (
                  <div 
                    key={index} 
                    className="w-8 h-8 mr-2 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <h4 className="font-semibold mb-2">{palette.name}</h4>
              <p className="text-sm text-gray-600">{palette.description}</p>
            </div>
          ))}

          {/* Trigger for Custom Modal */}
          <Modal>
            <ModalTrigger className="flex-shrink-0 w-[220px] p-6 rounded-lg cursor-pointer bg-white hover:bg-gray-50 border border-gray-200">
              <div className="text-gray-600">+ Create Custom Palette</div>
            </ModalTrigger>
            <ModalBody>
              <ModalContent>
                <h3 className="text-xl font-semibold mb-4 text-center">Custom Color Palette</h3>
                {customColors.map((color, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => handleCustomColorChange(index, e.target.value)}
                      className="w-12 h-12 border rounded"
                    />
                    <input
                      type="text"
                      value={color}
                      onChange={(e) => handleCustomColorChange(index, e.target.value)}
                      className="ml-4 p-2 border rounded flex-grow"
                      placeholder="Enter color hex code"
                    />
                    <button
                      onClick={() => removeCustomColor(index)}
                      className="ml-4 text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={addCustomColor}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
                >
                  Add Color
                </button>
              </ModalContent>
              <ModalFooter>
                <button
                  onClick={() => setSelectedPalette("custom")}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Save
                </button>
              </ModalFooter>
            </ModalBody>
          </Modal>
        </div>
      </div>

      {/* Selected Options Summary */}
      {selectedPalette && (
        <div className="mt-8 p-6 bg-white rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold mb-4">Your Selections</h3>
          {selectedPalette !== "custom" && (
            <div>
              <span className="font-bold">Color Palette:</span>
              <p>{colorPalettes.find((p) => p.id === selectedPalette)?.name}</p>
            </div>
          )}
          {selectedPalette === "custom" && (
            <div>
              <span className="font-bold">Custom Colors:</span>
              <div className="flex justify-center space-x-2 mt-2">
                {customColors.map((color, index) => (
                  <div 
                    key={index} 
                    className="w-8 h-8 rounded-full border" 
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
