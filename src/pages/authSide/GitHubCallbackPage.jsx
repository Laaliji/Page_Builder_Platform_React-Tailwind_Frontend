import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export function GitHubCallbackPage() {
  const location = useLocation();
  const [message, setMessage] = useState('Processing GitHub authentication...');

  useEffect(() => {
    const handleGitHubCallback = () => {
      try {
        // Extract token from URL
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        const githubId = params.get('github_id');
        const email = params.get('email');
        
        if (!token) {
          setMessage('No authentication token found. Authentication failed.');
          return;
        }
        
        console.log('GitHub authentication successful, redirecting...');
        
        // Store token and other data
        localStorage.setItem('authToken', token);
        if (githubId) localStorage.setItem('githubId', githubId);
        if (email) localStorage.setItem('email', email);
        
        // Redirect to stepper
        window.location.href = '/stepper';
      } catch (error) {
        console.error('Error during GitHub authentication:', error);
        setMessage('Authentication failed: ' + (error.message || 'Unknown error'));
      }
    };
    
    // Run immediately
    handleGitHubCallback();
  }, [location]);
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h1 className="text-2xl font-semibold mb-4">GitHub Authentication</h1>
        <div className="animate-pulse mb-4">
          <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
        <p>{message}</p>
      </div>
    </div>
  );
} 