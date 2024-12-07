import React, { useState } from 'react';
import { Card,CardContent } from '../../ui/Card';
import { Label } from '../../ui/Label';

const Project = () => {
  const [formData, setFormData] = useState({
    projectName: '',
    websiteTitle: '',
    repoUrl: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="mt-10 mb-16">
      <h2 className="text-2xl font-semibold text-slate-900 mb-6">Project Information</h2>
      <Card className="mx-8">
        <CardContent className="pt-6">
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="projectName">
                Intitulé du projet
              </Label>
              <input
                type="text"
                id="projectName"
                name="projectName"
                value={formData.projectName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Entrez votre intitulé du projet"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="websiteTitle">
              Titre/Nom de domaine du site Web
              </Label>
              <input
                type="text"
                id="websiteTitle"
                name="websiteTitle"
                value={formData.websiteTitle}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., mywebsite.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="repoUrl">
                URL du dépôt sur Github <span className='text-sky-500'>(optionnel)</span>
              </Label>
              <input
                type="url"
                id="repoUrl"
                name="repoUrl"
                value={formData.repoUrl}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://github.com/username/repository"
                required
              />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Project;