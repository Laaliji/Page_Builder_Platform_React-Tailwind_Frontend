import * as React from "react";
import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import TopBarProgress from 'react-topbar-progress-indicator';
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { FaGithub } from "react-icons/fa";
import axios from 'axios';
import Cookies from 'js-cookie';

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

const handleGitHubLogin = () => {
  window.location.href = 'http://localhost:8000/api/auth/github';
};

export function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const logo = "/assets/images/logo.png";

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const githubId = urlParams.get('github_id');
    const email = urlParams.get('email');

    if (token && githubId && email) {
      localStorage.setItem('authToken', token);
      localStorage.setItem('githubId', githubId);
      localStorage.setItem('email', email);
      navigate('/stepper');
    }
  }, [navigate]);

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

      localStorage.setItem("authToken", response.data.token);
      navigate('/stepper');
    } catch (error) {
      if (error.response) {
        const errors = error.response.data.errors;
        if (errors) {
          if (errors.email) setEmailError(errors.email[0]);
          if (errors.password) setPasswordError(errors.password[0]);
        } else {
          alert(error.response.data.message || "Login a échoué");
        }
      } else if (error.request) {
        alert("Erreur réseau. Veuillez vérifier votre connexion.");
      } else {
        alert("Une erreur inattendue s'est produite.");
      }
    } finally {
      setLoading(false);
    }
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
              <Button
                className="w-full text-white bg-gray-800 flex items-center justify-center gap-2"
                onClick={() => {
                  setLoading(true);
                  handleGitHubLogin();
                }}
              >
                <FaGithub color="white" /> Se connecter avec Github
              </Button>
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