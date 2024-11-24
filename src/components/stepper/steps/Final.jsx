import React from 'react';
import { Card, CardContent } from '../../ui/Card';
import { Check, Edit2 } from 'lucide-react';
import { Button } from '../../ui/button';

const Final = ({ projectData, selectedTemplate, colorPalette, onNavigateToStep }) => {
  
  const demoProjectData = {
    projectName: "My Awesome Project",
    websiteTitle: "awesome-project.com",
    repoUrl: "https://github.com/username/awesome-project"
  };
  const demoTemplate = "personal";
  const demoColor = "#dfe1ec";

  
  const data = projectData || demoProjectData;
  const template = selectedTemplate || demoTemplate;
  const color = colorPalette || demoColor;

  const getTemplateTitle = (templateId) => {
    const templates = {
      personal: "Personal Project",
      business: "Business Project",
      freelance: "Freelance Project"
    };
    return templates[templateId] || "Not Selected";
  };

  const ReviewItem = ({ label, value }) => (
    <div className="flex items-center gap-3 mb-4">
      <div className="rounded-full bg-black text-white p-1">
        <Check className="h-4 w-4" />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-slate-500">{label}</span>
        <span className="text-slate-900">{value}</span>
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
    <div className="mt-10 mb-16 px-8">
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
        <Card className="h-full">
          <CardContent className="p-6">
            <SectionHeader title="Template and Responsiveness" stepNumber={2} />
            <ReviewItem
              label="Selected Template"
              value={getTemplateTitle(template)}
            />
            <SectionHeader title="Style and Color Palette" stepNumber={3} />
            <ReviewItem
              label="Primary Color"
              value={
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded-full border border-gray-200"
                    style={{ backgroundColor: color }}
                  />
                  <span>{color}</span>
                </div>
              }
            />
            {/* Added empty ReviewItem to maintain consistent card height */}
            <div className="h-[68px]" /> 
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Final;