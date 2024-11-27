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
  console.log("GitHub signup clicked");
};

export function SignupPage() {
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

  const logo = "../../../public/assets/images/logo.png";

  const handleSubmit = (e) => {
    e.preventDefault();

    // Clear previous error messages
    setFirstnameError("");
    setLastnameError("");
    setUsernameError("");
    setEmailError("");
    setPasswordError("");

    let formIsValid = true;

    // Validation
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
      // Handle successful form submission here
      console.log("Form submitted", { firstname, lastname, username, email, password });
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
            <CardTitle>Signup</CardTitle>
          </CardHeader>
          <CardContent>
            {/* GitHub signup button */}
            <div className="mt-4 flex justify-center">
              <Button
                className="w-full text-white bg-gray-800 flex items-center justify-center gap-2"
                onClick={handleGitHubLogin}
              >
                <FaGithub color="white" /> {/* GitHub Icon with white color */}
                Signup with GitHub
              </Button>
            </div>
            {/* OR text */}
            <div className="mt-4 text-center text-sm text-gray-600">
              OR
            </div>
            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4 w-full items-center mt-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="firstname">First Name</Label>
                  <Input
                    id="firstname"
                    type="text"
                    placeholder="Entrez votre Prénom"
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
                    placeholder="Entrez votre Nom"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    className={lastnameError ? "border-red-500" : ""}
                  />
                  {lastnameError && <p className="text-red-500 text-xs">{lastnameError}</p>}
                </div>
              </div>
              <div className="flex flex-col space-y-1.5 mt-4">
                <Label htmlFor="username">User Name</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Entrez votre Nom d'utilisateur"
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
              <Button className="w-full mt-4 text-white bg-black" type="submit">
                Signup
              </Button>
            </form>
            {/* Existing user login link */}
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
