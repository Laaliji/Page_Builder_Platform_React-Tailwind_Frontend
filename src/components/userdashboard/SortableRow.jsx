import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { TableCell, TableRow } from "@/components/ui/table"
import { useDispatch } from "react-redux"
import { setSelectedProjectDeleteID , setSelectedProjectUpdateID , setSelectedProjectViewID } from '@/store/valueSlicer'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from 'lucide-react'


export function SortableRow({ project , setIsDeleteDialogOpen , setIsEditProjectDialogeOpen , setIsViewProjectDialogeOpen }) {

  const dispatch = useDispatch()

  const {
    attributes,
    listeners,
    transform,
    transition,
    setNodeRef,
  } = useSortable({ id: project.idP })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <TableRow ref={setNodeRef} style={style}>
      <TableCell>
        <span>{project.title}</span>
      </TableCell>   
      <TableCell>
        {project.domaineName}
      </TableCell>
      <TableCell>
        {new Date(project.created_at).toISOString().split('T')[0]}
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
            <DropdownMenuItem className="cursor-pointer"><span onClick={()=>{dispatch((setSelectedProjectViewID(project.idP)));setIsViewProjectDialogeOpen(true)}}>Voir les détails</span></DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer"><span onClick={()=>{dispatch(setSelectedProjectUpdateID(project.idP));setIsEditProjectDialogeOpen(true)}}>Modifier le projet</span></DropdownMenuItem>
            <DropdownMenuItem className="text-red-600 cursor-pointer"><span onClick={()=>{dispatch(setSelectedProjectDeleteID(project.idP));setIsDeleteDialogOpen(true)}}>Supprimer</span></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
}

