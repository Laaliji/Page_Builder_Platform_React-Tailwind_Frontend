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
  updateUserProfile,
  updateUserProfilePassword,
} from "@/functions/users/CRUD";
import { 
  isUserConnectedWithGitHub,
  redirectToGitHub,
  unlinkGitHubAccount,
  getGitHubStatus 
} from "@/functions/users/githubAuth";
import AccountLoading from "@/components/userdashboard/AccountLoading";
import { backend_url } from "@/constant/global";
import { dataURItoFile } from "@/functions/global";
import { useErrorToast, useSuccessToast } from "@/components/toast";
import translations from "@/locale/translations";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedLang } from "@/store/valueSlicer";
import { FaGithub } from "react-icons/fa";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle 
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast.jsx";
import { GitHubButton } from "@/components/ui/github-button";

export default function Account() {
  const successToast = useSuccessToast();
  const errorToast = useErrorToast();
  const { toast } = useToast();

  const { selectedLang } = useSelector(
    (state) => state.values
  );

  const dispatch = useDispatch();

  // States data
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [current_password, setCurrentPassword] = useState("");
  const [lang, setLang] = useState(localStorage.getItem("lang") || "en");
  // States Errors
  const [passwordError, setPasswordError] = useState("");
  const [currentPasswordError, setCurrentPasswordError] = useState("");
  const [passwordConfirmationError, setPasswordConfirmationError] =
    useState("");

  // GitHub states
  const [connectedWithGitHub, setConnectedWithGitHub] = useState(false);
  const [githubUsername, setGithubUsername] = useState("");
  const [isLoadingGitHub, setIsLoadingGitHub] = useState(false);
  const [showUnlinkDialog, setShowUnlinkDialog] = useState(false);
  
  // Loading states
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

  // Fetch GitHub connection status and user data
  const fetchGitHubStatus = async (userId) => {
    try {
      // Check if connected with GitHub
      const connectionStatus = await isUserConnectedWithGitHub({ idUser: userId });
      setConnectedWithGitHub(connectionStatus.isConnected);
      
      // If connected, get GitHub details
      if (connectionStatus.isConnected) {
        const githubDetails = await getGitHubStatus(userId);
        if (githubDetails.username) {
          setGithubUsername(githubDetails.username);
        }
      }
    } catch (error) {
      console.error("Error fetching GitHub status:", error);
    }
  };

  useEffect(() => {
    const userId = 1; // Replace with actual user ID from auth
    
    // Fetch GitHub connection status
    fetchGitHubStatus(userId);

    const GetUserInfo = async () => {
      const userInfo = (await getUserInfo({ idUser: userId })).data;
      setFirstname(userInfo.user.firstname);
      setLastname(userInfo.user.lastname);
      setEmail(userInfo.user.email);
      setImageUrl(backend_url + userInfo.image);
      setLoading(false);
    };
    GetUserInfo();
  }, []);

  // Handle GitHub account linking
  const handleLinkGitHub = () => {
    setIsLoadingGitHub(true);
    redirectToGitHub(true); // true because we're linking, not authenticating
  };

  // Handle GitHub account unlinking
  const handleUnlinkGitHub = async () => {
    try {
      setIsLoadingGitHub(true);
      const response = await unlinkGitHubAccount(1); // Replace with actual user ID
      
      if (response.success) {
        setConnectedWithGitHub(false);
        setGithubUsername("");
        successToast("Votre compte GitHub a été dissocié avec succès");
      } else {
        errorToast(response.message || "Échec de la dissociation du compte GitHub");
      }
    } catch (error) {
      errorToast("Une erreur s'est produite lors de la dissociation de votre compte GitHub");
      console.error("Unlink GitHub error:", error);
    } finally {
      setIsLoadingGitHub(false);
      setShowUnlinkDialog(false);
    }
  };

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

    if (response.STATE == "OK") {
      successToast("les informations de compte modifier avec succès");
    } else {
      errorToast("Il y a eu un problème lors de la modification du projet.");
    }
  };

  const HandleChangeLang = (langue) => {
    setLang(langue);
    localStorage.setItem("lang", langue);
    dispatch(setSelectedLang(langue));
  }

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
          <h3 className="text-lg font-medium">{translations[lang].account}</h3>
          <p className="text-sm text-muted-foreground">
            {translations[lang].manage_account_settings_and_preferences}
          </p>
        </div>
        {loading ? (
          <AccountLoading />
        ) : (
          <>
            {/* GitHub Connection Card */}
            <Card className="border border-black/20 shadow-sm">
              <CardHeader>
                <CardTitle>{translations[lang].github_connection}</CardTitle>
                <CardDescription>
                  {translations[lang].status_of_connection_with_github}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <FaGithub size={24} className="text-black/70" />
                  <div>
                    {connectedWithGitHub ? (
                      <div className="flex flex-col">
                        <span className="font-medium text-green-600">
                          {translations[lang].connected_with_github}
                        </span>
                        {githubUsername && (
                          <span className="text-sm text-gray-600">
                            @{githubUsername}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="font-medium text-gray-600">
                        Non connecté avec GitHub
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex-1"></div>
                {connectedWithGitHub ? (
                  <Button 
                    variant="destructive" 
                    onClick={() => setShowUnlinkDialog(true)}
                    disabled={isLoadingGitHub}
                    className="ml-auto"
                  >
                    {isLoadingGitHub ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    {translations[lang].disconnect}
                  </Button>
                ) : (
                  <GitHubButton 
                    onClick={handleLinkGitHub}
                    loading={isLoadingGitHub}
                    variant="link"
                    className="ml-auto"
                  >
                    Connecter avec GitHub
                  </GitHubButton>
                )}
              </CardContent>
            </Card>

            {/* Profile Picture Card */}
            <Card className="border border-black/20 shadow-sm">
              <CardHeader>
                <CardTitle>{translations[lang].profile_picture}</CardTitle>
                <CardDescription>
                  {translations[lang].update_your_profile_picture}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center gap-8">
                <div className="w-20 h-20 rounded-full overflow-hidden">
                  <img src={image_url} className="w-full h-full" />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-lg">
                    {translations[lang].update_your_profile_picture}
                  </span>
                  <div className="flex flex-col gap-2">
                    <Button
                      className="bg-black text-white w-fit"
                      onClick={handleClick}
                    >
                      <Camera className="mr-2 h-4 w-4" />
                      {translations[lang].upload_a_new_photo}
                    </Button>
                    <span className="text-xs text-black/50">
                      {translations[lang].jpg_gif_or_png_max_size_2mb}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Personal Information Card */}
            <Card className="border border-black/20 shadow-sm">
              <CardHeader>
                <CardTitle>{translations[lang].personal_information}</CardTitle>
                <CardDescription>
                  {translations[lang].update_your_personal_information}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <span className="text-base font-medium">
                      {translations[lang].first_name}
                    </span>
                    <Input
                      value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-base font-medium">
                      {translations[lang].last_name}
                    </span>
                    <Input
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-base font-medium">
                    {translations[lang].email}
                  </span>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <Button
                  onClick={UpdateUserProfile}
                  disabled={loadingUpdate}
                  className="bg-black text-white mt-4"
                >
                  {loadingUpdate ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <UserRoundPen className="mr-2 h-4 w-4" />
                  )}
                  {translations[lang].update_information}
                </Button>
              </CardContent>
            </Card>

            {/* Password Card */}
            <Card className="border border-black/20 shadow-sm">
              <CardHeader>
                <CardTitle>{translations[lang].password}</CardTitle>
                <CardDescription>
                  {translations[lang].change_your_password}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex flex-col gap-2">
                  <span className="text-base font-medium">
                    {translations[lang].current_password}
                  </span>
                  <Input
                    value={current_password}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className={currentPasswordError && "border-red-500"}
                    type="password"
                  />
                  {currentPasswordError && (
                    <span className="text-xs text-red-500">
                      {currentPasswordError}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-base font-medium">
                    {translations[lang].new_password}
                  </span>
                  <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={passwordError && "border-red-500"}
                    type="password"
                  />
                  {passwordError && (
                    <span className="text-xs text-red-500">{passwordError}</span>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-base font-medium">
                    {translations[lang].confirm_new_password}
                  </span>
                  <Input
                    value={password_confirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    className={passwordConfirmationError && "border-red-500"}
                    type="password"
                  />
                  {passwordConfirmationError && (
                    <span className="text-xs text-red-500">
                      {passwordConfirmationError}
                    </span>
                  )}
                </div>
                <Button
                  className="bg-black text-white mt-4"
                  onClick={UpdateUserProfilePassword}
                  disabled={loadingPassword}
                >
                  {loadingPassword ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <KeyRound className="mr-2 h-4 w-4" />
                  )}
                  {translations[lang].update_password}
                </Button>
              </CardContent>
            </Card>

            {/* Language Card */}
            <Card className="border border-black/20 shadow-sm">
              <CardHeader>
                <CardTitle>{translations[lang].language}</CardTitle>
                <CardDescription>
                  {translations[lang].choose_the_interface_language}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <Button
                      className={`bg-blue-900 text-white ${
                        lang === "fr" && "bg-blue-600"
                      }`}
                      onClick={() => HandleChangeLang("fr")}
                    >
                      {translations[lang].french}
                    </Button>
                    <Button
                      className={`bg-blue-900 text-white ${
                        lang === "en" && "bg-blue-600"
                      }`}
                      onClick={() => HandleChangeLang("en")}
                    >
                      {translations[lang].english}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Unlink GitHub confirmation dialog */}
            <AlertDialog open={showUnlinkDialog} onOpenChange={setShowUnlinkDialog}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Dissocier votre compte GitHub?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Êtes-vous sûr de vouloir dissocier votre compte GitHub? 
                    {!connectedWithGitHub && (
                      <p className="text-red-500 mt-2">
                        Attention: Ceci est votre seule méthode de connexion. Si vous la supprimez,
                        vous devrez définir un mot de passe pour pouvoir vous connecter.
                      </p>
                    )}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleUnlinkGitHub}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    {isLoadingGitHub ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    Dissocier
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        )}
      </div>
    </>
  );
}
