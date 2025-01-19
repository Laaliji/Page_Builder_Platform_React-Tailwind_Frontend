import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Camera,
  KeyRound,
  Loader2,
  Mail,
  User,
  UserRoundPen,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  getUserInfo,
  isUserConnectedWithGitHub,
  updateUserProfile,
  updateUserProfilePassword,
} from "@/functions/users/CRUD";
import AccountLoading from "@/components/userdashboard/AccountLoading";
import { backend_url } from "@/constant/global";
import { dataURItoFile } from "@/functions/global";
import { useErrorToast, useSuccessToast } from "@/components/toast";
import e from "cors";

export default function Account() {
  const successToast = useSuccessToast();
  const errorToast = useErrorToast();

  // States data
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [current_password, setCurrentPassword] = useState("");

  // States Errors
  const [passwordError, setPasswordError] = useState("");
  const [currentPasswordError, setCurrentPasswordError] = useState("");
  const [passwordConfirmationError, setPasswordConfirmationError] =
    useState("");

  const [connectedWithGitHub, setConnectedWithGitHub] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);

  const ImageInputRef = useRef(null);

  const handleClick = () => {
    ImageInputRef.current.click();
  };

  const HandleChangeImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const IsUserConnectedWithGitHub = async () => {
      setConnectedWithGitHub(
        (await isUserConnectedWithGitHub({ idUser: 1 })).isConnected
      );
    };
    IsUserConnectedWithGitHub();

    const GetUserInfo = async () => {
      const userInfo = (await getUserInfo({ idUser: 1 })).data;
      setFirstname(userInfo.user.firstname);
      setLastname(userInfo.user.lastname);
      setEmail(userInfo.user.email);
      setImageUrl(backend_url + userInfo.image);
      setLoading(false);
    };
    GetUserInfo();
  }, []);

  const UpdateUserProfilePassword = async () => {
    setLoadingPassword(true);
    setPasswordError("");
    setCurrentPasswordError("");
    setPasswordConfirmationError("");
    if (password.length < 8) {
      setPasswordError("Le mot de passe doit contenir 8 caractères");
      setLoadingPassword(false);
    } else if (password != password_confirmation) {
      setPasswordConfirmationError("Les mots de passe ne correspondent pas");
      setLoadingPassword(false);
    } else {
      const response = await updateUserProfilePassword({
        id: 1,
        body: {
          current_password,
          password,
          password_confirmation,
        },
      });

      setLoadingPassword(false);

      if (response.STATE == "OK") {
        successToast("Mot de passe modifié avec succès");
      } else if (response.STATE == "INVALID_DATA") {
        setCurrentPasswordError("Mot de passe incorrect");
      } else {
        errorToast(
          "Il y a eu un problème lors de la modification du mot de passe."
        );
      }
    }
  };

  const UpdateUserProfile = async () => {
    setLoadingUpdate(true);
    const formData = new FormData();

    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("email", email);

    if (image) {
      const imageFile = dataURItoFile(image, "project_image.jpg");
      formData.append("image", imageFile);
    }

    const response = await updateUserProfile({
      id: 1,
      body: formData,
      isFormData: true,
    });

    setLoadingUpdate(false);

    console.log(response);

    if (response.STATE == "OK") {
      successToast("les informations de compte modifier avec succès");
    } else {
      errorToast("Il y a eu un problème lors de la modification du projet.");
    }
  };

  return (
    <>
      <input
        type="file"
        hidden
        ref={ImageInputRef}
        onChange={HandleChangeImage}
      />
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Compte</h3>
          <p className="text-sm text-muted-foreground">
            Gérez les paramètres et préférences de votre compte.
          </p>
        </div>
        {loading ? (
          <AccountLoading />
        ) : connectedWithGitHub ? (
          <>
            <Card className="border border-black/20 shadow-sm">
              <CardHeader>
                <CardTitle>Connexion GitHub</CardTitle>
                <CardDescription>
                  État de la connexion avec GitHub
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="currentColor"
                  >
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  <span className="text-sm font-medium">
                    Connecté avec GitHub
                  </span>
                </div>
                <Button variant="outline" size="sm" className="ml-auto">
                  Déconnecter
                </Button>
              </CardContent>
            </Card>
          </>
        ) : (
          <div className="grid gap-6 overflow-y-scroll max-h-screen hiddenScroll">
            <Card className="border border-black/20 shadow-sm">
              <CardHeader>
                <CardTitle>Photo de Profil</CardTitle>
                <CardDescription>
                  Mettez à jour votre photo de profil
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center">
                      {image_url.length > 0 ? (
                        <img
                          src={image_url}
                          alt="Photo de profil"
                          className="h-24 w-24 rounded-full object-cover"
                        />
                      ) : (
                        <User className="h-12 w-12 text-muted-foreground" />
                      )}
                    </div>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleClick()}
                      className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                    >
                      <Camera
                        className="h-4 w-4"
                        onClick={() => handleClick()}
                      />
                      <span className="sr-only">Télécharger une photo</span>
                    </Button>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium">
                      Téléchargez une nouvelle photo
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      JPG, GIF ou PNG. Taille maximale de 2 Mo.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-black/20 shadow-sm">
              <CardHeader>
                <CardTitle>Informations Personnelles</CardTitle>
                <CardDescription>
                  Mettez à jour vos informations personnelles
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium">Prénom</label>
                    <Input
                      placeholder="Prénom"
                      value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Nom</label>
                    <Input
                      placeholder="Nom"
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium">Email</label>
                  <div className="flex gap-4">
                    <Input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button type="button" variant="outline">
                      <Mail className="mr-2 h-4 w-4" />
                      Vérifier l'email
                    </Button>
                  </div>
                </div>
                <Button
                  onClick={() => UpdateUserProfile()}
                  type="submit"
                  className="text-white"
                >
                  {loadingUpdate ? (
                    <>
                      <Loader2 className="animate-spin" /> Enregistrer...
                    </>
                  ) : (
                    <>
                      <UserRoundPen className="mr-2 h-4 w-4" />
                      <span>Mettre à jour les informations</span>
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card className="border border-black/20 shadow-sm">
              <CardHeader>
                <CardTitle>Mot de Passe</CardTitle>
                <CardDescription>Changez votre mot de passe</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">
                    Mot de passe actuel
                  </label>
                  <Input
                    type="password"
                    value={current_password}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                  {currentPasswordError && (
                    <span className="text-red-500 text-sm -mt-2">
                      {currentPasswordError}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Nouveau mot de passe
                  </label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {passwordError && (
                    <span className="text-red-500 text-sm -mt-2">
                      {passwordError}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Confirmez le nouveau mot de passe
                  </label>
                  <Input
                    type="password"
                    value={password_confirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                  />
                  {passwordConfirmationError && (
                    <span className="text-red-500 text-sm -mt-2">
                      {passwordConfirmationError}
                    </span>
                  )}
                </div>
                <Button
                  onClick={() => UpdateUserProfilePassword()}
                  className="text-white"
                >
                  {loadingPassword ? (
                    <>
                      <Loader2 className="animate-spin" /> Enregistrer...
                    </>
                  ) : (
                    <>
                      <KeyRound className="mr-2 h-4 w-4" />
                      <span>Mettre à jour le mot de passe</span>
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </>
  );
}
