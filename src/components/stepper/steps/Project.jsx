import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Card, CardContent } from "../../ui/Card";
import { Label } from "../../ui/Label";
import axios from "axios";
import { toast } from "react-hot-toast";

const Project = forwardRef(({ onValidate }, ref) => {
  const [formData, setFormData] = useState({
    projectName: "",
    projectDescription: "",
    websiteTitle: "",
    repoUrl: "",
    image: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const isFormValid = () => {
    return formData.projectName;
  };

  useImperativeHandle(ref, () => ({
    saveProject: async () => {
      return await saveProject();
    },
    getFormData: () => formData,
  }));

  const saveProject = async () => {
    console.log("saveProject function called");
    if (!isFormValid()) {
      console.log("Form validation failed");
      toast.error("Please fill in the required fields");
      return false;
    }

    setIsSubmitting(true);
    console.log("Submitting form...");
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("projectName", formData.projectName);
      formDataToSend.append(
        "projectDescription",
        formData.projectDescription || ""
      );
      formDataToSend.append("websiteTitle", formData.websiteTitle || "");
      formDataToSend.append("repoUrl", formData.repoUrl || "");
      if (formData.image) {
        formDataToSend.append("image", formData.image);
        console.log("Image appended to formData");
      }

      // Get user_id from localStorage with proper error handling
      const userId = localStorage.getItem("user_id");
      if (!userId) {
        console.log("No user_id found in localStorage");
        toast.error("Session expired. Please login again.");
        window.location.href = "/login";
        return false;
      }

      formDataToSend.append("user_id", userId);
      console.log("user_id appended to formData:", userId);

      // Add authorization header
      const authToken = localStorage.getItem("authToken");
      const headers = {
        "Content-Type": "multipart/form-data",
        "X-CSRF-TOKEN": document
          .querySelector('meta[name="csrf-token"]')
          ?.getAttribute("content"),
      };

      if (authToken) {
        headers["Authorization"] = `Bearer ${authToken}`;
        console.log("Authorization token added to headers");
      }

      console.log("Sending POST request to /api/projects/create");
      const response = await axios.post(
        "/api/projects/create",
        formDataToSend,
        { headers }
      );

      if (response.data.success) {
        console.log("Project created successfully:", response.data);
        toast.success("Project created successfully!");
        return true;
      } else {
        console.log("Failed to create project:", response.data);
        toast.error(response.data.message || "Failed to create project");
        return false;
      }
    } catch (error) {
      console.error("Error creating project:", error);
      if (error.response?.status === 401) {
        console.log("Unauthorized error - redirecting to login");
        toast.error("Session expired. Please login again.");
        window.location.href = "/login";
      } else {
        console.log(
          "Error occurred while creating the project:",
          error.response?.data?.message || error.message
        );
        toast.error(
          error.response?.data?.message ||
            "An error occurred while creating the project"
        );
      }
      return false;
    } finally {
      setIsSubmitting(false);
      console.log("Form submission process completed");
    }
  };

  React.useEffect(() => {
    if (onValidate) {
      onValidate(isFormValid());
    }
  }, [formData]);

  return (
    <div className="mt-10 mb-16">
      <h2 className="text-2xl font-semibold text-slate-900 mb-6">
        Project Information
      </h2>
      <Card className="mx-8">
        <CardContent className="pt-6">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <Label htmlFor="projectName">Project Name</Label>
              <input
                type="text"
                id="projectName"
                name="projectName"
                value={formData.projectName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your project name"
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="projectDescription">Project Description</Label>
              <textarea
                id="projectDescription"
                name="projectDescription"
                value={formData.projectDescription}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your project description"
                rows="3"
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="websiteTitle">Website Title</Label>
              <input
                type="text"
                id="websiteTitle"
                name="websiteTitle"
                value={formData.websiteTitle}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter website title"
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="repoUrl">Repository URL</Label>
              <input
                type="url"
                id="repoUrl"
                name="repoUrl"
                value={formData.repoUrl}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter GitHub repository URL"
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Upload Image</Label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleFileChange}
                className="w-full text-sm text-slate-500"
                disabled={isSubmitting}
              />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
});

export default Project;
