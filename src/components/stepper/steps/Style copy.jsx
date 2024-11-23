import React, { useState } from "react";
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
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Manage dialog state

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
      setIsDialogOpen(false); // Close the dialog
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
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <button
            onClick={() => setIsDialogOpen(true)} // Open the dialog
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
            <DialogTitle style={{ color: "black" }}>Select a Website Template</DialogTitle>
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
                  border: selectedTemplate === index ? "2px solid #000" : "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "10px",
                  textAlign: "center",
                  cursor: "pointer",
                  pointerEvents: "auto",
                  backgroundColor: selectedTemplate === index ? "#f0f0f0" : "white",
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
                    <p style={{ margin: 0, color: "black" }}>{palette.descriptions[idx]}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Save Button */}
          <div style={{ marginTop: "20px", textAlign: "right" }}>
            <button
              onClick={handleSave} // Save and close the dialog
              disabled={selectedTemplate === null}
              style={{
                padding: "10px 20px",
                backgroundColor: selectedTemplate !== null ? "black" : "#ccc",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: selectedTemplate !== null ? "pointer" : "not-allowed",
              }}
            >
              Save Selection
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Style;
