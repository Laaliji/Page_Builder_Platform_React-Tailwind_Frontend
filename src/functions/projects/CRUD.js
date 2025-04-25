import { api_url } from "@/constant/global";
import useFetch from "@/hooks/useFetch";

export async function getProjects({ idUser }){
    const response = await fetch(`${api_url}/users/${idUser}/projects`,{
        method : 'GET',
        headers : { 'Content-Type' : 'application/json' }
    })
    return (await response.json()).data
}


export async function deleteProject({ idProject , body }){
    const response = await fetch(`${api_url}/projects/${idProject}`,{
        method : 'DELETE',
        body : JSON.stringify(body),
        headers : { 'Content-Type' : 'application/json' }
    })
    return (await response.json()).STATE
}


export async function getProject({ id }){
    return useFetch({method:'GET' , resource:`projects/${id}`})
}

export async function updateProject({ id , body , isFormData }){
    return useFetch({ method:'POST',body , isFormData ,resource:`projects/update/${id}` })
}

export async function createProject(projectData) {
    try {
        // Get user_id from localStorage
        const userId = localStorage.getItem('userId');
        if (!userId) {
            console.error("User ID not found in localStorage");
            return { error: "User not authenticated" };
        }

        console.log("Creating project for user ID:", userId);
        
        // Create a normalized payload ensuring field names match backend
        const payload = {
            title: projectData.title,
            description: projectData.description || '',
            domaineName: projectData.domaineName,
            repository: projectData.repository || '',
            user_id: userId,
            // Default empty string for optional fields that might be required
            image_url: '',
            shared_link: ''
        };
        
        console.log("Project payload:", payload);
        
        // Create FormData for file upload if needed
        let requestBody;
        let headers = {};
        let method = 'POST';
        
        if (projectData.image) {
            // If there's an image, use FormData
            requestBody = new FormData();
            Object.entries(payload).forEach(([key, value]) => {
                requestBody.append(key, value);
            });
            
            if (projectData.image instanceof File) {
                requestBody.append('image', projectData.image);
            }
        } else {
            // Otherwise use JSON
            requestBody = JSON.stringify(payload);
            headers = { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            };
        }

        const response = await fetch(`${api_url}/projects`, {
            method,
            body: requestBody,
            headers,
            credentials: 'include'
        });

        if (!response.ok) {
            const contentType = response.headers.get("content-type");
            let errorMessage = `Server responded with ${response.status}`;
            
            if (contentType && contentType.includes("application/json")) {
                try {
                    const errorData = await response.json();
                    console.error("Server error details:", errorData);
                    errorMessage = errorData.message || errorData.error || errorMessage;
                } catch (parseError) {
                    console.error("Error parsing error response:", parseError);
                }
            } else {
                const textError = await response.text();
                console.error("Server error (non-JSON):", textError);
            }
            
            return { error: errorMessage };
        }

        try {
            const result = await response.json();
            console.log("Project creation response:", result);
            return result;
        } catch (parseError) {
            console.error("Error parsing successful response:", parseError);
            return { 
                success: true, 
                message: "Project created successfully, but response could not be parsed" 
            };
        }
    } catch (error) {
        console.error("Error creating project:", error);
        return { error: error.message };
    }
}

