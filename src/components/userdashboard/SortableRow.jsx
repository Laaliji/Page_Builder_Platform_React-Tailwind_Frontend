import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { TableCell, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, GripVertical } from 'lucide-react'


export function SortableRow({ project, visibleColumns, isSelected, onCheckboxChange }) {
  const {
    attributes,
    listeners,
    transform,
    transition,
    setNodeRef,
  } = useSortable({ id: project.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Success":
        return "text-green-600"
      case "Processing":
        return "text-yellow-600"
      case "Failed":
        return "text-red-600"
      default:
        return ""
    }
  }

  return (
    <TableRow ref={setNodeRef} style={style} className="cursor-move">
      <TableCell className="w-12">
        <div className="flex items-center gap-2">
          <Checkbox checked={isSelected} onCheckedChange={onCheckboxChange} />
          <GripVertical className="h-4 w-4 text-muted-foreground" {...attributes} {...listeners} />
        </div>
      </TableCell>
      {visibleColumns.status && (
        <TableCell>
          <span className={getStatusColor(project.status)}>{project.status}</span>
        </TableCell>
      )}
      {visibleColumns.email && <TableCell>{project.email}</TableCell>}
      {visibleColumns.amount && (
        <TableCell>${project.amount.toFixed(2)}</TableCell>
      )}
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
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Edit project</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
}

