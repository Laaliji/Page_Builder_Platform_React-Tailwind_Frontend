import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext.jsx';
import authService from '@/services/authService';

export const GitHubCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setCurrentUser } = useAuth();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('Initializing...');

  useEffect(() => {
    const handleGitHubCallback = async () => {
      // Check if we're on the GitHub callback route and there's a token
      const params = new URLSearchParams(location.search);
      const token = params.get('token');
      
      console.log("GitHub callback processing:", { token: token ? `${token.substring(0, 10)}...` : 'none' });
      
      if (!token) {
        console.error("No token found in URL");
        setError("No authentication token was provided");
        return;
      }

      setStatus('Saving authentication token...');
      
      try {
        // Save the token
        localStorage.setItem('authToken', token);
        console.log("Token saved successfully");
        
        // Small delay to ensure token is saved
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setStatus('Retrieving user information...');
        
        // Check if token exists in localStorage
        const savedToken = localStorage.getItem('authToken');
        if (!savedToken) {
          throw new Error("Token was not properly saved to localStorage");
        }
        
        // Verify token format
        console.log("Using token format:", `Bearer ${savedToken.substring(0, 10)}...`);
        
        // Load user data
        let userData;
        try {
          userData = await authService.getCurrentUser();
          console.log("User data retrieved:", userData);
        } catch (userDataError) {
          console.error("Error retrieving user data:", userDataError);
          throw new Error(`Failed to retrieve user data: ${userDataError.message || 'Unknown error'}`);
        }
        
        if (!userData) {
          throw new Error("User data is empty or undefined");
        }
        
        setStatus('Updating authentication state...');
        
        // Update auth context with the user data
        if (typeof setCurrentUser === 'function') {
          setCurrentUser(userData);
          console.log("User context updated successfully");
        } else {
          console.warn("setCurrentUser is not a function, cannot update context");
        }
        
        setStatus('Redirecting to stepper...');
        setIsRedirecting(true);
        
        // Redirect to stepper - with timeout to ensure state updates complete
        setTimeout(() => {
          console.log("Redirecting to stepper now...");
          // Try using navigate first
          navigate('/stepper', { replace: true });
          
          // As a fallback, use direct location change
          setTimeout(() => {
            window.location.href = '/stepper';
          }, 500);
        }, 1000);
        
      } catch (err) {
        console.error("GitHub auth processing error:", err);
        setError(err.message || "Authentication process failed");
        
        // Wait a moment before redirecting to login
        setTimeout(() => {
          navigate('/login', { replace: true });
        }, 3000);
      }
    };

    if (!isRedirecting && !error) {
      handleGitHubCallback();
    }
  }, [location, navigate, setCurrentUser, isRedirecting, error]);

  // Display a loading message or error while processing
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          {error ? 'Authentication Error' : 'GitHub Authentication'}
        </h1>
        
        {error ? (
          <div className="text-red-500 mb-4">
            <p className="font-medium">Error: {error}</p>
            <p className="mt-4">Redirecting to login page...</p>
          </div>
        ) : (
          <div className="text-center">
            <div className="animate-pulse mb-4">
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
            <p className="text-gray-600 mb-2">{status}</p>
            <p className="text-sm text-gray-500">Please wait while we complete your authentication</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GitHubCallback; 