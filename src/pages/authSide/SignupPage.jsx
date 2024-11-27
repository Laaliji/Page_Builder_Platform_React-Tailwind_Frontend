import * as React from "react";
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
  const logo = "../../../public/assets/images/logo.png";

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
            {/* GitHub login button */}
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
            <form>
              <div className="grid grid-cols-2 gap-4 w-full items-center mt-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="FirstName">First Name</Label>
                  <Input id="firstname" type="text" placeholder="Entrez votre Prénom" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="LastName">Last Name</Label>
                  <Input id="lastname" type="text" placeholder="Entrez votre Nom" />
                </div>
              </div>
              <div className="flex flex-col space-y-1.5 mt-4">
                <Label htmlFor="UserName">User Name</Label>
                <Input id="username" type="text" placeholder="Entrez votre Nom d'utilisateur" />
              </div>
              <div className="flex flex-col space-y-1.5 mt-4">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Entrez votre email" />
              </div>
              <div className="flex flex-col space-y-1.5 mt-4">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Entrez votre mot de passe"
                />
              </div>
              <Button className="w-full mt-4 text-white bg-black" type="submit">
                Signup
              </Button>
            </form>
            {/* New user sign-up link */}
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
