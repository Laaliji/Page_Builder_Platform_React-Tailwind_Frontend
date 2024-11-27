import * as React from "react";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/Label";
import { FaGithub } from "react-icons/fa";

const handleGitHubLogin = () => {
  console.log("GitHub login clicked");
};

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const logo = "../../../public/assets/images/logo.png";

  const handleSubmit = (e) => {
    e.preventDefault();

    // Clear previous error messages
    setEmailError("");
    setPasswordError("");

    let formIsValid = true;

    // Email validation
    if (!email) {
      setEmailError("Email is required");
      formIsValid = false;
    }

    // Password validation
    if (!password) {
      setPasswordError("Password is required");
      formIsValid = false;
    }

    if (formIsValid) {
      // Handle successful form submission here
      console.log("Form submitted", { email, password });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
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
                onClick={handleGitHubLogin}
              >
                <FaGithub color="white" /> {/* GitHub Icon with white color */}
                Login with GitHub
              </Button>
            </div>
            {/* OR text */}
            <div className="mt-4 text-center text-sm text-gray-600">
              OR
            </div>
            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4 mt-4">
                <div className="flex flex-col space-y-1.5">
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
                <div className="flex flex-col space-y-1.5">
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
              </div>
              <Button className="w-full mt-4 text-white bg-black " type="submit">
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
