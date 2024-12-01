import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { FiTrash, FiMoreHorizontal } from "react-icons/fi";

function CommentsTable() {
  const initialComments = [
    {
      id: 1,
      user: "Olivia Martin",
      email: "olivia.martin@email.com",
      avatar: "/avatars/01.png",
      status: "Pas encore",
      dateReceived: "2024-12-01",
      dateReply: null,
    },
    {
      id: 2,
      user: "Jackson Lee",
      email: "jackson.lee@email.com",
      avatar: "/avatars/02.png",
      status: "Répondu",
      dateReceived: "2024-11-28",
      dateReply: "2024-11-29",
    },
  ];

  const [comments, setComments] = useState(initialComments);
  const [filterValue, setFilterValue] = useState("");
  const [visibleColumns, setVisibleColumns] = useState({
    user: true,
    email: true,
    dateReceived: true,
    dateReply: true,
    status: true,
  });

  const handleDelete = (id) => {
    setComments((prev) => prev.filter((comment) => comment.id !== id));
  };

  const filteredComments = comments.filter((comment) =>
    comment.email.toLowerCase().includes(filterValue.toLowerCase())
  );

  return (
    <div className="w-full space-y-4">
      <h3 className="text-lg font-medium">Commentaires</h3>
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
              {visibleColumns.user && <TableHead>Nom d'utilisateur</TableHead>}
              {visibleColumns.email && <TableHead>Email</TableHead>}
              {visibleColumns.status && <TableHead>Status</TableHead>}
              {visibleColumns.dateReceived && <TableHead>Date Reçue</TableHead>}
              {visibleColumns.dateReply && <TableHead>Date Réponse</TableHead>}
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredComments.map((comment) => (
              <TableRow key={comment.id}>
                {visibleColumns.user && <TableCell>{comment.user}</TableCell>}
                {visibleColumns.email && <TableCell>{comment.email}</TableCell>}
                {visibleColumns.status && (
                  <TableCell
                    className={
                      comment.status === "Répondu"
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {comment.status}
                  </TableCell>
                )}
                {visibleColumns.dateReceived && (
                  <TableCell>{comment.dateReceived}</TableCell>
                )}
                {visibleColumns.dateReply && (
                  <TableCell>{comment.dateReply || "Non répondu"}</TableCell>
                )}
                <TableCell className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(comment.id)}
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
    </div>
  );
}

export default CommentsTable;
