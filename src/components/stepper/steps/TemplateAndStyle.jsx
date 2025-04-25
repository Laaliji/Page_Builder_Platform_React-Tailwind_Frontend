"use client";

import React, { useState, useEffect } from "react";
import { GlareCard } from "../../ui/GlareCard";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/Dialog";
import { getTemplates } from "@/functions/projects/CRUD";
import { useToast } from "@/hooks/use-toast.jsx";
import { api_url } from "@/constant/global";

const TemplateAndStyle = () => {
  const { toast } = useToast();
  const [templates, setTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const initialColorPalettes = [
    { 
      id: "custom", 
      name: "Personnalisé", 
      colors: [
        { label: "Primaire", value: "#FFFFFF" },
        { label: "Secondaire", value: "#F3F4F6" },
        { label: "Tertiaire", value: "#E5E7EB" },
        { label: "Quaternaire", value: "#D1D5DB" }
      ]
    },
    { 
      id: "dark", 
      name: "Sombre", 
      colors: [
        { label: "Fond", value: "#1F2937" },
        { label: "Élément 1", value: "#374151" },
        { label: "Élément 2", value: "#4B5563" },
        { label: "Accent", value: "#6B7280" }
      ]
    },
    { 
      id: "blue", 
      name: "Bleu", 
      colors: [
        { label: "Clair", value: "#EFF6FF" },
        { label: "Moyen", value: "#BFDBFE" },
        { label: "Vif", value: "#60A5FA" },
        { label: "Foncé", value: "#2563EB" }
      ]
    },
    { 
      id: "green", 
      name: "Vert", 
      colors: [
        { label: "Clair", value: "#ECFDF5" },
        { label: "Moyen", value: "#A7F3D0" },
        { label: "Vif", value: "#34D399" },
        { label: "Foncé", value: "#059669" }
      ]
    }
  ];

  // Fetch templates from the API
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setIsLoading(true);
        const fetchedTemplates = await getTemplates();
        console.log("Templates fetched from API:", fetchedTemplates);
        
        if (fetchedTemplates && fetchedTemplates.length > 0) {
          setTemplates(fetchedTemplates);
        } else {
          toast({
            title: "Error",
            description: "Failed to load templates",
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error("Error fetching templates:", error);
        toast({
          title: "Error",
          description: "Failed to load templates",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTemplates();
  }, [toast]);

  // Load saved selections on mount
  useEffect(() => {
    const savedTemplate = localStorage.getItem('selectedTemplateId');
    const savedPalette = localStorage.getItem('selectedPalette');
    
    if (savedTemplate) {
      setSelectedTemplateId(parseInt(savedTemplate, 10));
    }
    
    if (savedPalette) {
      try {
        const palette = JSON.parse(savedPalette);
        setSelectedPalette(palette.id);
        
        // If we have custom colors saved, update them
        if (palette.id === 'custom' && palette.colors) {
          setColorPalettes(prevPalettes => {
            return prevPalettes.map(p => 
              p.id === 'custom' ? { ...p, colors: palette.colors } : p
            );
          });
        }
      } catch (e) {
        console.error("Error parsing saved palette:", e);
      }
    }
  }, []);

  const [selectedTemplateId, setSelectedTemplateId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedPalette, setSelectedPalette] = useState(null);
  const [colorPalettes, setColorPalettes] = useState(initialColorPalettes);
  const [hoveringColorIndex, setHoveringColorIndex] = useState(null);
  const [colorPickerPosition, setColorPickerPosition] = useState({ x: 0, y: 0 });

  const openColorPicker = (template) => {
    setSelectedTemplateId(template.id);
    
    // Log template details including HTML and CSS
    console.log("Selected Template ID:", template.id);
    console.log("Template Title:", template.title);
    console.log("Template Description:", template.description);
    console.log("Template HTML Content Preview:", template.html_content?.substring(0, 100) + '...');
    console.log("Template CSS Content Preview:", template.css_content?.substring(0, 100) + '...');
    console.log("Template HTML Content Length:", template.html_content?.length || 0);
    console.log("Template CSS Content Length:", template.css_content?.length || 0);
    
    localStorage.setItem('selectedTemplateId', template.id);
    localStorage.setItem('selectedTemplate', JSON.stringify(template));
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setHoveringColorIndex(null);
  };

  const handlePaletteSelect = (palette) => {
    setSelectedPalette(palette.id);
    
    // Save the selected palette in localStorage
    const selectedPaletteData = {
      id: palette.id,
      name: palette.name,
      colors: palette.colors
    };
    localStorage.setItem('selectedPalette', JSON.stringify(selectedPaletteData));
  };

  const handleColorChange = (paletteId, colorIndex, newColor) => {
    const updatedPalettes = colorPalettes.map(palette => 
      palette.id === paletteId 
        ? {
            ...palette, 
            colors: palette.colors.map((color, idx) => 
              idx === colorIndex ? { ...color, value: newColor } : color
            )
          }
        : palette
    );
    setColorPalettes(updatedPalettes);
    
    // Also update localStorage if the custom palette is modified
    if (paletteId === 'custom') {
      const customPalette = updatedPalettes.find(p => p.id === 'custom');
      localStorage.setItem('selectedPalette', JSON.stringify(customPalette));
    }
  };

  const handleColorHover = (event, index) => {
    setHoveringColorIndex(index);
    const rect = event.target.getBoundingClientRect();
    setColorPickerPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 50
    });
  };

  const handleColorPickerChange = (event) => {
    const newColor = event.target.value;
    handleColorChange(
      "custom", 
      hoveringColorIndex, 
      newColor
    );
  };

  return (
    <div className="mt-10 mb-16">
      <h2 className="text-2xl font-semibold text-slate-900 mb-6 text-center">
        Choisissez un modèle pour votre site
      </h2>
      
      {/* Loading state */}
      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
        </div>
      )}

      {/* Template Selection */}
      {!isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {templates.map((template) => (
            <GlareCard
              key={`template-${template.id}`}
              onClick={() => openColorPicker(template)}
              className={`relative p-6 bg-white cursor-pointer transition-all duration-300 hover:bg-gray-50`}
              isSelected={selectedTemplateId === template.id}
            >
              <div className="flex flex-col items-center gap-4">
                <div className="p-4 rounded-lg bg-gray-100">
                  <img
                    src={template.preview_image_url}
                    alt={template.title}
                    className="rounded-lg w-50 h-32 object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 text-center">
                  {template.title}
                </h3>
                <p className="text-center text-sm text-gray-600">
                  {template.description}
                </p>
              </div>
            </GlareCard>
          ))}
        </div>
      )}

      {/* Modal for Color Selection */}
      {showModal && (
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Choisissez une palette de couleurs</DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {colorPalettes.map((palette) => (
                <div
                  key={palette.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all duration-300 border-neutral-200 ${selectedPalette === palette.id ? "bg-gray-300" : ""}`}
                  onClick={() => handlePaletteSelect(palette)}
                >
                  <div className="flex justify-center space-x-2 mb-2">
                    {palette.colors.map((color, idx) => (
                      <div
                        key={idx}
                        className={`w-8 h-8 rounded-full relative ${palette.id === "custom" ? "hover:ring-2 hover:ring-blue-500" : ""}`}
                        style={{ backgroundColor: color.value }}
                        onMouseEnter={palette.id === "custom" ? (e) => handleColorHover(e, idx) : undefined}
                        onMouseLeave={() => setHoveringColorIndex(null)}
                      >
                        {palette.id === "custom" && hoveringColorIndex === idx && (
                          <input
                            type="color"
                            value={color.value}
                            onChange={handleColorPickerChange}
                            className="absolute opacity-0 w-full h-full cursor-pointer"
                            style={{
                              top: 0,
                              left: 0,
                              position: 'absolute'
                            }}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="text-center text-sm font-medium">{palette.name}</p>
                </div>
              ))}
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <button
                  onClick={closeModal}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Confirmer
                </button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default TemplateAndStyle;