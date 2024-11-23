import React, { useState } from "react";
import { BriefcaseBusiness, User, Code } from "lucide-react";
import { GlareCard } from "../../ui/GlareCard";

const getColorClasses = (type) => {
  const colorMap = {
    personal: "bg-blue-500/10 text-blue-500",
    business: "bg-green-500/10 text-green-500",
    freelance: "bg-purple-500/10 text-purple-500",
  };
  return colorMap[type] || "bg-slate-500/10 text-slate-500";
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
    console.log(`Card clicked: ${type}`); // Log to check if selection is triggered
    setSelectedType(type === selectedType ? null : type);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {projectTypes.map((type) => (
        <GlareCard
          key={type.id}
          onClick={() => handleCardSelect(type.id)}
          className={`relative p-6 bg-slate-800 cursor-pointer transition-all duration-300 hover:bg-slate-700 ${
            selectedType === type.id ? 'border-2 border-[#1d4ed8]' : ''
          }`}
        >
          <div className="flex flex-col items-center gap-4">
            <div className={`p-4 rounded-full ${getColorClasses(type.id)}`}>
              <type.Icon className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-semibold text-white text-center">
              {type.title}
            </h3>

            <p className="text-sm text-slate-300 text-center">
              {type.description}
            </p>

            <div className="w-full border-t border-slate-700 pt-4 mt-2">
              <div className="flex flex-wrap justify-center gap-2">
                {type.examples.map((example, index) => (
                  <span
                    key={`${type.id}-${index}`}
                    className="px-3 py-1 text-xs bg-slate-700 text-slate-300 rounded-full hover:bg-slate-600"
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
