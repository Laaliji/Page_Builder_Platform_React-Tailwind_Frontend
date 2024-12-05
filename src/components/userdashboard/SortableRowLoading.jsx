import { TableCell, TableRow } from "@/components/ui/table"
import { Skeleton } from "../ui/skeleton"
import { useSortable } from "@dnd-kit/sortable"


export function SortableRowLading() {

  return <>
    {Array.from({ length: 4 }).map((_, i) => (
        <TableRow key={i}>
            <TableCell>
                <Skeleton className="h-6 w-15" />
            </TableCell>   
            <TableCell>
                <Skeleton className="h-6 w-15" />
            </TableCell>
            <TableCell>
                <Skeleton className="h-6 w-15" />  
            </TableCell>
            <TableCell className="w-12">
                <Skeleton className="h-6 w-15" />
            </TableCell>
        </TableRow>
    ))}
  </>
}

