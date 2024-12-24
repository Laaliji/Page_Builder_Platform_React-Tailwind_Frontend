import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FiTrash, FiMoreHorizontal } from "react-icons/fi";
import ConfirmDeleteModal from "@/components/admin/dash/ConfirmDeleteModal";

function CommentsTable() {
  const [contacts, setContacts] = useState([]); // Stockage des contacts
  const [filterValue, setFilterValue] = useState(""); // Filtre par email
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal de suppression
  const [contactToDelete, setContactToDelete] = useState(null); // Contact à supprimer
  const [contactToReponse, setContactToReponse] = useState(null); // Contact à répondre

  const navigate = useNavigate(); // Hook pour la navigation

  // Récupérer les contacts depuis l'API Laravel
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/contacts");
        if (response.ok) {
          const data = await response.json();
          setContacts(data); // Mettre à jour les contacts
        } else {
          console.error("Erreur lors de la récupération des contacts.");
        }
      } catch (error) {
        console.error("Erreur de connexion :", error);
      }
    };

    fetchContacts();
  }, []);

  // Filtrer les contacts par email
  const filteredContacts = contacts.filter((contact) =>
    contact.email.toLowerCase().includes(filterValue.toLowerCase())
  );

  // Ouvrir la modal de confirmation de suppression
  const handleOpenModal = (id) => {
    setContactToDelete(id);
    setIsModalOpen(true);
  };

  // Supprimer un contact
  const handleDelete = async () => {
    if (contactToDelete) {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/contacts/${contactToDelete}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          setContacts((prevContacts) =>
            prevContacts.filter((contact) => contact.id !== contactToDelete)
          );
          setIsModalOpen(false); // Fermer la modal après suppression
        } else {
          console.error("Erreur lors de la suppression du contact.");
        }
      } catch (error) {
        console.error("Erreur de connexion :", error);
      }
    }
  };

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

  // Fermer la modal sans supprimer
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setContactToDelete(null);
  };

  return (
    <div className="w-full space-y-4">
      <h3 className="text-lg font-medium">Contacts</h3>
      <div className="flex items-center justify-between">
        <Input
          placeholder="Filtrer par email..."
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          className="max-w-sm border border-black/20"
        />
      </div>

      <div className="border border-black/20 bg-white rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom d'utilisateur</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date Reçue</TableHead>
              <TableHead>Date Réponse</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContacts.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell>{contact.name}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.status}</TableCell>
                <TableCell>{contact.contact_date}</TableCell>
                <TableCell>{contact.response_date || "Non répondu"}</TableCell>
                <TableCell className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleOpenModal(contact.id)} // Ouvrir la modal de suppression
                  >
                    <FiTrash />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleReponse(contact.id)} // Afficher les détails
                  >
                    <FiMoreHorizontal />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Confirmation modal */}
      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleDelete}
      />
    </div>
  );
}

export default CommentsTable;
