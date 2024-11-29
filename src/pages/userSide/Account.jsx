import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Camera, KeyRound, Mail, User } from "lucide-react";

export default function Account() {
  return (
    <>
      <form className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Compte</h3>
          <p className="text-sm text-muted-foreground">
            Gérez les paramètres et préférences de votre compte.
          </p>
        </div>

        <div className="grid gap-6 overflow-y-scroll max-h-screen hiddenScroll">
          <Card className="border border-black/20 shadow-sm">
            <CardHeader>
              <CardTitle>Photo de Profil</CardTitle>
              <CardDescription>Mettez à jour votre photo de profil</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center">
                    <User className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <Button
                    size="icon"
                    variant="outline"
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                  >
                    <Camera className="h-4 w-4" />
                    <span className="sr-only">Télécharger une photo</span>
                  </Button>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">Téléchargez une nouvelle photo</h4>
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
              <CardDescription>Mettez à jour vos informations personnelles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Prénom</label>
                  <Input placeholder="Jean" />
                </div>
                <div>
                  <label className="block text-sm font-medium">Nom</label>
                  <Input placeholder="Dupont" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <div className="flex gap-4">
                  <Input type="email" placeholder="jean.dupont@exemple.com" />
                  <Button type="button" variant="outline">
                    <Mail className="mr-2 h-4 w-4" />
                    Vérifier l'email
                  </Button>
                </div>
              </div>
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
                <Input type="password" />
              </div>
              <div>
                <label className="block text-sm font-medium">Nouveau mot de passe</label>
                <Input type="password" />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Confirmez le nouveau mot de passe
                </label>
                <Input type="password" />
              </div>
              <Button type="submit" className="text-white">
                <KeyRound className="mr-2 h-4 w-4" />
                Mettre à jour le mot de passe
              </Button>
            </CardContent>
          </Card>
        </div>
      </form>
    </>
  );
}
