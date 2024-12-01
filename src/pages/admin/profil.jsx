import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Camera, KeyRound, Mail, User, Eye, EyeOff } from "lucide-react"; // Import Eye and EyeOff icons
import ImageProfil from "@/components/admin/dash/ImageProfil";

export default function Profil() {
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [passwordStrength, setPasswordStrength] = useState("");

  const handlePasswordChange = (value, field) => {
    if (field === "newPassword") {
      let strength = "";

      if (value.length < 4) {
        strength = "Faible"; // Trop court
      } else if (value.length >= 4 && value.length < 8) {
        strength = "Moyen"; // Longueur correcte mais manque de complexité
      } else {
        if (
          /[A-Z]/.test(value) && // Contient une majuscule
          /[a-z]/.test(value) && // Contient une minuscule
          /[0-9]/.test(value) && // Contient un chiffre
          /[^A-Za-z0-9]/.test(value) // Contient un caractère spécial
        ) {
          strength = "Fort"; // Complexe et assez long
        } else {
          strength = "Moyen"; // Long mais manque de diversité
        }
      }

      setPasswordStrength(strength);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const handleEmailVerification = () => {
    alert("Vérification de l'email en cours...");
  };

  return (
    <>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Compte Administrateur</h3>
          <p className="text-sm text-muted-foreground">
            Gérez les paramètres et préférences de votre compte administrateur.
          </p>
        </div>

        <div className="grid gap-6 overflow-y-scroll max-h-screen hiddenScroll">
          {/* Photo de Profil */}
          <ImageProfil />
          <Card className="border border-black/20 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">
                Informations Personnelles
              </CardTitle>
              <CardDescription className="text-sm md:text-base">
                Mettez à jour vos informations personnelles
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Prénom:
                  </label>
                  <Input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="John"
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Nom:</label>
                  <Input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Dupont"
                    className="w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email:</label>
                <div className="flex flex-col md:flex-row gap-4">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jean.dupont@exemple.com"
                    className="w-full md:flex-grow"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleEmailVerification}
                    className="w-full md:w-auto mt-2 md:mt-0"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Vérifier l'email
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mot de Passe */}
          <Card className="border border-black/20 shadow-sm">
            <CardHeader>
              <CardTitle>Mot de Passe</CardTitle>
              <CardDescription>Changez votre mot de passe</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <label className="block text-sm font-medium">
                  Mot de passe actuel:
                </label>
                <Input
                  type={showPassword.currentPassword ? "text" : "password"}
                  className="pr-10"
                />
                {/* <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => togglePasswordVisibility("currentPassword")}
                >
                  {showPassword.currentPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </span> */}
              </div>

              {/* Nouveau mot de passe */}
              <div className="relative">
                <label className="block text-sm font-medium">
                  Nouveau mot de passe:
                </label>
                <Input
                  className="pr-10"
                  type={showPassword.newPassword ? "text" : "password"}
                  onChange={(e) =>
                    handlePasswordChange(e.target.value, "newPassword")
                  }
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$"
                  title="Le mot de passe doit contenir au moins 8 caractères, avec une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial."
                  required
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => togglePasswordVisibility("newPassword")}
                >
                  {showPassword.newPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </span>
                <div className="password-strength-bar mt-2">
                  <div
                    className={`password-strength-bar-inner ${
                      passwordStrength === "Faible"
                        ? "bg-red-500 w-1/4"
                        : passwordStrength === "Moyen"
                        ? "bg-orange-500 w-2/4"
                        : passwordStrength === "Fort"
                        ? "bg-green-500 w-full"
                        : "" // Valeur par défaut si vide
                    }`}
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium">
                  Confirmez le nouveau mot de passe:
                </label>
                <Input
                  type={showPassword.confirmPassword ? "text" : "password"}
                  className="pr-10"
                />
                {/* <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                >
                  {showPassword.confirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </span> */}
              </div>

              <Button type="submit" className="text-white">
                <KeyRound className="mr-2 h-4 w-4" />
                Mettre à jour le mot de passe
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
