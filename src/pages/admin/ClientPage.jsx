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

function ClientsTable() {
  const [clients, setClients] = useState([]); // Stockage des clients
  const [filterValue, setFilterValue] = useState(""); // Filtre par email
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal de suppression
  const [clientToDelete, setClientToDelete] = useState(null); // Client à supprimer
  const navigate = useNavigate(); // Hook pour la navigation

  // Récupérer les clients depuis l'API Laravel
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/clients");
        if (response.ok) {
          const data = await response.json();
          setClients(data); // Mettre à jour les clients
        } else {
          console.error("Erreur lors de la récupération des clients.");
        }
      } catch (error) {
        console.error("Erreur de connexion :", error);
      }
    };

    fetchClients();
  }, []);

  // Filtrer les clients par email
  const filteredClients = clients.filter((client) =>
    client.email.toLowerCase().includes(filterValue.toLowerCase())
  );

  return (
    <div className="w-full space-y-4">
      <h3 className="text-lg font-medium">Clients</h3>
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
              <TableHead>Prénom</TableHead>
              <TableHead>Nom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Date d'inscription</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.map((client) => (
              <TableRow key={client.id}>
                <TableCell>{client.first_name}</TableCell>
                <TableCell>{client.last_name}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.registration_date}</TableCell>
                <TableCell className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      navigate(`/clients/${client.id}`, {
                        state: { clientDetails: client },
                      })
                    } // Afficher les détails
                  >
                    <FiMoreHorizontal />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default ClientsTable;
