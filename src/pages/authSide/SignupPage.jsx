import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import TopBarProgress from "react-topbar-progress-indicator";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { FaGithub } from "react-icons/fa";


TopBarProgress.config({
  barColors: {
    "0": "#2563eb",
    "1.0": "#1d4ed8",
  },
  shadowBlur: 5,
});

export function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstnameError, setFirstnameError] = useState("");
  const [lastnameError, setLastnameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const githubId = urlParams.get("github_id");
    const email = urlParams.get("email");
    const firstname = urlParams.get("firstname");
    const lastname = urlParams.get("lastname");
    const username = urlParams.get("username");

    if (token && githubId && email) {
      localStorage.setItem("authToken", token);
      localStorage.setItem("githubId", githubId);
      localStorage.setItem("email", email);

      if (firstname) setFirstname(firstname);
      if (lastname) setLastname(lastname);
      if (username) setUsername(username);
      if (email) setEmail(email);
    }
  }, []);

  const handleGitHubLogin = () => {
    setLoading(true);
    window.location.href = "http://localhost:8000/auth/github/login";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    setFirstnameError("");
    setLastnameError("");
    setUsernameError("");
    setEmailError("");
    setPasswordError("");

    let formIsValid = true;

    
    if (!firstname) {
      setFirstnameError("First name is required");
      formIsValid = false;
    }
    if (!lastname) {
      setLastnameError("Last name is required");
      formIsValid = false;
    }
    if (!username) {
      setUsernameError("Username is required");
      formIsValid = false;
    }
    if (!email) {
      setEmailError("Email is required");
      formIsValid = false;
    }
    if (!password) {
      setPasswordError("Password is required");
      formIsValid = false;
    }

    if (formIsValid) {
      console.log("Form submitted", { firstname, lastname, username, email, password });

      
      setTimeout(() => {
        navigate("/login"); 
      }, 500);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {loading && <TopBarProgress />}
      <div className="flex flex-col items-center justify-center w-full">
        <a href="#">
          <img alt="logo" className="h-9 w-auto sm:h-9" src="/assets/images/logo.png" />
        </a>

        <Card className="w-[400px] shadow-md border-none mt-6">
          <CardHeader className="text-center">
            <CardTitle>Signup</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mt-4 flex justify-center">
              <Button
                className="w-full text-white bg-gray-800 flex items-center justify-center gap-2"
                onClick={handleGitHubLogin}
              >
                <FaGithub color="white" />
                Signup with GitHub
              </Button>
            </div>
            <div className="mt-4 text-center text-sm text-gray-600">or</div>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4 w-full items-center mt-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="firstname">First Name</Label>
                  <Input
                    id="firstname"
                    type="text"
                    placeholder="Enter your first name"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    className={firstnameError ? "border-red-500" : ""}
                  />
                  {firstnameError && <p className="text-red-500 text-xs">{firstnameError}</p>}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="lastname">Last Name</Label>
                  <Input
                    id="lastname"
                    type="text"
                    placeholder="Enter your last name"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    className={lastnameError ? "border-red-500" : ""}
                  />
                  {lastnameError && <p className="text-red-500 text-xs">{lastnameError}</p>}
                </div>
              </div>
              <div className="flex flex-col space-y-1.5 mt-4">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={usernameError ? "border-red-500" : ""}
                />
                {usernameError && <p className="text-red-500 text-xs">{usernameError}</p>}
              </div>
              <div className="flex flex-col space-y-1.5 mt-4">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={emailError ? "border-red-500" : ""}
                />
                {emailError && <p className="text-red-500 text-xs">{emailError}</p>}
              </div>
              <div className="flex flex-col space-y-1.5 mt-4">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={passwordError ? "border-red-500" : ""}
                />
                {passwordError && <p className="text-red-500 text-xs">{passwordError}</p>}
              </div>
              <Button className="w-full mt-4 text-white bg-black" type="submit">
                Signup
              </Button>
            </form>
            <div className="mt-4 text-center text-sm text-gray-600">
              <p>
                Already have an account?{" "}
                <a href="/login" className="text-blue-600 hover:underline">
                  Login
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
