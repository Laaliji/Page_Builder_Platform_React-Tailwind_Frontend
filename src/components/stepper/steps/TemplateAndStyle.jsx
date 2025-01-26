"use client";

import React, { useState, useEffect } from "react";
import { GlareCard } from "../../ui/GlareCard";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/Dialog";
import axios from "axios";
import { toast } from "react-hot-toast";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const TemplateAndStyle = ({ onValidate }) => {
  const templates = [
    {
      id: 1,
      title: "Modèle Minimaliste",
      image: "/assets/templates/minimal.png",
      description: "Conception élégante et simple pour un look moderne.",
    },
    {
      id: 2,
      title: "Tableau de Bord",
      image: "/assets/templates/dashboard.png",
      description:
        "Modèle de tableau de bord : mise en page prédéfinie pour la visualisation.",
    },
    {
      id: 3,
      title: "Page Vierge",
      image: "/assets/templates/blank.png",
      description:
        "Modèle vierge : commencez avec une page blanche pour une personnalisation ultime.",
    },
  ];

  const initialColorPalettes = [
    {
      id: "custom",
      name: "Personnalisé",
      colors: [
        { label: "Primaire", value: "#FFFFFF" },
        { label: "Secondaire", value: "#F3F4F6" },
        { label: "Tertiaire", value: "#E5E7EB" },
        { label: "Quaternaire", value: "#D1D5DB" },
      ],
    },
    {
      id: "dark",
      name: "Sombre",
      colors: [
        { label: "Fond", value: "#1F2937" },
        { label: "Élément 1", value: "#374151" },
        { label: "Élément 2", value: "#4B5563" },
        { label: "Accent", value: "#6B7280" },
      ],
    },
    {
      id: "blue",
      name: "Bleu",
      colors: [
        { label: "Clair", value: "#EFF6FF" },
        { label: "Moyen", value: "#BFDBFE" },
        { label: "Vif", value: "#60A5FA" },
        { label: "Foncé", value: "#2563EB" },
      ],
    },
    {
      id: "green",
      name: "Vert",
      colors: [
        { label: "Clair", value: "#ECFDF5" },
        { label: "Moyen", value: "#A7F3D0" },
        { label: "Vif", value: "#34D399" },
        { label: "Foncé", value: "#059669" },
      ],
    },
  ];

  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedPalette, setSelectedPalette] = useState("custom");
  const [colorPalettes, setColorPalettes] = useState(initialColorPalettes);
  const [customColors, setCustomColors] = useState(
    initialColorPalettes.find((p) => p.id === "custom").colors
  );
  const [projectId, setProjectId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation effect
  useEffect(() => {
    // Validate if a template is selected
    const isValid = !!selectedTemplate;
    onValidate(isValid);
  }, [selectedTemplate, onValidate]);

  // Fetch project ID from localStorage on component mount
  useEffect(() => {
    const currentProject = localStorage.getItem("currentProject");
    if (currentProject) {
      try {
        const parsedProject = JSON.parse(currentProject);
        const projectIdFromStorage = parsedProject.idP;

        if (projectIdFromStorage) {
          setProjectId(projectIdFromStorage);
        }
      } catch (error) {
        console.error(
          "[ERROR] Failed to parse currentProject from localStorage:",
          error
        );
        toast.error("Error retrieving project information");
      }
    }
  }, []);

  const openColorPicker = (templateIndex) => {
    setSelectedTemplate(templateIndex);
    setShowModal(true);
    setSelectedPalette("custom");
    // Reset custom colors to current palette
    setCustomColors(colorPalettes.find((p) => p.id === "custom").colors);
  };

  const handleTemplateSelect = async (templateId) => {
    // If no project ID, just select locally
    if (!projectId) {
      console.log("[DEBUG] No project ID, selecting template locally");
      setSelectedTemplate(templateId === selectedTemplate ? null : templateId);
      return;
    }

    setIsSubmitting(true);
    try {
      // Fetch CSRF cookie
      await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie");

      const payload = {
        template_id: templateId,
        projectId: projectId,
      };

      console.log("[DEBUG] Update Payload:", payload);

      const response = await api.put(
        `/api/projects/update/${projectId}`,
        payload
      );

      console.log("[DEBUG] API Response:", response.data);

      if (response.data.STATE === "OK") {
        toast.success("Template mis à jour avec succès!");
        setSelectedTemplate(templateId);
        console.log(`[DEBUG] Project template updated to ${templateId}`);
      } else {
        console.error(
          "[ERROR] Failed to update project template",
          response.data
        );
        toast.error("Échec de la mise à jour du template");
      }
    } catch (error) {
      console.error("[ERROR] Error updating project template:", error);

      if (error.response) {
        console.error("[ERROR] Response data:", error.response.data);
        console.error("[ERROR] Response status:", error.response.status);
      }

      toast.error(
        "Une erreur s'est produite lors de la mise à jour du template"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    // Update the actual color palettes when closing
    setColorPalettes((prevPalettes) =>
      prevPalettes.map((palette) =>
        palette.id === "custom" ? { ...palette, colors: customColors } : palette
      )
    );
  };

  const handlePaletteSelect = (palette) => {
    setSelectedPalette(palette.id);
  };

  const handleColorChange = (colorIndex, newColor) => {
    // Update the custom colors state directly
    const updatedColors = customColors.map((color, idx) =>
      idx === colorIndex ? { ...color, value: newColor } : color
    );
    setCustomColors(updatedColors);
  };

  return (
    <div className="mt-10 mb-16">
      {/* Template Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {templates.map((template, idx) => (
          <GlareCard
            key={`template-${template.id}`}
            onClick={() => handleTemplateSelect(template.id)}
            className={`relative p-6 bg-white cursor-pointer transition-all duration-300 hover:bg-gray-50 ${
              selectedTemplate === template.id ? "ring-2 ring-blue-500" : ""
            } ${isSubmitting ? "opacity-50 pointer-events-none" : ""}`}
            isSelected={selectedTemplate === template.id}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 rounded-lg bg-gray-100">
                <img
                  src={template.image}
                  alt={`Template ${idx + 1}`}
                  className="rounded-lg w-50 h-32 object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 text-center">
                {template.title}
              </h3>
              <p className="text-center text-sm text-gray-600">
                {template.description}
              </p>
            </div>
          </GlareCard>
        ))}
      </div>

      {/* Modal for Color Selection */}
      {showModal && (
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Choisissez une palette de couleurs</DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {colorPalettes.map((palette) => (
                <div
                  key={palette.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all duration-300 border-neutral-200 ${
                    selectedPalette === palette.id ? "bg-gray-300" : ""
                  }`}
                  onClick={() => handlePaletteSelect(palette)}
                >
                  <div className="flex justify-center space-x-2 mb-2">
                    {(palette.id === "custom"
                      ? customColors
                      : palette.colors
                    ).map((color, idx) => (
                      <div
                        key={idx}
                        className={`w-8 h-8 rounded-full relative ${
                          palette.id === "custom"
                            ? "hover:ring-2 hover:ring-blue-500"
                            : ""
                        }`}
                        style={{ backgroundColor: color.value }}
                      >
                        {palette.id === "custom" && (
                          <input
                            type="color"
                            value={color.value}
                            onChange={(e) =>
                              handleColorChange(idx, e.target.value)
                            }
                            className="absolute opacity-0 w-full h-full cursor-pointer"
                            style={{
                              top: 0,
                              left: 0,
                              position: "absolute",
                            }}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="text-center text-sm font-medium">
                    {palette.name}
                  </p>
                </div>
              ))}
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <button
                  onClick={closeModal}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Confirmer
                </button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default TemplateAndStyle;
