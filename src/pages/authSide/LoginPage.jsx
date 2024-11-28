import * as React from "react";
import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import TopBarProgress from 'react-topbar-progress-indicator';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/Label";
import { FaGithub } from "react-icons/fa";


TopBarProgress.config({
  barColors: {
    "0": "#2563eb",
    "1.0": "#1d4ed8",
  },
  shadowBlur: 5,
});


const handleGitHubLogin = () => {
  window.location.href = 'http://localhost:8000/auth/github/login';
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

  
  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    let formIsValid = true;

    if (!email) {
      setEmailError("Email is required");
      formIsValid = false;
    }

    if (!password) {
      setPasswordError("Password is required");
      formIsValid = false;
    }

    if (formIsValid) {
      console.log("Form submitted", { email, password });
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
            <CardTitle>Login</CardTitle>
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
                <FaGithub color="white" /> Login with GitHub
              </Button>
            </div>

            {/* OR text */}
            <div className="mt-4 text-center text-sm text-gray-600">or</div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4 mt-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={emailError ? "border-red-500" : ""}
                  />
                  {emailError && (
                    <p className="text-red-500 text-xs">{emailError}</p>
                  )}
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={passwordError ? "border-red-500" : ""}
                  />
                  {passwordError && (
                    <p className="text-red-500 text-xs">{passwordError}</p>
                  )}
                </div>
              </div>

              <Button className="w-full mt-4 text-white bg-black" type="submit">
                Login
              </Button>
            </form>

            {/* New user sign-up link */}
            <div className="mt-4 text-center text-sm text-gray-600">
              <p>
                New user?{" "}
                <a href="/signup" className="text-blue-600 hover:underline">
                  Sign up
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
