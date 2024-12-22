import React from "react";
import { Button } from "@/components/ui/button";

function ConfirmDeleteModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-lg font-medium mb-4">
          Êtes-vous sûr de vouloir supprimer ce contact ?
        </h3>
        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Supprimer
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
