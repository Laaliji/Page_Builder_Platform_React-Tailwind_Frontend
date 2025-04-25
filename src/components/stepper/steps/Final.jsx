import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '../../ui/Card';
import { Check, Edit2, Palette, Layout, User, BriefcaseBusiness, Code } from 'lucide-react';
import { Button } from '../../ui/button';
import { api_url } from '@/constant/global';

const Final = ({ onNavigateToStep }) => {
  const [projectData, setProjectData] = useState({
    title: "My Awesome Project",
    domaineName: "awesome-project.com",
    repository: "https://github.com/username/awesome-project",
    description: "An amazing project description."
  });
  
  // State for template and palette selections
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [colorPalette, setColorPalette] = useState({
    id: "custom",
    name: "Personnalisé",
    colors: [
      { label: "Primaire", value: "#FFFFFF" },
      { label: "Secondaire", value: "#F3F4F6" },
      { label: "Tertiaire", value: "#E5E7EB" },
      { label: "Quaternaire", value: "#D1D5DB" }
    ]
  });

  // Load saved data from localStorage
  useEffect(() => {
    try {
      // Load project data
      const savedProjectData = localStorage.getItem('projectFormData');
      if (savedProjectData) {
        setProjectData(JSON.parse(savedProjectData));
      }

      // Load template selection
      const savedTemplate = localStorage.getItem('selectedTemplate');
      if (savedTemplate) {
        setSelectedTemplate(JSON.parse(savedTemplate));
      }

      // Load color palette
      const savedPalette = localStorage.getItem('selectedPalette');
      if (savedPalette) {
        setColorPalette(JSON.parse(savedPalette));
      }
      
      // Load project type
      const savedType = localStorage.getItem('projectType');
      if (savedType) {
        setProjectType(savedType);
      }
    } catch (error) {
      console.error("Error loading saved data:", error);
    }
  }, []);

  // Project type state and mapping
  const [projectType, setProjectType] = useState(null);
  
  const projectTypeMap = {
    personal: {
      title: "Projet Personnel",
      Icon: User,
      description: "Site Web pour votre portfolio personnel, blog ou projet de loisir."
    },
    business: {
      title: "Projet d'entreprise",
      Icon: BriefcaseBusiness,
      description: "Site Web professionnel pour votre entreprise ou organisation."
    },
    freelance: {
      title: "Projet de Freelance",
      Icon: Code,
      description: "Site Web pour un client ou votre entreprise indépendante."
    }
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

  return (
    <div className="mt-10 mb-16">
      <h2 className="text-2xl font-semibold text-slate-900 mb-6">Quick Review</h2>
      <div className="grid grid-cols-2 gap-8">
        {/* Left Column */}
        <Card className="h-full">
          <CardContent className="p-6">
            <SectionHeader title="Project Information" stepNumber={1} />
            <ReviewItem
              label="Project Name"
              value={projectData.title}
            />
            <ReviewItem
              label="Website Title/Domain"
              value={projectData.domaineName}
            />
            <ReviewItem
              label="Repository URL"
              value={projectData.repository || "Not provided"}
            />
            {projectData.description && (
              <ReviewItem
                label="Description"
                value={projectData.description}
              />
            )}

            {/* Project Type */}
            {projectType && projectTypeMap[projectType] && (
              <>
                <SectionHeader title="Project Type" stepNumber={2} />
                <div className="flex items-center gap-3 mb-4">
                  <div className={`rounded-full p-1 ${
                    projectType === 'personal' ? 'bg-blue-100 text-blue-900' :
                    projectType === 'business' ? 'bg-green-100 text-green-900' :
                    'bg-purple-100 text-purple-900'
                  }`}>
                    {projectType === 'personal' ? <User className="h-4 w-4" /> :
                     projectType === 'business' ? <BriefcaseBusiness className="h-4 w-4" /> :
                     <Code className="h-4 w-4" />}
                  </div>
                  <div className="flex flex-col flex-1">
                    <span className="font-medium text-gray-900">{projectTypeMap[projectType].title}</span>
                    <span className="text-sm text-gray-500">{projectTypeMap[projectType].description}</span>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
        
        {/* Right Column - Combined Template and Color Card */}
        <Card className="h-full max-h-[500px] overflow-y-auto">
          <CardContent className="p-6">
            <SectionHeader title="Selected Template" stepNumber={3} />
            {selectedTemplate ? (
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="rounded-full bg-blue-100 text-blue-900 p-1">
                    <Layout className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col flex-1">
                    <span className="text-lg font-medium text-gray-900">{selectedTemplate.title}</span>
                    <span className="text-sm text-gray-500">{selectedTemplate.description}</span>
                  </div>
                </div>
                <div className="mt-4 border rounded-lg overflow-hidden">
                  <img 
                    src={selectedTemplate.preview_image_url}
                    alt={selectedTemplate.title}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-6">
                No template selected
              </div>
            )}
            
            <SectionHeader title="Color Palette" stepNumber={3} />
            <ReviewItem label="Palette Name">
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-slate-600" />
                <span className="text-slate-900">{colorPalette.name}</span>
              </div>
            </ReviewItem>
            
            {/* Color Palette Visualization */}
            <div className="flex justify-between items-center mt-4">
              {colorPalette.colors.map((color, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className="w-10 h-10 rounded-full shadow-md"
                    style={{ backgroundColor: color.value }}
                  />
                  <span className="text-xs text-slate-600 mt-1">{color.label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Final;