import React, { useState } from 'react';
import { GlareCard } from '../../ui/GlareCard';



export default function Template() {
  const [selectedType, setSelectedType] = useState(null);

  const projectTypes = [
    {
      id: "personal",
      icon: "../../../../public/assets/icons/personal.png",
      title: "Personal Project",
      description: "Create a website for your personal portfolio, blog, or hobby project.",
    },
    {
      id: "business",
      icon: "../../../../public/assets/icons/briefcase.png",
      title: "Business Project",
      description: "Develop a professional website for your business or organization.",
    },
    {
      id: "freelance",
      icon: "../../../../public/assets/icons/freelancer.png",
      title: "Freelance Project",
      description: "Build a website for a client or your freelance business.",
    },
    
  ];

  const handleCardSelect = (type) => {
    setSelectedType(type);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-8 text-slate-900">
        Select Your Project Type
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {projectTypes.map((type) => (
          <GlareCard
            key={type.id}
            className={`cursor-pointer p-6 rounded-lg shadow-lg transition-all duration-300 h-full flex flex-col items-center text-center ${
              selectedType === type.id ? "bg-blue-100" : "bg-white"
            }`}
            isSelected={selectedType === type.id}
            onClick={() => handleCardSelect(type.id)}
          >
            <div className="mb-4">
              <img
                src={type.icon}
                alt={`${type.title} icon`}
                className="w-12 h-12"
              />
            </div>
            <h3
              className={`text-xl font-semibold mb-2 ${
                selectedType === type.id ? "text-black" : "text-blue-900"
              }`}
            >
              {type.title}
            </h3>
            <p
              className={`${
                selectedType === type.id ? "text-black" : "text-blue-700"
              } mb-4 flex-grow`}
            >
              {type.description}
            </p>
            {selectedType === type.id && (
              <div className="absolute top-4 right-4 text-blue-600">✓</div>
            )}
          </GlareCard>
        ))}
      </div>
     
    </div>
  );
}

