import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import TopBarProgress from "react-topbar-progress-indicator";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { FaGithub } from "react-icons/fa";
import axios from "axios";
import Cookies from "js-cookie";


TopBarProgress.config({
  barColors: {
    "0": "#2563eb",
    "1.0": "#1d4ed8",
  },
  shadowBlur: 5,
});


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
  const navigate = useNavigate();

  useEffect(() => {
    
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const githubId = urlParams.get("github_id");
    const email = urlParams.get("email");

    if (token && githubId && email) {
      
      localStorage.setItem("auth_token", token);
      localStorage.setItem("github_id", githubId);
      localStorage.setItem("email", email);

      
      navigate("/login");
    }
  }, [navigate]);

  const handleGitHubLogin = () => {
    
    setLoading(true);
    window.location.href = "http://localhost:8000/api/auth/github";
  };

  const validateForm = () => {
    const errors = {};
    if (!email) errors.email = "Email is required.";
    if (!password) errors.password = "Password is required.";
    if (!firstname) errors.firstname = "First name is required.";
    if (!lastname) errors.lastname = "Last name is required.";
    if (!username) errors.username = "Username is required.";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      const response = await axiosInstance.post("auth/signup", {
        firstname,
        lastname,
        username,
        email,
        password,
        password_confirmation: password,
      });
      
      
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {loading && <TopBarProgress />}
      <Card className="w-[400px] shadow-md border-none">
        <CardHeader className="text-center">
          <CardTitle>Signup</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mt-4 flex justify-center">
            <Button
              className="w-full bg-gray-800 text-white flex items-center gap-2"
              onClick={handleGitHubLogin}
            >
              <FaGithub size={20} />
              Signup with GitHub
            </Button>
          </div>
          <div className="mt-4 text-center text-sm text-gray-600">or</div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <Label>First Name</Label>
                <Input
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  className={errors.firstname ? "border-red-500" : ""}
                />
                {errors.firstname && <p className="text-red-500 text-xs">{errors.firstname}</p>}
              </div>
              <div>
                <Label>Last Name</Label>
                <Input
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  className={errors.lastname ? "border-red-500" : ""}
                />
                {errors.lastname && <p className="text-red-500 text-xs">{errors.lastname}</p>}
              </div>
            </div>
            <div className="mt-4">
              <Label>Username</Label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={errors.username ? "border-red-500" : ""}
              />
              {errors.username && <p className="text-red-500 text-xs">{errors.username}</p>}
            </div>
            <div className="mt-4">
              <Label>Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
            </div>
            <div className="mt-4">
              <Label>Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={errors.password ? "border-red-500" : ""}
              />
              {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
            </div>
            <div className="mt-6">
              <Button type="submit" className="w-full bg-blue-500 text-white">
                {loading ? "Processing..." : "Sign Up"}
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm text-gray-600">
            <p>
              Already have account?{" "}
              <a href="/login" className="text-blue-600 hover:underline">
                login
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}