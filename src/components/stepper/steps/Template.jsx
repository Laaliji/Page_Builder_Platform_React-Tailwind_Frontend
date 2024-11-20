import React, { useState } from 'react';
import { User, Building2, Briefcase } from 'lucide-react';
import { GlareCard } from '../../ui/GlareCard';

export default function Template() {
  const [selectedType, setSelectedType] = useState(null);

  const projectTypes = [
    {
      id: 'personal',
      icon: <User size={48} className="text-blue-500" />,
      title: 'Personal Project',
      description: 'Create a website for your personal portfolio, blog, or hobby project.',
      color: 'border-blue-500',
    },
    {
      id: 'company',
      icon: <Building2 size={48} className="text-green-500" />,
      title: 'Company Project',
      description: 'Develop a professional website for your business or organization.',
      color: 'border-green-500',
    },
    {
      id: 'freelance',
      icon: <Briefcase size={48} className="text-purple-500" />,
      title: 'Freelance Project',
      description: 'Build a website for a client or your freelance business.',
      color: 'border-purple-500',
    },
  ];

  const handleCardSelect = (type) => {
    setSelectedType(type);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-8">
        Select Your Project Type
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projectTypes.map((type) => (
          <GlareCard
            key={type.id}
            className={`cursor-pointer p-6 rounded-lg shadow-lg transition-all duration-300 ${
              selectedType === type.id
                ? `border-4 ${type.color} scale-105`
                : 'border border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => handleCardSelect(type.id)}
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-4">{type.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{type.title}</h3>
              <p className="text-gray-600 mb-4">{type.description}</p>
              {selectedType === type.id && (
                <div className="absolute top-4 right-4 text-green-500">✓</div>
              )}
            </div>
          </GlareCard>
        ))}
      </div>
      {selectedType && (
        <div className="mt-8 text-center">
          <p className="text-lg">
            You selected:{' '}
            <span className="font-bold">
              {projectTypes.find((type) => type.id === selectedType)?.title}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
