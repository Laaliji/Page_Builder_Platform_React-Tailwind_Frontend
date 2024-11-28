import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ImageInput from "@/components/admin/dash/inputImage";
import { useState } from "react";

const Profil = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleNewPasswordVisibility = () =>
    setShowNewPassword(!showNewPassword);

  return (
    <div className="space-y-8 px-4 md:px-8 lg:px-16 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Section Avatar et Détails Utilisateur */}
        <Card className="w-full lg:w-1/3 bg-white hover:bg-gray-100 flex-shrink-0">
          <CardHeader className="flex flex-col items-center space-y-4">
            <img
              src="/assets/images/Hnioua.jpg"
              alt="Avatar"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white shadow-lg"
            />
            <CardTitle className="text-lg sm:text-2xl font-semibold text-center">
              Hnioua Abdessamad
            </CardTitle>
            <p className="text-gray-500 text-sm sm:text-base text-center">
              abdessamadhnioua@gmail.com
            </p>
          </CardHeader>
        </Card>

        {/* Formulaire de Modification de Profil */}
        <Card className="w-full lg:w-2/3 bg-white hover:bg-gray-100">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">
              Modifier votre Profil:
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Nom d'utilisateur et Email */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full">
                  <label
                    htmlFor="username"
                    className="text-gray-600 font-medium text-sm sm:text-base"
                  >
                    Nom d'utilisateur:
                  </label>
                  <Input
                    type="text"
                    id="username"
                    placeholder="Nom d'utilisateur"
                    className="text-sm sm:text-base"
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="email"
                    className="text-gray-600 font-medium text-sm sm:text-base"
                  >
                    E-mail:
                  </label>
                  <Input
                    type="email"
                    id="email"
                    placeholder="Email"
                    className="text-sm sm:text-base"
                  />
                </div>
              </div>

              {/* Champs de mot de passe */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full relative">
                  <label
                    htmlFor="password"
                    className="text-gray-600 font-medium text-sm sm:text-base"
                  >
                    Mot de passe:
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      placeholder="Mot de passe"
                      className="text-sm sm:text-base"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                    >
                      {showPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825a10.05 10.05 0 004.126-4.1m-8.002.41a10.05 10.05 0 01-4.126-4.1M21 12a9.992 9.992 0 00-18 0m9 9c4.973 0 9-4.028 9-9 0-4.973-4.027-9-9-9-4.973 0-9 4.028-9 9 0 4.973 4.027 9 9 9z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15a3 3 0 100-6 3 3 0 000 6z"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 3l18 18M13.875 18.825a10.05 10.05 0 004.126-4.1M21 12a9.992 9.992 0 00-18 0m9 9c4.973 0 9-4.028 9-9 0-4.973-4.027-9-9-9-4.973 0-9 4.028-9 9 0 4.973 4.027 9 9 9z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <div className="w-full relative">
                  <label
                    htmlFor="new-password"
                    className="text-gray-600 font-medium text-sm sm:text-base"
                  >
                    Nouveau mot de passe:
                  </label>
                  <div className="relative">
                    <Input
                      type={showNewPassword ? "text" : "password"}
                      id="new-password"
                      placeholder="Nouveau mot de passe"
                      className="text-sm sm:text-base"
                    />
                    <button
                      type="button"
                      onClick={toggleNewPasswordVisibility}
                      className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                    >
                      {showNewPassword ? (
                        <svg /* Icon visible */>...</svg>
                      ) : (
                        <svg /* Icon hidden */>...</svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Image de profil */}
              <div>
                <label
                  htmlFor="bio"
                  className="text-gray-600 font-medium text-sm sm:text-base"
                >
                  Image Profil:
                </label>
                <ImageInput />
              </div>

              <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm sm:text-base">
                Enregistrer les modifications
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profil;
