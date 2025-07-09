import * as React from "react";
import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import TopBarProgress from 'react-topbar-progress-indicator';
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import axios from 'axios';
import Cookies from 'js-cookie';
import { redirectToGitHub, handleGitHubCallback } from "@/functions/users/githubAuth";
import { useToast } from "@/hooks/use-toast.jsx";
import { GitHubButton } from "@/components/ui/github-button";

TopBarProgress.config({
  barColors: {
    "0": "#2563eb",
    "1.0": "#1d4ed8",
  },
  shadowBlur: 5,
});

const csrfToken = Cookies.get('XSRF-TOKEN');
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'XSRF-TOKEN': csrfToken
  },
});

export function LoginPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false); 
  const [githubLoading, setGithubLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const logo = "/assets/images/logo.png";

  // Handle GitHub login
  const handleGitHubLogin = () => {
    setGithubLoading(true);
    redirectToGitHub(false); // false because we're authenticating, not linking
  };

  // In the GitHub login useEffect
  useEffect(() => {
    const githubData = handleGitHubCallback();
    
    if (githubData) {
      if (githubData.error) {
        toast({
          variant: "destructive",
          title: "Authentication Error",
          description: githubData.error
        });
        setGithubLoading(false);
        return;
      }
      
      // Store auth data
      localStorage.setItem('authToken', githubData.token);
      if (githubData.githubId) localStorage.setItem('githubId', githubData.githubId);
      if (githubData.email) localStorage.setItem('email', githubData.email);
      if (githubData.username) localStorage.setItem('username', githubData.username);
      if (githubData.firstname) localStorage.setItem('firstname', githubData.firstname);
      if (githubData.lastname) localStorage.setItem('lastname', githubData.lastname);
      
      // Store and log user ID if available
      if (githubData.id) {
        localStorage.setItem('userId', githubData.id);
        console.log("Successfully authenticated GitHub user with ID:", githubData.id);
      }
      
      // Redirect to dashboard instead of stepper
      navigate('/dash/user/home');
    }
  }, [navigate, toast]);

  // In the handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
  
    const isValid = validateForm();
    if (!isValid) return;
  
    try {
      setLoading(true);
      const response = await axiosInstance.post("auth/login", {
        email,
        password,
      });
  
      // Store auth token and user id
      localStorage.setItem("authToken", response.data.token);
      
      // Check if user data is available in the response
      if (response.data.user && response.data.user.id) {
        const userId = response.data.user.id;
        localStorage.setItem("userId", userId);
        console.log("Successfully authenticated user with ID:", userId);
      } else if (response.data.id) {
        // Alternative response structure
        const userId = response.data.id;
        localStorage.setItem("userId", userId);
        console.log("Successfully authenticated user with ID:", userId);
      }
      
      // Redirect to dashboard instead of stepper
      navigate('/dash/user/home');
    } catch (error) {
      if (error.response) {
        const errors = error.response.data.errors;
        if (errors) {
          if (errors.email) setEmailError(errors.email[0]);
          if (errors.password) setPasswordError(errors.password[0]);
        } else {
          toast({
            variant: "destructive",
            title: "Login Failed",
            description: error.response.data.message || "Login a échoué"
          });
        }
      } else if (error.request) {
        toast({
          variant: "destructive",
          title: "Network Error",
          description: "Erreur réseau. Veuillez vérifier votre connexion."
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Une erreur inattendue s'est produite."
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    let isValid = true;
    if (!email) {
      setEmailError("Email est requis");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Mot de passe est requis");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {loading && <TopBarProgress />}
      <div className="flex flex-col items-center justify-center w-full">
        {/* Logo */}
        <a href="#">
          <img alt="logo" className="h-9 w-auto sm:h-9" src={logo} />
        </a>

        <Card className="w-[400px] shadow-md border-none mt-6">
          <CardHeader className="text-center">
            <CardTitle>Se connecter</CardTitle>
          </CardHeader>
          <CardContent>
            {/* GitHub login button */}
            <div className="mt-4 flex justify-center">
              <GitHubButton
                onClick={handleGitHubLogin}
                loading={githubLoading}
                disabled={loading}
                variant="auth"
              >
                Se connecter avec Github
              </GitHubButton>
            </div>

            {/* OR text */}
            <div className="mt-4 text-center text-sm text-gray-600">ou</div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col space-y-1.5 mt-4">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Entrez votre email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={emailError ? "border-red-500" : ""}
                />
                {emailError && <p className="text-red-500 text-xs">{emailError}</p>}
              </div>
              <div className="flex flex-col space-y-1.5 mt-4">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Entrez votre mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={passwordError ? "border-red-500" : ""}
                />
                {passwordError && <p className="text-red-500 text-xs">{passwordError}</p>}
              </div>
              <div className="flex flex-col items-center justify-center mt-8">
                <Button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded-lg"
                  disabled={loading}
                >
                  {loading ? "Connexion..." : "Se connecter"}
                </Button>
              </div>
            </form>
          {/* New user sign-up link */}
          <div className="mt-4 text-center text-sm text-gray-600">
              <p>
                Nouveau utilisateur?{" "}
                <a href="/signup" className="text-blue-600 hover:underline">
                S'inscrire
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}