import React, { useState, useEffect } from "react";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

function Recentcontacts() {
  const [contacts, setcontacts] = useState([]); // État pour stocker les données
  const [loading, setLoading] = useState(true); // État pour le chargement
  const [error, setError] = useState(null); // État pour les erreurs
  const [contactToReponse, setContactToReponse] = useState(null); // Contact à répondre

  const navigate = useNavigate(); // Hook pour la navigation

  useEffect(() => {
    // Fonction pour récupérer les contactaires
    const fetchcontacts = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/contacts/latest"
        );
        setcontacts(response.data); // Stocke les données reçues
        setLoading(false); // Désactiver le chargement
      } catch (err) {
        setError("Erreur lors du chargement des contacts.");
        setLoading(false);
      }
    };

    fetchcontacts(); // Appeler la fonction lors du montage
  }, []);

  // Afficher les détails d'un contact
  const handleReponse = async (id) => {
    setContactToReponse(id); // Stocker l'ID du contact
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/contacts/${id}`, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Détails du contact :", data);
        // Naviguer vers la page de détails du contact
        navigate("/mail", { state: { contactDetails: data } });
      } else {
        console.error("Erreur lors de l'affichage des détails du contact.");
      }
    } catch (error) {
      console.error("Erreur de connexion :", error);
    }
  };

  // Affichage de l'état de chargement
  if (loading) {
    return <p>Chargement des contacts...</p>;
  }

  // Affichage des erreurs
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="space-y-8">
      {contacts.map((contact) => (
        <div key={contact.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={contact.avatar} alt={contact.name} />
            <AvatarFallback>
              {contact.name ? contact.name.charAt(0) : "?"}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {contact.name || "Nom indisponible"}
            </p>
            <p className="text-sm text-muted-foreground">
              {contact.email || "Email indisponible"}
            </p>
          </div>
          <button
            className="ml-auto px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
            onClick={() => handleReponse(contact.id)} // Afficher les détails
          >
            Répondre
          </button>
        </div>
      ))}
    </div>
  );
}

export default Recentcontacts;