// Template-related functions
export async function getTemplates() {
    try {
        const response = await fetch(`${api_url}/templates`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
        
        const result = await response.json();
        if (result.STATE === 'OK' && result.DATA) {
            return result.DATA;
        }
        return [];
    } catch (error) {
        console.error("Error fetching templates:", error);
        return [];
    }
}

export async function getTemplateById(templateId) {
    try {
        const response = await fetch(`${api_url}/templates/${templateId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
        
        const result = await response.json();
        if (result.STATE === 'OK' && result.DATA) {
            return result.DATA;
        }
        return null;
    } catch (error) {
        console.error(`Error fetching template ${templateId}:`, error);
        return null;
    }
}

export async function createPageFromTemplate(templateId, projectId, pageTitle) {
    try {
        console.log("========= FRONTEND: CREATE PAGE FROM TEMPLATE STARTED =========");
        console.log("Parameters received:", {
            templateId,
            projectId,
            pageTitle
        });

        // Ensure IDs are in the correct format
        let finalTemplateId = templateId;
        let finalProjectId = projectId;
        
        // Convert IDs if needed (some might come as strings, others as numbers)
        if (typeof templateId === 'string' && !isNaN(templateId)) {
            finalTemplateId = parseInt(templateId, 10);
            console.log("Converted template ID from string to number:", finalTemplateId);
        }
        
        if (typeof projectId === 'string' && !isNaN(projectId)) {
            finalProjectId = parseInt(projectId, 10);
            console.log("Converted project ID from string to number:", finalProjectId);
        }

        // Get the template data first to manually extract content
        const template = await getTemplateById(finalTemplateId);
        
        if (!template) {
            console.error("Template not found");
            console.log("========= FRONTEND: CREATE PAGE FROM TEMPLATE FAILED =========");
            return { success: false, error: "Template not found" };
        }
        
        // Generate a unique ID for the page
        const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
        const randomStr = Math.random().toString(36).substring(2, 10);
        const pageId = `page_${timestamp}_${randomStr}`;
        
        // Use null for titles to avoid casting issues
        const finalTitle = pageTitle || template.title || null;
        
        // Create a direct page creation request instead
        const pageData = {
            id: pageId,
            project_id: finalProjectId,
            title: finalTitle,
            html_page_title: finalTitle,
            html_content: template.html_content,
            css_content: template.css_content
        };
        
        // Use the standard page creation endpoint
        console.log("Creating page directly with template content");
        const directEndpoint = `${api_url}/pages`;
        
        const response = await fetch(directEndpoint, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(pageData)
        });
        
        // Debug: Log response status and headers
        console.log("Response received from server");
        console.log("Response status:", response.status);
        console.log("Response status text:", response.statusText);
        
        if (!response.ok) {
            console.error("Response not OK (status " + response.status + ")");
            let errorMessage = `Server responded with ${response.status}`;
            
            try {
                const errorData = await response.json();
                console.error("Server error details:", errorData);
                errorMessage = errorData.MESSAGE || errorData.ERRORS || errorMessage;
            } catch (parseError) {
                console.error("Error parsing error response:", parseError);
            }
            
            console.log("========= FRONTEND: CREATE PAGE FROM TEMPLATE FAILED =========");
            return { success: false, error: errorMessage };
        }
        
        console.log("Response is OK, parsing JSON...");
        const result = await response.json();
        console.log("Parsed response:", result);
        
        if (result.STATE === 'OK' && result.DATA) {
            console.log("Page created successfully:", result.DATA);
            console.log("========= FRONTEND: CREATE PAGE FROM TEMPLATE COMPLETED SUCCESSFULLY =========");
            return { success: true, page: result.DATA };
        }
        
        console.error("Response did not contain expected success data");
        console.log("========= FRONTEND: CREATE PAGE FROM TEMPLATE FAILED =========");
        return { success: false, error: result.MESSAGE || "Invalid response from server" };
    } catch (error) {
        console.error("Error creating page from template:", error);
        console.log("========= FRONTEND: CREATE PAGE FROM TEMPLATE FAILED =========");
        return { success: false, error: error.message };
    }
}

/**
 * Create a direct page from template content without relying on API endpoint
 * by directly extracting template content and creating a new page
 */
export async function extractPageFromTemplate(templateId, projectId, pageTitle) {
    try {
        console.log("========= FRONTEND: EXTRACT PAGE FROM TEMPLATE STARTED =========");
        console.log("Parameters received:", {
            templateId,
            projectId,
            pageTitle
        });

        // First, get the template to extract its HTML and CSS content
        const template = await getTemplateById(templateId);
        
        if (!template) {
            console.error("Template not found");
            return { success: false, error: "Template not found" };
        }
        
        console.log("Template fetched successfully:");
        console.log("- Title:", template.title);
        console.log("- HTML content length:", template.html_content?.length || 0);
        console.log("- CSS content length:", template.css_content?.length || 0);
        
        // Generate a unique ID for the page using timestamp + random string
        const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
        const randomStr = Math.random().toString(36).substring(2, 10);
        const pageId = `page_${timestamp}_${randomStr}`;
        
        console.log("Generated page ID:", pageId);
        
        // Based on the error, we need to be careful with the title and html_page_title fields
        // Using null instead of empty string to avoid casting issues
        const finalTitle = pageTitle || template.title || null;
        
        // Prepare the request for creating a new page with the template content
        const pageData = {
            id: pageId,
            project_id: projectId, 
            // Either send null or a string, avoid empty strings
            title: finalTitle,
            html_page_title: finalTitle,
            html_content: template.html_content,
            css_content: template.css_content
        };
        
        console.log("Creating page with extracted template content:");
        console.log("- Project ID:", projectId);
        console.log("- Page title:", pageData.title);
        
        // Use the store endpoint directly - backend route is api/pages (POST)
        const endpoint = `${api_url}/pages`;
        console.log("Using endpoint:", endpoint);
        
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(pageData)
        });
        
        if (!response.ok) {
            console.error("Response not OK:", response.status, response.statusText);
            let errorMessage = `Server responded with ${response.status}`;
            
            try {
                const errorData = await response.json();
                console.error("Error details:", errorData);
                errorMessage = errorData.MESSAGE || errorData.ERRORS || errorMessage;
            } catch (e) {
                console.error("Could not parse error response:", e);
            }
            
            console.log("========= FRONTEND: EXTRACT PAGE FROM TEMPLATE FAILED =========");
            return { success: false, error: errorMessage };
        }
        
        const result = await response.json();
        console.log("Page creation response:", result);
        
        if (result.STATE === 'OK' && result.DATA) {
            console.log("Page created with extracted template content successfully");
            console.log("========= FRONTEND: EXTRACT PAGE FROM TEMPLATE COMPLETED SUCCESSFULLY =========");
            return { success: true, page: result.DATA };
        }
        
        console.error("Invalid response from server");
        console.log("========= FRONTEND: EXTRACT PAGE FROM TEMPLATE FAILED =========");
        return { success: false, error: result.MESSAGE || "Invalid response from server" };
    } catch (error) {
        console.error("Error extracting template content and creating page:", error);
        console.log("========= FRONTEND: EXTRACT PAGE FROM TEMPLATE FAILED =========");
        return { success: false, error: error.message };
    }
}

/**
 * Create a basic fallback page with minimal content as a last resort
 * when other methods fail
 */
export async function createBasicPage(projectId, pageTitle) {
    try {
        console.log("========= FRONTEND: CREATE BASIC PAGE STARTED =========");
        console.log("Creating basic page for project:", projectId);
        
        // Generate a unique ID for the page using timestamp + random string
        const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
        const randomStr = Math.random().toString(36).substring(2, 10);
        const pageId = `page_${timestamp}_${randomStr}`;
        
        console.log("Generated page ID:", pageId);
        
        // Use null for title to avoid casting issues
        const finalTitle = pageTitle || "New Page";
        
        // Basic HTML and CSS templates
        const basicHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${finalTitle}</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <nav>
            <div class="container">
                <h1>${finalTitle}</h1>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </div>
        </nav>
    </header>
    <main>
        <section class="hero">
            <div class="container">
                <h2>Welcome to ${finalTitle}</h2>
                <p>This is a basic page created for your project.</p>
            </div>
        </section>
        <section class="content">
            <div class="container">
                <h2>Content Section</h2>
                <p>You can edit this page in the page builder.</p>
            </div>
        </section>
    </main>
    <footer>
        <div class="container">
            <p>&copy; ${new Date().getFullYear()} - All rights reserved</p>
        </div>
    </footer>
</body>
</html>`;

        const basicCss = `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f9f9f9;
}

.container {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 15px;
}

/* Header styles */
header {
    background-color: #2c3e50;
    padding: 20px 0;
    color: #fff;
}

nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

nav h1 {
    font-size: 1.5rem;
    margin: 0;
}

nav ul {
    display: flex;
    list-style: none;
}

nav ul li {
    margin-left: 20px;
}

nav ul li a {
    color: #fff;
    text-decoration: none;
    transition: color 0.3s;
}

nav ul li a:hover {
    color: #3498db;
}

/* Hero section */
.hero {
    background-color: #3498db;
    color: #fff;
    padding: 60px 0;
    text-align: center;
}

.hero h2 {
    font-size: 2.5rem;
    margin-bottom: 20px;
}

.hero p {
    font-size: 1.2rem;
    max-width: 600px;
    margin: 0 auto;
}

/* Content section */
.content {
    padding: 60px 0;
}

.content h2 {
    color: #2c3e50;
    margin-bottom: 20px;
}

/* Footer */
footer {
    background-color: #2c3e50;
    color: #fff;
    padding: 20px 0;
    text-align: center;
}`;

        // Create page with basic content, trying different payload formats
        // Format 1: Using null for title fields
        const pageData = {
            id: pageId,
            project_id: projectId,
            title: finalTitle,
            html_page_title: finalTitle,
            html_content: basicHtml,
            css_content: basicCss
        };
        
        // Try the correct endpoint - main pages store endpoint
        const endpoint = `${api_url}/pages`;
        console.log("Using endpoint:", endpoint);
        console.log("Sending page data with:", {
            id: pageData.id,
            project_id: pageData.project_id,
            title_type: typeof pageData.title,
            title_value: pageData.title
        });
        
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(pageData)
        });
        
        if (!response.ok) {
            console.error(`Failed with endpoint ${endpoint}: ${response.status} ${response.statusText}`);
            
            let errorMessage = `Server responded with ${response.status}`;
            try {
                const errorData = await response.json();
                console.error("Error details:", errorData);
                errorMessage = errorData.MESSAGE || errorData.ERRORS || errorMessage;
            } catch (e) {
                console.error("Could not parse error response:", e);
            }
            
            // Try a second approach with title as null
            console.log("Trying alternative payload format with title as null");
            const altPageData = {
                ...pageData,
                title: null,
                html_page_title: null
            };
            
            try {
                const altResponse = await fetch(endpoint, {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify(altPageData)
                });
                
                if (altResponse.ok) {
                    const altResult = await altResponse.json();
                    if (altResult.STATE === 'OK' && altResult.DATA) {
                        console.log("Alternative payload worked! Page created successfully");
                        console.log("========= FRONTEND: CREATE BASIC PAGE COMPLETED SUCCESSFULLY =========");
                        return { success: true, page: altResult.DATA };
                    }
                }
                
                console.error("Alternative payload also failed");
            } catch (altError) {
                console.error("Error with alternative payload:", altError);
            }
            
            console.log("========= FRONTEND: CREATE BASIC PAGE FAILED =========");
            return { success: false, error: errorMessage };
        }
        
        // Process successful response
        const result = await response.json();
        console.log("Page creation response:", result);
        
        if (result.STATE === 'OK' && result.DATA) {
            console.log("Basic page created successfully");
            console.log("========= FRONTEND: CREATE BASIC PAGE COMPLETED SUCCESSFULLY =========");
            return { success: true, page: result.DATA };
        }
        
        console.error("Invalid response from server:", result);
        console.log("========= FRONTEND: CREATE BASIC PAGE FAILED =========");
        return { success: false, error: result.MESSAGE || "Invalid response from server" };
    } catch (error) {
        console.error("Error creating basic page:", error);
        console.log("========= FRONTEND: CREATE BASIC PAGE FAILED =========");
        return { success: false, error: error.message };
    }
}

