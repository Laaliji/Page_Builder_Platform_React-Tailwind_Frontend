import axiosInstance from '@/api/axiosConfig';

export async function getProjects() {
    try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            throw new Error('User not authenticated');
        }
        
        const response = await axiosInstance.get(`/users/${userId}/projects`);
        return response.data.data || [];
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
}

export async function createProject(projectData) {
    try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            throw new Error('User not authenticated');
        }

        // Prepare form data
        const formData = new FormData();
        formData.append('title', projectData.title);
        formData.append('description', projectData.description || '');
        formData.append('domaineName', projectData.domaineName);
        formData.append('repository', projectData.repository || '');
        
        if (projectData.image && projectData.image instanceof File) {
            formData.append('image', projectData.image);
        }

        const response = await axiosInstance.post('/projects', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        if (response.data.STATE === 'OK') {
            return { success: true, data: response.data.data };
        } else {
            return { success: false, error: response.data.message || 'Failed to create project' };
        }
    } catch (error) {
        console.error('Error creating project:', error);
        return { 
            success: false, 
            error: error.response?.data?.message || error.message || 'Failed to create project' 
        };
    }
}

export async function updateProject(id, projectData) {
    try {
        const formData = new FormData();
        formData.append('title', projectData.title);
        formData.append('description', projectData.description || '');
        formData.append('domaineName', projectData.domaineName);
        formData.append('repository', projectData.repository || '');
        
        if (projectData.image && projectData.image instanceof File) {
            formData.append('image', projectData.image);
        }

        const response = await axiosInstance.post(`/projects/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error updating project:', error);
        throw error;
    }
}

export async function deleteProject(id, confirmationData = {}) {
    try {
        const response = await axiosInstance.delete(`/projects/${id}`, {
            data: confirmationData
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting project:', error);
        throw error;
    }
}

export async function getProject(id) {
    try {
        const response = await axiosInstance.get(`/projects/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching project:', error);
        throw error;
    }
}

// Template functions
export async function getTemplates() {
    try {
        const response = await axiosInstance.get('/templates');
        return response.data.DATA || [];
    } catch (error) {
        console.error('Error fetching templates:', error);
        return [];
    }
}

export async function getTemplateById(templateId) {
    try {
        const response = await axiosInstance.get(`/templates/${templateId}`);
        return response.data.DATA || null;
    } catch (error) {
        console.error('Error fetching template:', error);
        return null;
    }
}

// Add these missing functions at the end of the file:

export async function extractPageFromTemplate(templateId, projectId, pageTitle) {
    try {
        // Get template data first
        const template = await getTemplateById(templateId);
        if (!template) {
            return { success: false, error: 'Template not found' };
        }

        // Create page with template content
        const response = await axiosInstance.post('/pages', {
            project_id: projectId,
            title: pageTitle || 'New Page',
            html_page_title: pageTitle || 'New Page',
            html_content: template.html_content || '<div>Welcome to your new page!</div>',
            css_content: template.css_content || 'body { font-family: Arial, sans-serif; }'
        });

        if (response.data.STATE === 'OK') {
            return { success: true, page: response.data.DATA, message: 'Page created from template' };
        } else {
            return { success: false, error: response.data.MESSAGE || 'Failed to create page from template' };
        }
    } catch (error) {
        console.error('Error extracting page from template:', error);
        return { 
            success: false, 
            error: error.response?.data?.MESSAGE || error.message || 'Failed to extract page from template' 
        };
    }
}

export async function createBasicPage(projectId, pageTitle) {
    try {
        const response = await axiosInstance.post('/pages', {
            project_id: projectId,
            title: pageTitle || 'Home Page',
            html_page_title: pageTitle || 'Home Page',
            html_content: `
                <div style="padding: 20px; text-align: center;">
                    <h1>Welcome to ${pageTitle || 'Your New Page'}</h1>
                    <p>This is a basic page. You can edit it using the page builder.</p>
                </div>
            `,
            css_content: `
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f5f5f5;
                }
                h1 {
                    color: #333;
                    margin-bottom: 20px;
                }
                p {
                    color: #666;
                    line-height: 1.6;
                }
            `
        });

        if (response.data.STATE === 'OK') {
            return { success: true, page: response.data.DATA, message: 'Basic page created successfully' };
        } else {
            return { success: false, error: response.data.MESSAGE || 'Failed to create basic page' };
        }
    } catch (error) {
        console.error('Error creating basic page:', error);
        return { 
            success: false, 
            error: error.response?.data?.MESSAGE || error.message || 'Failed to create basic page' 
        };
    }
}

export async function createDirectPage(projectId, pageTitle) {
    try {
        // Try multiple payload formats as a last resort
        const payloads = [
            {
                project_id: projectId,
                title: pageTitle || 'Home Page',
                html_page_title: pageTitle || 'Home Page',
                html_content: '<div><h1>Welcome</h1><p>Your page is ready!</p></div>',
                css_content: 'body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }'
            },
            {
                projectId: projectId,
                title: pageTitle || 'Home Page',
                content: '<div><h1>Welcome</h1></div>'
            },
            {
                project: projectId,
                name: pageTitle || 'Home Page',
                html: '<div>Welcome to your page!</div>'
            }
        ];

        for (let i = 0; i < payloads.length; i++) {
            try {
                console.log(`Trying payload format ${i + 1}:`, payloads[i]);
                const response = await axiosInstance.post('/pages', payloads[i]);
                
                if (response.data.STATE === 'OK' || response.data.success) {
                    return { 
                        success: true, 
                        page: response.data.DATA || response.data.data, 
                        message: `Direct page creation successful with format ${i + 1}` 
                    };
                }
            } catch (formatError) {
                console.log(`Format ${i + 1} failed:`, formatError.response?.data || formatError.message);
                continue;
            }
        }

        return { success: false, error: 'All direct page creation formats failed' };
    } catch (error) {
        console.error('Error in createDirectPage:', error);
        return { 
            success: false, 
            error: error.response?.data?.MESSAGE || error.message || 'Failed to create page directly' 
        };
    }
}

// Page functions
export async function getPages(projectId) {
    try {
        const response = await axiosInstance.get(`/projects/${projectId}/pages`);
        return response.data.DATA || [];
    } catch (error) {
        console.error('Error fetching pages:', error);
        return [];
    }
}

export async function updatePage(pageId, pageData) {
    try {
        const response = await axiosInstance.put(`/pages/${pageId}`, pageData);
        return response.data;
    } catch (error) {
        console.error('Error updating page:', error);
        throw error;
    }
}

export async function deletePage(pageId) {
    try {
        const response = await axiosInstance.delete(`/pages/${pageId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting page:', error);
        throw error;
    }
}

export async function createPageFromTemplate(templateId, projectId, pageTitle) {
    try {
        const response = await axiosInstance.post('/pages', {
            template_id: templateId,
            project_id: projectId,
            title: pageTitle || 'New Page'
        });

        if (response.data.STATE === 'OK') {
            return { success: true, page: response.data.DATA };
        } else {
            return { success: false, error: response.data.MESSAGE || 'Failed to create page' };
        }
    } catch (error) {
        console.error('Error creating page from template:', error);
        return { 
            success: false, 
            error: error.response?.data?.MESSAGE || error.message || 'Failed to create page' 
        };
    }
}

