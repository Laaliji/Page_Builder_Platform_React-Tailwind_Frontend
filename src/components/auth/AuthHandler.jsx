import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext.jsx';

/**
 * Component to handle authentication parameters in the URL
 * This is used for handling GitHub OAuth flow redirects
 */
export const AuthHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setCurrentUser } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const handleAuthParams = async () => {
      // Only process once
      if (isProcessing) return;
      
      const params = new URLSearchParams(location.search);
      const token = params.get('token');
      const githubId = params.get('github_id');
      const email = params.get('email');
      const error = params.get('error');
      
      // Check if we have authentication parameters
      if (!token || isProcessing) return;
      
      console.log("Found authentication parameters in URL", { 
        hasToken: !!token, 
        hasGithubId: !!githubId, 
        hasEmail: !!email 
      });
      
      setIsProcessing(true);
      
      if (error) {
        console.error("Authentication Error:", decodeURIComponent(error));
        alert("Authentication Error: " + decodeURIComponent(error));
        return;
      }
      
      try {
        // Save authentication data
        localStorage.setItem('authToken', token);
        if (githubId) localStorage.setItem('githubId', githubId);
        if (email) localStorage.setItem('email', email);
        
        // Redirect to stepper page after successful GitHub auth
        navigate('/stepper', { replace: true });
        
        // Display success message
        console.log("Authentication successful!");
      } catch (err) {
        console.error("Error processing authentication:", err);
        alert("Authentication Error: " + (err.message || "Failed to process authentication"));
      }
    };
    
    handleAuthParams();
  }, [location, navigate, setCurrentUser, isProcessing]);
  
  // This component doesn't render anything visible
  return null;
};

export default AuthHandler; 