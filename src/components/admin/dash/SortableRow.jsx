import { TableCell, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, GripVertical } from "lucide-react";

export function SortableRow({ project, setIsDeleteDialogOpen }) {
  const { attributes, listeners, transform, transition, setNodeRef } =
    useSortable({ id: project.idP });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <TableRow ref={setNodeRef} style={style}>
      <TableCell>
        <span>{project.title}</span>
      </TableCell>
      <TableCell>{project.domaineName}</TableCell>
      <TableCell>
        {new Date(project.created_at).toISOString().split("T")[0]}
      </TableCell>
      <TableCell className="w-12">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="border border-black/20">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              Voir les détails
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Modifier le projet
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600 cursor-pointer">
              <span onClick={() => setIsDeleteDialogOpen(true)}>Supprimer</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
