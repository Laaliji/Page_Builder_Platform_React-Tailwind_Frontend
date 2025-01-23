import React, { useState, useEffect } from "react";
import { BriefcaseBusiness, User, Code } from "lucide-react";
import { GlareCard } from "../../ui/GlareCard";
import { toast } from "react-hot-toast";
import axios from "axios";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json", // Explicitly set content type
  },
});

const getColorClasses = (type) => {
  const colorMap = {
    personal: "bg-blue-100 text-blue-900",
    business: "bg-green-100 text-green-900",
    freelance: "bg-purple-100 text-purple-900",
  };
  return colorMap[type] || "bg-gray-100 text-gray-900";
};

export default function Template({ onValidate }) {
  const [selectedType, setSelectedType] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [projectId, setProjectId] = useState(null);

  // Retrieve project ID from localStorage when component mounts
  useEffect(() => {
    const currentProject = localStorage.getItem("currentProject");
    if (currentProject) {
      try {
        const parsedProject = JSON.parse(currentProject);
        const projectIdFromStorage = parsedProject.idP;

        console.log(
          "[DEBUG] Project ID retrieved from localStorage:",
          projectIdFromStorage
        );

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
    } else {
      console.log("[DEBUG] No current project found in localStorage");
    }
  }, []);

  const projectTypes = [
    {
      id: "personal",
      Icon: User,
      title: "Projet Personnel",
      description:
        "Créez un site Web pour votre portfolio personnel, votre blog ou votre projet de loisir.",
      examples: ["Blog", "Portfolio", "Projet de loisir"],
    },
    {
      id: "business",
      Icon: BriefcaseBusiness,
      title: "Projet d'entreprise",
      description:
        "Développez un site Web professionnel pour votre entreprise ou organisation.",
      examples: ["Site Web d'entreprise", "E-commerce", "Page d'acceuil"],
    },
    {
      id: "freelance",
      Icon: Code,
      title: "Projet de Freelance",
      description:
        "Créez un site Web pour un client ou votre entreprise indépendante.",
      examples: [
        "Projets des clients",
        "Page d'acceuil",
        "Présentation des services",
      ],
    },
  ];

  const handleCardSelect = async (type) => {
    console.log(
      `[DEBUG] Handling card select - Type: ${type}, ProjectId: ${projectId}`
    );

    // If no projectId, just select locally
    if (!projectId) {
      console.log("[DEBUG] No project ID, selecting type locally");
      setSelectedType(type === selectedType ? null : type);
      return;
    }

    // If projectId exists, attempt to update project type
    setIsSubmitting(true);
    try {
      // First, get the CSRF cookie
      console.log("[DEBUG] Fetching CSRF cookie");
      await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie");

      // Prepare the request payload
      const payload = {
        project_type: type,
        projectId: projectId, // Include project ID in payload
      };
      console.log("[DEBUG] Update Payload:", payload);

      // Make the API call to update project type
      const response = await api.put(
        `/api/projects/update/${projectId}`,
        payload
      );

      console.log("[DEBUG] API Response:", response.data);

      // Check the response
      if (response.data.STATE === "OK") {
        toast.success("Type de projet mis à jour avec succès!");
        setSelectedType(type);
        console.log(`[DEBUG] Project type updated to ${type}`);
      } else {
        console.error("[ERROR] Failed to update project type", response.data);
        toast.error("Échec de la mise à jour du type de projet");
      }
    } catch (error) {
      // Detailed error logging
      console.error("[ERROR] Error updating project type:", error);

      // Log specific error details
      if (error.response) {
        console.error("[ERROR] Response data:", error.response.data);
        console.error("[ERROR] Response status:", error.response.status);
        console.error("[ERROR] Response headers:", error.response.headers);
      } else if (error.request) {
        console.error("[ERROR] No response received:", error.request);
      } else {
        console.error("[ERROR] Error message:", error.message);
      }

      toast.error(
        "Une erreur s'est produite lors de la mise à jour du type de projet"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Validate form when selectedType changes
  useEffect(() => {
    // Form is valid if a type is selected
    const isValid = !!selectedType;
    console.log(
      `[DEBUG] Form Validation - Selected Type: ${selectedType}, Is Valid: ${isValid}`
    );
    onValidate(isValid);
  }, [selectedType, onValidate]);

  return (
    <div className="mt-10 mb-16">
      <h2 className="text-2xl font-semibold text-slate-900 mb-6 text-center">
        Sélectionnez le type de votre projet
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {projectTypes.map((type) => (
          <GlareCard
            key={type.id}
            isSelected={selectedType === type.id}
            onClick={() => handleCardSelect(type.id)}
            className={`relative p-6 bg-white cursor-pointer transition-all duration-300 hover:bg-gray-50 ${
              selectedType === type.id ? "ring-2 ring-blue-500" : ""
            } ${isSubmitting ? "opacity-50 pointer-events-none" : ""}`}
          >
            <div className="flex flex-col items-center gap-4">
              <div className={`p-4 rounded-full ${getColorClasses(type.id)}`}>
                <type.Icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 text-center">
                {type.title}
              </h3>
              <p className="text-sm text-gray-600 text-center">
                {type.description}
              </p>
              <div className="w-full border-t border-gray-200 pt-4 mt-2">
                <div className="flex flex-wrap justify-center gap-2">
                  {type.examples.map((example, index) => (
                    <span
                      key={`${type.id}-${index}`}
                      className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200"
                    >
                      {example}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </GlareCard>
        ))}
      </div>
      {!selectedType && (
        <p className="text-center text-red-500 mt-4">
          Veuillez sélectionner un type de projet
        </p>
      )}
    </div>
  );
}
