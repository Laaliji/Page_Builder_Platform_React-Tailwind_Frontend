"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function MethodePaiementCartes() {
  const [formData, setFormData] = useState({
    nom: "",
    numero: "",
    mois: "",
    annee: "",
    cvc: "",
  });
  const [message, setMessage] = useState(null);

  // Gestion des changements dans les champs du formulaire
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Validation de base des champs
  const isFormValid = () => {
    const { nom, numero, mois, annee, cvc } = formData;

    if (!nom || !numero || !mois || !annee || !cvc) {
      setMessage({
        type: "error",
        text: "Tous les champs sont obligatoires !",
      });
      return false;
    }

    if (!/^\d{16}$/.test(numero)) {
      setMessage({
        type: "error",
        text: "Le numéro de carte doit contenir 16 chiffres.",
      });
      return false;
    }

    if (!/^\d{3,4}$/.test(cvc)) {
      setMessage({
        type: "error",
        text: "Le CVC doit contenir 3 ou 4 chiffres.",
      });
      return false;
    }

    return true;
  };

  // Soumission du formulaire
  const handleSubmit = async () => {
    if (!isFormValid()) return;

    const { nom, numero, mois, annee, cvc } = formData;

    try {
      const response = await fetch("http://localhost:8000/api/stripe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stripeToken: "tok_test", // Remplacez par un vrai token généré si nécessaire
          nom,
          numero,
          exp_month: mois,
          exp_year: annee,
          cvc,
        }),
      });

      if (response.ok) {
        setMessage({ type: "success", text: "Paiement réussi !" });
        setFormData({ nom: "", numero: "", mois: "", annee: "", cvc: "" });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Échec du paiement !");
      }
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    }
  };

  return (
    <section className="py-4 bg-white">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-wrap bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="w-full md:w-1/2 flex items-center justify-center p-6 bg-gray-100">
            <img
              src="/assets/images/payment.png"
              alt="Paiement"
              className="w-full h-full"
            />
          </div>
          <div className="w-full md:w-1/2 p-8">
            <Card className="border-0">
              <CardHeader>
                <h2 className="text-xl font-bold">Informations de Paiement</h2>
              </CardHeader>
              <CardContent className="grid gap-6">
                {message && (
                  <p
                    className={`text-center ${
                      message.type === "success"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {message.text}
                  </p>
                )}
                <div className="grid gap-2">
                  <Label htmlFor="nom">Nom</Label>
                  <Input
                    id="nom"
                    placeholder="Prénom Nom"
                    value={formData.nom}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="numero">Numéro de carte</Label>
                  <Input
                    id="numero"
                    placeholder="1234 5678 9012 3456"
                    value={formData.numero}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="mois">Mois</Label>
                    <Select
                      onValueChange={(value) =>
                        setFormData({ ...formData, mois: value })
                      }
                      value={formData.mois}
                    >
                      <SelectTrigger id="mois">
                        <SelectValue placeholder="Mois" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => (
                          <SelectItem key={i} value={`${i + 1}`}>
                            {`0${i + 1}`.slice(-2)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="annee">Année</Label>
                    <Select
                      onValueChange={(value) =>
                        setFormData({ ...formData, annee: value })
                      }
                      value={formData.annee}
                    >
                      <SelectTrigger id="annee">
                        <SelectValue placeholder="Année" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 10 }, (_, i) => (
                          <SelectItem
                            key={i}
                            value={`${new Date().getFullYear() + i}`}
                          >
                            {new Date().getFullYear() + i}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input
                      id="cvc"
                      placeholder="CVC"
                      value={formData.cvc}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleSubmit}>
                  Continuer
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
