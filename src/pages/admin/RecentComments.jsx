import { useState, useEffect } from "react";
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
import ConfirmDeleteModal from "@/components/admin/dash/ConfirmDeleteModal"; // Import the modal component

function CommentsTable() {
  const [contacts, setContacts] = useState([]); // Stockage des contacts
  const [filterValue, setFilterValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null); // Store contact to delete

  // Récupérer les contacts depuis l'API Laravel
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/contacts");
        const data = await response.json();
        setContacts(data); // Mettre à jour les contacts avec les données récupérées
      } catch (error) {
        console.error("Erreur lors de la récupération des contacts:", error);
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

  // Fonction pour supprimer un contact
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
          setIsModalOpen(false); // Close the modal after deletion
        } else {
          console.error("Erreur lors de la suppression du contact.");
        }
      } catch (error) {
        console.error("Erreur de connexion:", error);
      }
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
                    onClick={() => handleOpenModal(contact.id)} // Open the modal on delete click
                  >
                    <FiTrash />
                  </Button>
                  <Button size="sm" variant="outline">
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