/**
 * Last-resort approach for creating a page with raw POST request
 */
export async function createDirectPage(projectId, pageTitle) {
    try {
        console.log("========= FRONTEND: CREATING DIRECT PAGE STARTED =========");
        console.log("Creating raw page for project:", projectId);
        
        // Generate a unique ID for the page using timestamp + random string
        const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
        const randomStr = Math.random().toString(36).substring(2, 10);
        const pageId = `page_${timestamp}_${randomStr}`;
        
        // Create a minimal page with just the essentials
        const endpoint = `${api_url}/pages`;
        
        // Try different variations of the payload
        const variations = [
            // 1. Just project_id and ID
            {
                id: pageId,
                project_id: projectId,
                html_content: `<html><body><h1>Hello World</h1></body></html>`,
                css_content: `body { font-family: sans-serif; }`
            },
            // 2. With title as null
            {
                id: pageId,
                project_id: projectId,
                title: null,
                html_page_title: null,
                html_content: `<html><body><h1>Hello World</h1></body></html>`,
                css_content: `body { font-family: sans-serif; }`
            },
            // 3. With title as empty string
            {
                id: pageId,
                project_id: projectId,
                title: "",
                html_page_title: "",
                html_content: `<html><body><h1>Hello World</h1></body></html>`,
                css_content: `body { font-family: sans-serif; }`
            }
        ];
        
        for (let i = 0; i < variations.length; i++) {
            const variation = variations[i];
            console.log(`Trying payload variation ${i+1}/${variations.length}:`, variation);
            
            try {
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify(variation)
                });
                
                console.log(`Variation ${i+1} response:`, response.status, response.statusText);
                
                if (response.ok) {
                    const result = await response.json();
                    console.log(`Variation ${i+1} result:`, result);
                    
                    if (result.STATE === 'OK' && result.DATA) {
                        console.log(`✅ Success with variation ${i+1}!`);
                        console.log("========= FRONTEND: CREATING DIRECT PAGE COMPLETED SUCCESSFULLY =========");
                        return { 
                            success: true, 
                            page: result.DATA,
                            message: `Created with variation ${i+1}`
                        };
                    }
                }
                
                const errorData = await response.json();
                console.error(`❌ Variation ${i+1} failed:`, errorData);
            } catch (error) {
                console.error(`Error with variation ${i+1}:`, error);
            }
        }
        
        console.error("All payload variations failed");
        console.log("========= FRONTEND: CREATING DIRECT PAGE FAILED =========");
        return { 
            success: false, 
            error: "Failed to create page with any payload variation" 
        };
    } catch (error) {
        console.error("Error creating direct page:", error);
        console.log("========= FRONTEND: CREATING DIRECT PAGE FAILED =========");
        return { success: false, error: error.message };
    }
}

