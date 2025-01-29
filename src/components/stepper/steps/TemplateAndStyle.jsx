import React, { useState, useEffect } from "react";
import { GlareCard } from "../../ui/GlareCard";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
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
        { label: "Primaire", value: "#FFFFFF", key: "primary_color" },
        { label: "Secondaire", value: "#F3F4F6", key: "secondary_color" },
        { label: "Tertiaire", value: "#E5E7EB", key: "tertiary_color" },
        { label: "Quaternaire", value: "#D1D5DB", key: "quaternary_color" },
      ],
    },
    {
      id: "dark",
      name: "Sombre",
      colors: [
        { label: "Primaire", value: "#1F2937", key: "primary_color" },
        { label: "Secondaire", value: "#374151", key: "secondary_color" },
        { label: "Tertiaire", value: "#4B5563", key: "tertiary_color" },
        { label: "Quaternaire", value: "#6B7280", key: "quaternary_color" },
      ],
      is_dark_mode: true,
    },
    {
      id: "blue",
      name: "Bleu",
      colors: [
        { label: "Primaire", value: "#EFF6FF", key: "primary_color" },
        { label: "Secondaire", value: "#BFDBFE", key: "secondary_color" },
        { label: "Tertiaire", value: "#60A5FA", key: "tertiary_color" },
        { label: "Quaternaire", value: "#2563EB", key: "quaternary_color" },
      ],
    },
    {
      id: "green",
      name: "Vert",
      colors: [
        { label: "Primaire", value: "#ECFDF5", key: "primary_color" },
        { label: "Secondaire", value: "#A7F3D0", key: "secondary_color" },
        { label: "Tertiaire", value: "#34D399", key: "tertiary_color" },
        { label: "Quaternaire", value: "#059669", key: "quaternary_color" },
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

  useEffect(() => {
    const isValid = !!selectedTemplate;
    onValidate(isValid);
  }, [selectedTemplate, onValidate]);

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

  const saveStyleToProject = async (styleData) => {
    try {
      await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie");

      // Validate project ID
      if (!projectId) {
        toast.error("Project ID is missing");
        return false;
      }

      // Create style payload
      const stylePayload = {
        name: colorPalettes.find((p) => p.id === selectedPalette).name,
        primary_color: styleData.primary_color,
        secondary_color: styleData.secondary_color,
        tertiary_color: styleData.tertiary_color,
        quaternary_color: styleData.quaternary_color,
        background_color: styleData.primary_color,
        text_color: selectedPalette === "dark" ? "#FFFFFF" : "#000000",
        is_dark_mode:
          colorPalettes.find((p) => p.id === selectedPalette)?.is_dark_mode ||
          false,
      };

      console.log("[DEBUG] Creating style with payload:", stylePayload);

      // Create style
      const styleResponse = await api.post("/api/styles", stylePayload);

      if (styleResponse.data.STATE !== "OK") {
        toast.error("Failed to create style");
        return false;
      }

      const styleId = styleResponse.data.data.id;

      if (!styleId) {
        console.error("[ERROR] Style was created but no ID was returned");
        toast.error("Style creation failed - no ID returned");
        return false;
      }

      // Update project with new style and template
      const projectPayload = {
        template_id: selectedTemplate,
        style_id: styleId,
      };

      console.log(
        "[DEBUG] Updating project",
        projectId,
        "with payload:",
        projectPayload
      );

      const projectResponse = await api.put(
        `/api/projects/update/${projectId}`,
        projectPayload
      );

      if (projectResponse.data.STATE === "OK") {
        // Update local storage
        const currentProject = JSON.parse(
          localStorage.getItem("currentProject")
        );
        currentProject.style_id = styleId;
        currentProject.template_id = selectedTemplate;
        localStorage.setItem("currentProject", JSON.stringify(currentProject));

        toast.success("Style and template updated successfully!");
        return true;
      } else {
        console.error("[ERROR] Project update failed:", projectResponse.data);
        toast.error("Failed to update project");
        return false;
      }
    } catch (error) {
      console.error("[ERROR] Error in saveStyleToProject:", error);
      console.error("Error details:", error.response?.data);
      toast.error("An error occurred while updating");
      return false;
    }
  };

  const handleCardClick = async (templateId) => {
    setSelectedTemplate(templateId);
    setShowModal(true);
    setSelectedPalette("custom");
    setCustomColors(colorPalettes.find((p) => p.id === "custom").colors);
  };

  const closeModal = async () => {
    if (!projectId) {
      console.log("[DEBUG] No project ID available");
      toast.error("ID du projet non disponible");
      return;
    }

    setIsSubmitting(true);

    const selectedPaletteData =
      selectedPalette === "custom"
        ? customColors
        : colorPalettes.find((p) => p.id === selectedPalette).colors;

    const styleData = selectedPaletteData.reduce((acc, color) => {
      acc[color.key] = color.value;
      return acc;
    }, {});

    await saveStyleToProject(styleData);
    setIsSubmitting(false);
    setShowModal(false);
  };

  const handlePaletteSelect = (palette) => {
    setSelectedPalette(palette.id);
    if (palette.id !== "custom") {
      setCustomColors(palette.colors);
    }
  };

  const handleColorChange = (colorIndex, newColor) => {
    const updatedColors = customColors.map((color, idx) =>
      idx === colorIndex ? { ...color, value: newColor } : color
    );
    setCustomColors(updatedColors);
  };

  return (
    <div className="mt-10 mb-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {templates.map((template, idx) => (
          <GlareCard
            key={`template-${template.id}`}
            onClick={() => handleCardClick(template.id)}
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
    </div>
  );
};

export default TemplateAndStyle;
