import React, { useState } from "react";
import { Card, CardContent } from "../../ui/Card";
import { Button } from "../../ui/button";

const TemplateStarter = () => {
  const templates = [
    { id: "template1", name: "Basic Blog" },
    { id: "template2", name: "Portfolio" },
    { id: "template3", name: "E-Commerce" },
    { id: "template4", name: "Landing Page" },
  ];

  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleSelectTemplate = (templateId) => {
    setSelectedTemplate(templateId);
  };

  return (
    <div className="w-full p-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Choose Your Template Starter
      </h2>
      <div className="grid grid-cols-2 gap-6">
        {templates.map((template) => (
          <Card
            key={template.id}
            className={`cursor-pointer ${
              selectedTemplate === template.id
                ? "border-blue-500 ring ring-blue-200"
                : "border-gray-200"
            }`}
            onClick={() => handleSelectTemplate(template.id)}
          >
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-medium text-gray-800">
                {template.name}
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                {`This is a brief description of the ${template.name}.`}
              </p>
              {selectedTemplate === template.id && (
                <span className="text-blue-500 font-medium mt-4 block">
                  Selected
                </span>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TemplateStarter;
