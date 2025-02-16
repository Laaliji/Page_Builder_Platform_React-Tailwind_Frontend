import React, { useState, useEffect } from "react";
import { Card, CardContent } from "../../ui/Card";
import {
  Check,
  Edit2,
  Palette,
  BriefcaseBusiness,
  User,
  Code,
} from "lucide-react";
import { Button } from "../../ui/button";
import { toast } from "react-hot-toast";
import axios from "axios";

// Templates array for reference
const TEMPLATES = [
  {
    id: 1,
    title: "Modèle Minimaliste",
    description: "Conception élégante et simple pour un look moderne.",
    image: "/assets/templates/minimal.png",
  },
  {
    id: 2,
    title: "Tableau de Bord",
    description:
      "Modèle de tableau de bord : mise en page prédéfinie pour la visualisation.",
    image: "/assets/templates/dashboard.png",
  },
  {
    id: 3,
    title: "Page Vierge",
    description:
      "Modèle vierge : commencez avec une page blanche pour une personnalisation ultime.",
    image: "/assets/templates/blank.png",
  },
];

const Final = ({ colorPalette, onNavigateToStep }) => {
  const [currentProject, setCurrentProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Create axios instance
  const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
    withCredentials: true,
    headers: {
      Accept: "application/json",
    },
  });

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        // Get the project ID from localStorage
        const storedProject = localStorage.getItem("currentProject");
        if (!storedProject) {
          throw new Error("No current project found");
        }

        const parsedProject = JSON.parse(storedProject);
        const projectId = parsedProject.idP;

        if (!projectId) {
          throw new Error("Project ID not found");
        }

        // Fetch project details from the backend
        const response = await api.get(`/api/projects/${projectId}`);

        if (response.data && response.data.data) {
          // Access the project details from the nested data object
          setCurrentProject(response.data.data);
          console.log("[DEBUG] Retrieved project details:", response.data.data);
        } else {
          throw new Error("No project data received");
        }
      } catch (error) {
        console.error("[ERROR] Failed to fetch project details:", error);
        toast.error("Error retrieving project information");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjectDetails();
  }, []);

  // Function to get project type details
  const getProjectTypeDetails = (type) => {
    const projectTypes = {
      personal: {
        title: "Projet Personnel",
        Icon: User,
        color: "bg-blue-100 text-blue-900",
      },
      business: {
        title: "Projet d'entreprise",
        Icon: BriefcaseBusiness,
        color: "bg-green-100 text-green-900",
      },
      freelance: {
        title: "Projet de Freelance",
        Icon: Code,
        color: "bg-purple-100 text-purple-900",
      },
    };

    return (
      projectTypes[type] || {
        title: "Non spécifié",
        Icon: null,
        color: "bg-gray-100 text-gray-900",
      }
    );
  };

  const ReviewItem = ({ label, value, children }) => (
    <div className="flex items-center gap-3 mb-4">
      <div className="rounded-full bg-black text-white p-1">
        <Check className="h-4 w-4" />
      </div>
      <div className="flex flex-col flex-1">
        <span className="text-sm font-medium text-slate-500">{label}</span>
        {value && <span className="text-slate-900">{value}</span>}
        {children}
      </div>
    </div>
  );

  const SectionHeader = ({ title, stepNumber }) => (
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
        onClick={() => onNavigateToStep(stepNumber)}
      >
        <Edit2 className="h-4 w-4" />
        <span>Modify</span>
      </Button>
    </div>
  );

  // Render the project type section
  const renderProjectTypeSection = () => {
    if (!currentProject?.project_type) return null;

    const { title, Icon, color } = getProjectTypeDetails(
      currentProject.project_type
    );

    return (
      <>
        <SectionHeader title="Project Type" stepNumber={2} />
        <ReviewItem label="Selected Type">
          <div className="flex items-center gap-3">
            {Icon && (
              <div className={`p-2 rounded-full ${color}`}>
                <Icon className="w-5 h-5" />
              </div>
            )}
            <span className="text-slate-900">{title}</span>
          </div>
        </ReviewItem>
      </>
    );
  };

  // Render the template section
  const renderTemplateSection = () => {
    // Find the template that matches the project's template_id
    const matchedTemplate = TEMPLATES.find(
      (template) => template.id === currentProject?.template_id
    );

    if (!matchedTemplate) return null;

    return (
      <>
        <SectionHeader title="Template" stepNumber={4} />
        <ReviewItem label="Selected Template">
          <div className="flex items-center gap-4">
            <img
              src={matchedTemplate.image}
              alt={matchedTemplate.title}
              className="w-16 h-12 rounded-lg object-cover"
            />
            <div className="flex flex-col">
              <span className="text-slate-900 font-semibold">
                {matchedTemplate.title}
              </span>
              <span className="text-slate-600 text-sm">
                {matchedTemplate.description}
              </span>
            </div>
          </div>
        </ReviewItem>
      </>
    );
  };

  // Render the color palette section
  const renderColorPaletteSection = () => {
    if (!colorPalette) return null;

    return (
      <>
        <SectionHeader title="Color Palette" stepNumber={3} />
        <ReviewItem label="Palette Name">
          <div className="flex items-center gap-2">
            <Palette className="h-5 w-5 text-slate-600" />
            <span className="text-slate-900">{colorPalette.name}</span>
          </div>
        </ReviewItem>

        {/* Color Palette Visualization */}
        <div className="flex justify-between items-center mt-4">
          {colorPalette.colors?.map((color, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className="w-10 h-10 rounded-full shadow-md"
                style={{ backgroundColor: color.value }}
              />
              <span className="text-xs text-slate-600 mt-1">{color.label}</span>
            </div>
          ))}
        </div>
      </>
    );
  };

  if (isLoading) {
    return <div>Loading project details...</div>;
  }

  if (!currentProject) {
    return <div>No project found</div>;
  }

  return (
    <div className="mt-10 mb-16">
      <h2 className="text-2xl font-semibold text-slate-900 mb-6">
        Quick Review
      </h2>
      <div className="grid grid-cols-2 gap-8">
        {/* Left Column */}
        <Card className="h-full">
          <CardContent className="p-6">
            <SectionHeader title="Project Information" stepNumber={1} />
            <ReviewItem label="Project Name" value={currentProject.title} />
            <ReviewItem
              label="Website Title/Domain"
              value={currentProject.domaineName}
            />
            <ReviewItem
              label="Repository URL"
              value={currentProject.repository}
            />
            {currentProject.description && (
              <ReviewItem
                label="Project Description"
                value={currentProject.description}
              />
            )}
          </CardContent>
        </Card>

        {/* Right Column - Combined Template and Color Card */}
        <Card className="h-full max-h-[500px] overflow-y-auto">
          <CardContent className="p-6">
            {renderProjectTypeSection()}
            {renderTemplateSection()}
            {renderColorPaletteSection()}

            {/* Maintain consistent card height */}
            <div className="h-[40px]" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Final;
