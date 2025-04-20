import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Card, CardContent } from "../../ui/Card";
import { Label } from "../../ui/Label";
import { toast } from "react-hot-toast";
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

const Project = forwardRef(({ onValidate }, ref) => {
  //Manages form data values
  const [formData, setFormData] = useState({
    projectName: "",
    projectDescription: "",
    websiteTitle: "",
    repoUrl: "",
    image_url: null,
  });

  //Manages validation errors
  const [errors, setErrors] = useState({});
  //Manages submission loading state
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const isFormValid = () => {
    const newErrors = {};
    if (!formData.projectName.trim()) {
      newErrors.projectName = "Project name is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useImperativeHandle(ref, () => ({
    saveProject: async () => {
      return await saveProject();
    },
    getFormData: () => formData,
  }));

  const saveProject = async () => {
    if (!isFormValid()) {
      toast.error("Please fill in all required fields");
      return false;
    }

    setIsSubmitting(true);
    try {
      await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie");

      const formDataToSend = new FormData();
      formDataToSend.append("projectName", formData.projectName);
      formDataToSend.append(
        "projectDescription",
        formData.projectDescription || ""
      );
      formDataToSend.append("websiteTitle", formData.websiteTitle || "");
      formDataToSend.append("repoUrl", formData.repoUrl || "");

      if (formData.image_url) {
        formDataToSend.append("image_url", formData.image_url);
      }

      const userId = localStorage.getItem("userId");
      if (!userId) {
        toast.error("User not authenticated");
        return false;
      }
      formDataToSend.append("user_id", userId);

      const response = await api.post("/api/projects/create", formDataToSend);

      if (response.data.STATE === "OK") {
        const projectDetails = response.data.data;
        localStorage.setItem(
          "currentProject",
          JSON.stringify({
            idP: projectDetails.idP,
            title: projectDetails.title,
            description: projectDetails.description,
            domaineName: projectDetails.domaineName,
            repository: projectDetails.repository,
            image_url: projectDetails.image_url,
            user_id: projectDetails.user_id,
            created_at: projectDetails.created_at,
          })
        );

        toast.success("Project created successfully!");
        return projectDetails.idP;
      } else {
        toast.error(response.data.message || "Failed to create project");
        return false;
      }
    } catch (error) {
      console.error("Error creating project:", error);

      if (error.response?.status === 422) {
        const validationErrors = error.response.data.errors;
        setErrors(validationErrors);
        toast.error("Please correct the validation errors");
      } else {
        toast.error(
          error.response?.data?.message ||
            "An error occurred while creating the project"
        );
      }
      return false;
    } finally {
      setIsSubmitting(false);
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
              <Label htmlFor="projectName">Project Name *</Label>
              <input
                type="text"
                id="projectName"
                name="projectName"
                value={formData.projectName}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.projectName ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your project name"
                required
                disabled={isSubmitting}
              />
              {errors.projectName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.projectName}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="projectDescription">Project Description</Label>
              <textarea
                id="projectDescription"
                name="projectDescription"
                value={formData.projectDescription}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.projectDescription
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                placeholder="Enter your project description"
                rows="3"
                disabled={isSubmitting}
              />
              {errors.projectDescription && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.projectDescription}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="websiteTitle">Website Title</Label>
              <input
                type="text"
                id="websiteTitle"
                name="websiteTitle"
                value={formData.websiteTitle}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.websiteTitle ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter website title"
                disabled={isSubmitting}
              />
              {errors.websiteTitle && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.websiteTitle}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="repoUrl">Repository URL</Label>
              <input
                type="url"
                id="repoUrl"
                name="repoUrl"
                value={formData.repoUrl}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.repoUrl ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter GitHub repository URL"
                disabled={isSubmitting}
              />
              {errors.repoUrl && (
                <p className="mt-1 text-sm text-red-500">{errors.repoUrl}</p>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
});

export default Project;
