"use client";

import React, { useState } from "react";
import { ChromePicker } from "react-color";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";

const Style = () => {
  const [color, setColor] = useState("#dfe1ec");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false); 

  const handleColorChange = (selectedColor) => {
    setColor(selectedColor.hex);
  };

  const hexToRgb = (hex) => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r}, ${g}, ${b}`;
  };

  const hexToHsl = (hex) => {
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l;
    l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
        default:
          break;
      }
      h /= 6;
    }
    return `${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(
      l * 100
    )}%`;
  };

  const colorPalettes = [
    {
      colors: ["#FFB6C1", "#FF69B4", "#FFC0CB"],
      descriptions: ["Pastel Pink", "Hot Pink", "Light Pink"],
    },
    {
      colors: ["#87CEFA", "#4682B4", "#00BFFF"],
      descriptions: ["Sky Blue", "Steel Blue", "Deep Sky Blue"],
    },
    {
      colors: ["#98FB98", "#32CD32", "#00FF00"],
      descriptions: ["Pale Green", "Lime Green", "Lime"],
    },
    {
      colors: ["#FFD700", "#FFA500", "#FF8C00"],
      descriptions: ["Gold", "Orange", "Dark Orange"],
    },
  ];

  const handleSave = () => {
    if (selectedTemplate !== null) {
      console.log(`Saved template: ${selectedTemplate}`);
      setIsDialogOpen(false); 
    } else {
      alert("Please select a template before saving.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        fontFamily: "Arial, sans-serif",
        color: "black",
        padding: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "20px",
        }}
      >
        {/* Left Section */}
        <div style={{ flex: "1", fontFamily: "Arial, sans-serif" }}>
          <h1 style={{ marginBottom: "10px" }}>Color Palette</h1>
          <p style={{ fontSize: "18px", marginBottom: "20px" }}>
            Choose the color palette for your website.
          </p>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <button
                style={{
                  padding: "10px 20px",
                  backgroundColor: "black",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Select Template
              </button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle style={{ color: "black" }}>
                  Select a Website Template
                </DialogTitle>
              </DialogHeader>

              <div
                style={{
                  marginTop: "40px",
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "20px",
                }}
              >
                {colorPalettes.map((palette, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedTemplate(index)}
                    style={{
                      border:
                        selectedTemplate === index
                          ? "2px solid #000"
                          : "1px solid #ccc",
                      borderRadius: "8px",
                      padding: "10px",
                      textAlign: "center",
                      cursor: "pointer",
                      backgroundColor:
                        selectedTemplate === index ? "#f0f0f0" : "white",
                    }}
                  >
                    {palette.colors.map((color, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "10px",
                        }}
                      >
                        <div
                          style={{
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                            backgroundColor: color,
                            marginRight: "10px",
                          }}
                        ></div>
                        <p style={{ margin: 0, color: "black" }}>
                          {palette.descriptions[idx]}
                        </p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Save Button */}
              <div style={{ marginTop: "20px", textAlign: "right" }}>
                <button
                  onClick={handleSave}
                  disabled={selectedTemplate === null}
                  style={{
                    padding: "10px 20px",
                    backgroundColor:
                      selectedTemplate !== null ? "black" : "#ccc",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor:
                      selectedTemplate !== null ? "pointer" : "not-allowed",
                  }}
                >
                  Save
                </button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Right Section */}
        <div
          style={{
            flex: "1",
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "20px",
          }}
        >
          <div style={{ display: "flex", gap: "20px" }}>
            <div style={{ flex: "1" }}>
              <ChromePicker color={color} onChange={handleColorChange} />
            </div>
            <div style={{ flex: "1" }}>
              <h3 style={{ color: "black" }}>HEX</h3>
              <input
                type="text"
                value={color}
                readOnly
                style={{
                  width: "100%",
                  padding: "8px",
                  marginBottom: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
              <h3 style={{ color: "black" }}>RGB</h3>
              <input
                type="text"
                value={hexToRgb(color)}
                readOnly
                style={{
                  width: "100%",
                  padding: "8px",
                  marginBottom: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
              <h3 style={{ color: "black" }}>HSL</h3>
              <input
                type="text"
                value={hexToHsl(color)}
                readOnly
                style={{
                  width: "100%",
                  padding: "8px",
                  marginBottom: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Style;
