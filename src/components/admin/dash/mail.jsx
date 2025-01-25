import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const InterfaceEmail = ({ data }) => {
  const [reponse, setReponse] = useState("");
  const [envoiEnCours, setEnvoiEnCours] = useState(false);
  const [messageAlert, setMessageAlert] = useState(null);
  const [typeAlert, setTypeAlert] = useState(""); // "success" ou "error"

  const gererEnvoiReponse = async () => {
    if (!reponse.trim()) {
      setMessageAlert("Veuillez saisir une réponse avant d'envoyer.");
      setTypeAlert("error");
      return;
    }

    setEnvoiEnCours(true);

    try {
      const responseData = {
        email: data.email,
        subject: data.subject || "Réponse à votre message",
        message: reponse,
      };

      console.log("Données de réponse:", JSON.stringify(responseData, null, 2));

      const reponseApi = await fetch("http://127.0.0.1:8000/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(responseData),
      });

      if (!reponseApi.ok) {
        const text = await reponseApi.text();
        throw new Error(
          text.includes("<!doctype") ? "Problème avec le serveur." : text
        );
      }

      const resultat = await reponseApi.json();
      console.log("Réponse serveur:", resultat);

      setMessageAlert("Email envoyé avec succès !");
      setTypeAlert("success");
      setReponse("");

      await fetch(`http://127.0.0.1:8000/api/contacts/${data.id}/respond`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          response: reponse,
        }),
      });
    } catch (erreur) {
      console.error("Erreur:", erreur);
      setMessageAlert(
        "Une erreur est survenue lors de l'envoi de l'email. Vérifiez le serveur."
      );
      setTypeAlert("error");
    } finally {
      setEnvoiEnCours(false);
      setTimeout(() => {
        setMessageAlert(null);
        setTypeAlert("");
      }, 5000);
    }
  };

  if (!data) {
    return <p>Chargement des détails...</p>;
  }

  return (
    <Card className="w-full mx-auto">
      <CardContent className="p-4 sm:p-6 md:p-8">
        {messageAlert && (
          <Alert
            className={`mb-4 ${
              typeAlert === "success" ? "bg-green-50" : "bg-red-50"
            }`}
          >
            <AlertDescription>{messageAlert}</AlertDescription>
          </Alert>
        )}

        <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4 mb-6">
          <Avatar className="h-12 w-12">
            <AvatarImage src={data.avatar} alt={data.name} />
            <AvatarFallback>
              {data.name ? data.name.substring(0, 2).toUpperCase() : "?"}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex flex-col md:flex-row justify-between items-start">
              <div>
                <h2 className="font-semibold text-lg">{data.name}</h2>
                <p className="text-sm text-gray-500">
                  {data.subject || "Pas de sujet"}
                </p>
                <p className="text-sm text-gray-500">
                  Répondre à : {data.email}
                </p>
              </div>
              <span className="text-sm text-gray-500 md:text-right">
                {data.data_date}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <p className="bg-gray-50 p-4 rounded-lg">
            {data.message || "Aucun message fourni."}
          </p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <Textarea
              placeholder={`Répondre à ${data.name}...`}
              className="min-h-[100px] p-4"
              value={reponse}
              onChange={(e) => setReponse(e.target.value)}
            />
            <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
              <Button
                variant="ghost"
                className="text-gray-500"
                onClick={() => setReponse("")}
              >
                Effacer
              </Button>
              <Button
                className="bg-black text-white hover:bg-gray-800"
                onClick={gererEnvoiReponse}
                disabled={envoiEnCours}
              >
                {envoiEnCours ? (
                  "Envoi en cours..."
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Envoyer
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InterfaceEmail;
