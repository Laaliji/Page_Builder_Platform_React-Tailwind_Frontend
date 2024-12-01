import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

function CartePhotoProfil() {
  const [imageProfil, setImageProfil] = useState("/assets/images/Hnioua.jpg");

  // Fonction pour gérer le changement de l'image
  const gererChangementImage = (event) => {
    const fichier = event.target.files[0];
    if (fichier && fichier.size <= 2 * 1024 * 1024) {
      // Vérifier la taille du fichier (2 Mo)
      const lecteur = new FileReader();
      lecteur.onload = () => {
        // Enregistrer l'image lue dans l'état pour l'afficher
        setImageProfil(lecteur.result);
      };
      lecteur.readAsDataURL(fichier); // Lire l'image comme DataURL
    } else {
      alert("Veuillez sélectionner une image de moins de 2 Mo.");
    }
  };

  return (
    <Card className="border border-black/20 shadow-sm">
      <CardHeader>
        <CardTitle>Photo de Profil</CardTitle>
        <CardDescription>Mettre à jour votre photo de profil</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center overflow-hidden">
              {/* Afficher l'image de profil ou l'avatar par défaut */}
              {imageProfil ? (
                <img
                  src={imageProfil}
                  alt="Profil"
                  className="h-full w-full object-cover"
                />
              ) : (
                <User className="h-12 w-12 text-muted-foreground" />
              )}
            </div>
            {/* Champ de fichier avec bouton */}
            <div className="absolute -bottom-2 -right-2">
              <input
                id="fichierInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={gererChangementImage}
              />
              <Button
                size="icon"
                variant="outline"
                className="h-8 w-8 rounded-full"
                asChild
              >
                <label htmlFor="fichierInput">
                  <Camera className="h-4 w-4" />
                  <span className="sr-only">Télécharger la photo</span>
                </label>
              </Button>
            </div>
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-medium">
              Télécharger une nouvelle photo
            </h4>
            <p className="text-sm text-muted-foreground">
              JPG, GIF ou PNG. Max 2 Mo.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CartePhotoProfil;
