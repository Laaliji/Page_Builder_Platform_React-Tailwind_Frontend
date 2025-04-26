import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import TopBarProgress from "react-topbar-progress-indicator";
import { createProject, createPageFromTemplate, extractPageFromTemplate, createBasicPage, createDirectPage } from "@/functions/projects/CRUD";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast.jsx";
import SuccessAnimation from "./SuccessAnimation";

TopBarProgress.config({
  barColors: {
    "0": "#2563eb",
    "1.0": "#1d4ed8",
  },
  shadowBlur: 5,
});

const StepperControl = ({ currentStep, totalSteps, onNext, onPrev }) => {
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setLoading(true);
      onNext();
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setLoading(true);
      onPrev();
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const handleFinish = async () => {
    setLoading(true);
    
    try {
      // Get project data from localStorage
      const projectFormData = localStorage.getItem('projectFormData');
      if (!projectFormData) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "No project data found. Please fill out the project form."
        });
        setLoading(false);
        return;
      }

      const projectData = JSON.parse(projectFormData);
      
      // Check if user is authenticated
      const userId = localStorage.getItem('userId');
      if (!userId) {
        toast({
          variant: "destructive",
          title: "Authentication Required",
          description: "Please log in to create a project."
        });
        setLoading(false);
        navigate('/login');
        return;
      }

      // Validate required fields
      if (!projectData.title || !projectData.domaineName) {
        toast({
          variant: "destructive",
          title: "Missing Information",
          description: "Please provide a project title and domain name."
        });
        setLoading(false);
        return;
      }

      // Check if a template was selected
      const selectedTemplateId = localStorage.getItem('selectedTemplateId');
      if (!selectedTemplateId) {
        toast({
          variant: "warning",
          title: "Template Required",
          description: "Please select a template for your project."
        });
        setLoading(false);
        return;
      }
      
      // Debug template ID format
      console.log("Template ID from localStorage:", selectedTemplateId);
      console.log("Template ID type:", typeof selectedTemplateId);

      // Ensure project type is selected
      const projectType = localStorage.getItem('projectType');
      if (!projectType) {
        toast({
          variant: "warning",
          title: "Project Type Required",
          description: "Please select a project type."
        });
        setLoading(false);
        return;
      }

      console.log("Creating project with user ID:", userId);
      
      // Submit project to API
      const result = await createProject(projectData);
      
      if (result.error) {
        toast({
          variant: "destructive",
          title: "Project Creation Failed",
          description: result.error
        });
        setLoading(false);
        return;
      }

      // Check if we have a valid project response
      const createdProject = result.data || (result.STATE === 'OK' ? result.data : null);
      
      if (!createdProject) {
        toast({
          title: "Success",
          description: "Project created successfully."
        });
        
        // Show success animation instead of clearing storage and navigating
        setLoading(false);
        setShowSuccess(true);
        return;
      }

      // Project creation successful
      console.log("Project created successfully:", createdProject);
      console.log("Project ID type:", typeof createdProject.idP);
      console.log("Project ID value:", createdProject.idP);
      console.log("Full project data:", JSON.stringify(createdProject, null, 2));
      
      // Create a page from the selected template
      if (selectedTemplateId && createdProject.idP) {
        // Create a page from the selected template using the new extraction function
        console.log("========= ATTEMPTING PAGE CREATION - STEPPER =========");
        console.log(`Creating page for project ${createdProject.idP} with template ${selectedTemplateId}`);
        
        try {
          const pageTitle = projectData.title || 'Home Page';
          console.log("Page title:", pageTitle);
          
          // First attempt: Use extractPageFromTemplate
          console.log("Method 1/4: Using extractPageFromTemplate to directly create a page with template content...");
          let pageResult = await extractPageFromTemplate(
            selectedTemplateId, 
            createdProject.idP, 
            pageTitle
          );
          
          // Second attempt: If that fails, try createPageFromTemplate
          if (!pageResult.success) {
            console.log("Method 1/4 failed:", pageResult.error);
            console.log("Method 2/4: Using createPageFromTemplate to create a page via backend template processing...");
            pageResult = await createPageFromTemplate(
              selectedTemplateId, 
              createdProject.idP, 
              pageTitle
            );
          }
          
          // Third attempt: Create a basic page
          if (!pageResult.success) {
            console.log("Method 2/4 failed:", pageResult.error);
            console.log("Method 3/4: Using createBasicPage to create a simple fallback page...");
            pageResult = await createBasicPage(
              createdProject.idP,
              pageTitle
            );
          }
          
          // Final attempt: Try the direct approach with multiple payload variations
          if (!pageResult.success) {
            console.log("Method 3/4 failed:", pageResult.error);
            console.log("Method 4/4: Using createDirectPage with various payload formats as last resort...");
            pageResult = await createDirectPage(
              createdProject.idP,
              pageTitle
            );
          }
          
          if (pageResult.success) {
            console.log("✅ Page created successfully:", pageResult.page);
            if (pageResult.message) {
              console.log("Creation details:", pageResult.message);
            }
            
            // Show success message and navigate
            toast({
              title: "Success",
              description: "Project and page created successfully!",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
            
            // Show success animation instead of navigating immediately
            setLoading(false);
            setShowSuccess(true);
          } else {
            console.error("❌ All page creation methods failed:", pageResult.error);
            toast({
              title: "Project Created",
              description: "Project created successfully, but we couldn't create a page from the template. You can add pages manually.",
              status: "warning",
              duration: 5000,
              isClosable: true,
            });
            
            // Still show success animation
            setLoading(false);
            setShowSuccess(true);
          }
        } catch (error) {
          console.error("Error creating page:", error);
          toast({
            title: "Project Created",
            description: "Project created successfully, but an error occurred while creating a page. You can add pages manually.",
            status: "warning",
            duration: 5000,
            isClosable: true,
          });
          
          // Still show success animation
          setLoading(false);
          setShowSuccess(true);
        }
      } else {
        // Project created without a template
        toast({
          title: "Success",
          description: "Project created successfully!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        
        // Show success animation
        setLoading(false);
        setShowSuccess(true);
      }
    } catch (error) {
      console.error("Error in project creation process:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred. Please try again."
      });
      setLoading(false);
    }
  };

  const clearLocalStorage = () => {
    // Clear form data from localStorage
    localStorage.removeItem('projectFormData');
    localStorage.removeItem('selectedTemplate');
    localStorage.removeItem('selectedTemplateId');
    localStorage.removeItem('selectedPalette');
    localStorage.removeItem('projectType');
  };

  const handleSuccessClose = () => {
    clearLocalStorage();
    setShowSuccess(false);
  };

  return (
    <>
      {loading && <TopBarProgress />}
      
      {showSuccess && (
        <SuccessAnimation 
          onClose={handleSuccessClose} 
          redirectUrl="/dash/user/projects" 
        />
      )}
      
      <div className="container flex justify-between gap-3 mt-4 mb-8">
        <Button
          onClick={handlePrev}
          className={`px-4 py-2 ${currentStep === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={currentStep === 1 || loading}
          variant="outline"
        >
          Prev
        </Button>

        {currentStep !== totalSteps ? (
          <Button
            onClick={handleNext}
            disabled={loading}
            className="px-4 py-2 bg-primary hover:bg-secondary text-white"
          >
            Next
          </Button>
        ) : (
          <Button
            onClick={handleFinish}
            disabled={loading}
            className="px-4 py-2 bg-primary hover:bg-secondary text-white flex items-center gap-2"
          >
            {loading ? "Creating..." : "Finish"}
          </Button>
        )}
      </div>
    </>
  );
};

export default StepperControl;
