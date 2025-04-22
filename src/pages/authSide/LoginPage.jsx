import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import TopBarProgress from 'react-topbar-progress-indicator';
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { FaGithub } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import AuthHandler from "../../components/auth/AuthHandler";

TopBarProgress.config({
  barColors: {
    "0": "#2563eb",
    "1.0": "#1d4ed8",
  },
  shadowBlur: 5,
});

export function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const logo = "/assets/images/logo.png";
  const { login, githubLogin } = useAuth();

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
      await login(email, password);
      navigate('/stepper');
    } catch (error) {
      if (error.errors) {
        if (error.errors.email) setEmailError(error.errors.email[0]);
        if (error.errors.password) setPasswordError(error.errors.password[0]);
      } else {
        alert(error.message || "Login a échoué");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGitHubLogin = () => {
    setLoading(true);
    githubLogin();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* AuthHandler component to process GitHub auth from URL parameters */}
      <AuthHandler />
      
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
                onClick={handleGitHubLogin}
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