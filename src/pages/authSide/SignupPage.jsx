import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import TopBarProgress from "react-topbar-progress-indicator";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import axios from "axios";
import Cookies from "js-cookie";
import { redirectToGitHub, handleGitHubCallback } from "@/functions/users/githubAuth";
import { useToast } from "@/hooks/use-toast.jsx";
import { GitHubButton } from "@/components/ui/github-button";

// Configure TopBarProgress
TopBarProgress.config({
  barColors: {
    "0": "#2563eb",
    "1.0": "#1d4ed8",
  },
  shadowBlur: 5,
});

// Axios instance with CSRF token
const csrfToken = Cookies.get("XSRF-TOKEN");
const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "XSRF-TOKEN": csrfToken,
  },
});

export function SignupPage() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const logo = "/assets/images/logo.png";

  // Handle GitHub signup
  const handleGitHubSignup = () => {
    setGithubLoading(true);
    redirectToGitHub(false); // false because we're authenticating, not linking
  };

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
      localStorage.setItem("authToken", githubData.token);
      if (githubData.githubId) localStorage.setItem("githubId", githubData.githubId);
      if (githubData.email) localStorage.setItem("email", githubData.email);
      if (githubData.username) localStorage.setItem("username", githubData.username);
      if (githubData.firstname) localStorage.setItem("firstname", githubData.firstname);
      if (githubData.lastname) localStorage.setItem("lastname", githubData.lastname);
      
      // Redirect to stepper or dashboard
      navigate("/stepper");
    }
  }, [navigate, toast]);

  const validateForm = () => {
    const errors = {};
    if (!firstname) errors.firstname = "Le prénom est requis.";
    if (!lastname) errors.lastname = "Le nom est requis.";
    if (!username) errors.username = "Le nom d'utilisateur est requis.";
    if (!email) errors.email = "L'email est requis.";
    if (!password) errors.password = "Le mot de passe est requis.";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      await axiosInstance.post("auth/signup", {
        firstname,
        lastname,
        username,
        email,
        password,
        password_confirmation: password,
      });
      toast({
        title: "Success",
        description: "Inscription réussie. Vous pouvez maintenant vous connecter.",
      });
      navigate("/login");
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        toast({
          variant: "destructive",
          title: "Registration Error",
          description: "Une erreur inattendue s'est produite. Veuillez réessayer."
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {loading && <TopBarProgress />}
      <div className="flex flex-col items-center w-full">
        {/* Logo */}
        <a href="#">
          <img alt="logo" className="h-9 w-auto sm:h-9" src={logo} />
        </a>
        <Card className="w-[400px] shadow-md border-none mt-4">
          <CardHeader className="text-center">
            <CardTitle>S'inscrire</CardTitle>
          </CardHeader>
          <CardContent>
            <GitHubButton
              onClick={handleGitHubSignup}
              loading={githubLoading}
              disabled={loading}
              variant="auth"
              className="mb-4"
            >
              S'inscrire avec Github
            </GitHubButton>
            <div className="text-center text-sm text-gray-600 mb-4">ou</div>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Prénom</Label>
                  <Input
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    className={errors.firstname ? "border-red-500" : ""}
                    placeholder="Entrez votre prénom"
                  />
                  {errors.firstname && (
                    <p className="text-red-500 text-xs">{errors.firstname}</p>
                  )}
                </div>
                <div>
                  <Label>Nom</Label>
                  <Input
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    className={errors.lastname ? "border-red-500" : ""}
                    placeholder="Entrez votre nom"
                  />
                  {errors.lastname && (
                    <p className="text-red-500 text-xs">{errors.lastname}</p>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <Label>Nom d'utilisateur</Label>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={errors.username ? "border-red-500" : ""}
                  placeholder="Entrez votre nom d'utilisateur"
                />
                {errors.username && (
                  <p className="text-red-500 text-xs">{errors.username}</p>
                )}
              </div>
              <div className="mt-4">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={errors.email ? "border-red-500" : ""}
                  placeholder="Entrez votre email"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email}</p>
                )}
              </div>
              <div className="mt-4">
                <Label>Mot de passe</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={errors.password ? "border-red-500" : ""}
                  placeholder="Entrez votre mot de passe"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs">{errors.password}</p>
                )}
              </div>
              <div className="mt-6">
                <Button type="submit" className="w-full bg-blue-500 text-white">
                  {loading ? "Traitement..." : "S'inscrire"}
                </Button>
              </div>
            </form>
            <div className="mt-4 text-center text-sm text-gray-600">
              <p>
                Vous avez déjà un compte ?{" "}
                <a href="/login" className="text-blue-600 hover:underline">
                  Se connecter
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
