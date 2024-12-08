import React from 'react';
import { Card, CardContent } from '../../ui/Card';
import { Check, Edit2, Palette } from 'lucide-react';
import { Button } from '../../ui/button';

const Final = ({ projectData, selectedTemplate, colorPalette, onNavigateToStep }) => {
  const demoProjectData = {
    projectName: "My Awesome Project",
    websiteTitle: "awesome-project.com",
    repoUrl: "https://github.com/username/awesome-project"
  };
  
  const demoTemplate = "personal";
  const demoPalette = {
    id: "custom",
    name: "Personnalisé",
    colors: [
      { label: "Primaire", value: "#FFFFFF" },
      { label: "Secondaire", value: "#F3F4F6" },
      { label: "Tertiaire", value: "#E5E7EB" },
      { label: "Quaternaire", value: "#D1D5DB" }
    ]
  };
  
  const data = projectData || demoProjectData;
  const template = selectedTemplate || demoTemplate;
  const palette = colorPalette || demoPalette;

  const getTemplateTitle = (templateId) => {
    const templates = {
      personal: "Personal Project",
      business: "Business Project",
      freelance: "Freelance Project"
    };
    return templates[templateId] || "Not Selected";
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
              value={data.projectName}
            />
            <ReviewItem
              label="Website Title/Domain"
              value={data.websiteTitle}
            />
            <ReviewItem
              label="Repository URL"
              value={data.repoUrl}
            />
          </CardContent>
        </Card>
        
        {/* Right Column - Combined Template and Color Card */}
        <Card className="h-full max-h-[500px] overflow-y-auto">
          <CardContent className="p-6">
            <SectionHeader title="Project Type" stepNumber={2} />
            <ReviewItem
              label="Selected Template"
              value={getTemplateTitle(template)}
            />
            
            <SectionHeader title="Color Palette" stepNumber={3} />
            <ReviewItem label="Palette Name">
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-slate-600" />
                <span className="text-slate-900">{palette.name}</span>
              </div>
            </ReviewItem>
            
            {/* Color Palette Visualization */}
            <div className="flex justify-between items-center mt-4">
              {palette.colors.map((color, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className="w-10 h-10 rounded-full shadow-md"
                    style={{ backgroundColor: color.value }}
                  />
                  <span className="text-xs text-slate-600 mt-1">{color.label}</span>
                </div>
              ))}
            </div>
            
            {/* Maintain consistent card height */}
            <div className="h-[40px]" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Final;