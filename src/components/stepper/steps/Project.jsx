import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../../ui/Card';
import { Label } from '../../ui/Label';
import { useDispatch } from 'react-redux';
import { useToast } from '@/hooks/use-toast.jsx';

const Project = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    domaineName: '',
    repository: '',
    description: ''
  });

  const [errors, setErrors] = useState({
    title: '',
    domaineName: '',
  });

  // Initialize with GitHub data if available
  useEffect(() => {
    // Retrieve saved form data if exists
    const savedFormData = localStorage.getItem('projectFormData');
    if (savedFormData) {
      try {
        setFormData(JSON.parse(savedFormData));
      } catch (e) {
        console.error("Error parsing saved form data", e);
      }
    } else {
      // Initialize with GitHub data if available
      const username = localStorage.getItem('username');
      const githubId = localStorage.getItem('githubId');
      
      // If we have GitHub data, pre-populate the form
      if (username || githubId) {
        setFormData(prev => ({
          ...prev,
          title: prev.title || `${username || 'My'}'s Website`,
          domaineName: prev.domaineName || `${username || 'my'}-website.com`
        }));
      }
    }
  }, []);

  const validateField = (name, value) => {
    if (name === 'title') {
      return !value ? 'Project title is required' : '';
    }
    if (name === 'domaineName') {
      return !value ? 'Domain name is required' : '';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Validate field
    const errorMessage = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: errorMessage
    }));
    
    // Update form data
    const updatedData = {
      ...formData,
      [name]: value
    };
    setFormData(updatedData);
    
    // Save to localStorage
    localStorage.setItem('projectFormData', JSON.stringify(updatedData));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors(prev => ({
      ...prev,
      [name]: validateField(name, value)
    }));
  };

  return (
    <div className="mt-10 mb-16">
      <h2 className="text-2xl font-semibold text-slate-900 mb-6">Project Information</h2>
      <Card className="mx-8">
        <CardContent className="pt-6">
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">
                Intitulé du projet <span className="text-red-500">*</span>
              </Label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-3 py-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Entrez votre intitulé du projet"
                required
              />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="domaineName">
                Titre/Nom de domaine du site Web <span className="text-red-500">*</span>
              </Label>
              <input
                type="text"
                id="domaineName"
                name="domaineName"
                value={formData.domaineName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-3 py-2 border ${errors.domaineName ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                placeholder="e.g., mywebsite.com"
                required
              />
              {errors.domaineName && <p className="text-red-500 text-xs mt-1">{errors.domaineName}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="repository">
                URL du dépôt sur Github <span className='text-[#1d4ed8]'>(optionnel)</span>
              </Label>
              <input
                type="url"
                id="repository"
                name="repository"
                value={formData.repository}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://github.com/username/repository"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">
                Description <span className='text-[#1d4ed8]'>(optionnel)</span>
              </Label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter a description of your project"
                rows="4"
              />
            </div>
            
            <div className="text-xs text-gray-500">
              <span className="text-red-500">*</span> Champs obligatoires
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Project;