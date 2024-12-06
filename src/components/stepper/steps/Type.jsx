import React, { useState } from "react";
import { BriefcaseBusiness, User, Code } from "lucide-react";
import { GlareCard } from "../../ui/GlareCard";

const getColorClasses = (type) => {
  const colorMap = {
    personal: "bg-blue-100 text-blue-900",
    business: "bg-green-100 text-green-900",
    freelance: "bg-purple-100 text-purple-900",
  };
  return colorMap[type] || "bg-gray-100 text-gray-900";
};

export default function Template() {
  const [selectedType, setSelectedType] = useState(null);
  
  const projectTypes = [
    {
      id: "personal",
      Icon: User,
      title: "Personal Project",
      description: "Create a website for your personal portfolio, blog, or hobby project.",
      examples: ["Blog", "Portfolio", "Hobby Project"],
    },
    {
      id: "business",
      Icon: BriefcaseBusiness,
      title: "Business Project",
      description: "Develop a professional website for your business or organization.",
      examples: ["Company Website", "E-commerce", "Landing Page"],
    },
    {
      id: "freelance",
      Icon: Code,
      title: "Freelance Project",
      description: "Build a website for a client or your freelance business.",
      examples: ["Client Projects", "Landing Page", "Service Showcase"],
    },
  ];

  const handleCardSelect = (type) => {
    console.log(`Card clicked: ${type}`);
    setSelectedType(type === selectedType ? null : type);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {projectTypes.map((type) => (
        <GlareCard
          key={type.id}
          onClick={() => handleCardSelect(type.id)}
          className={`relative p-6 bg-white cursor-pointer transition-all duration-300 hover:bg-gray-50 ${
            selectedType === type.id ? 'border-2 border-black' : ''
          }`}
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
  );
}