
import { useState } from "react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { MoreHorizontal, ChevronDown } from 'lucide-react'
import { SortableRow } from "@/components/userdashboard/SortableRow" 


export default function Projects() {
  const [projects, setProjects] = useState([
    { id: "1", status: "Success", email: "ken99@yahoo.com", amount: 316.00 },
    { id: "2", status: "Success", email: "abe45@gmail.com", amount: 242.00 },
    { id: "3", status: "Processing", email: "monserrat44@gmail.com", amount: 837.00 },
    { id: "4", status: "Success", email: "silas22@gmail.com", amount: 874.00 },
    { id: "5", status: "Failed", email: "carmella@hotmail.com", amount: 721.00 },
  ])

  const [filterValue, setFilterValue] = useState("")
  const [selectedProjects, setSelectedProjects] = useState([])
  const [visibleColumns, setVisibleColumns] = useState({
    status: true,
    email: true,
    amount: true,
  })

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const filteredProjects = projects.filter((project) =>
    project.email.toLowerCase().includes(filterValue.toLowerCase())
  )

  function handleDragEnd(event) {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setProjects((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const toggleSelectAll = () => {
    if (selectedProjects.length === filteredProjects.length) {
      setSelectedProjects([])
    } else {
      setSelectedProjects(filteredProjects.map((project) => project.id))
    }
  }

  const toggleProjectSelection = (projectId) => {
    setSelectedProjects((current) =>
      current.includes(projectId)
        ? current.filter((id) => id !== projectId)
        : [...current, projectId]
    )
  }

  return (
    <div className="w-full space-y-4">
      <div>
          <h3 className="text-lg font-medium">Projets</h3>
      </div>
      <div className="flex items-center justify-between">
        <Input
          placeholder="Filter emails..."
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          className="max-w-sm border border-black/20"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto border border-black/20">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="border border-black/20 shadow-md">
            <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={visibleColumns.status}
              onCheckedChange={(checked) =>
                setVisibleColumns((prev) => ({ ...prev, status: checked }))
              }
            >
              Status
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={visibleColumns.email}
              onCheckedChange={(checked) =>
                setVisibleColumns((prev) => ({ ...prev, email: checked }))
              }
            >
              Email
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={visibleColumns.amount}
              onCheckedChange={(checked) =>
                setVisibleColumns((prev) => ({ ...prev, amount: checked }))
              }
            >
              Amount
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="border border-black/20 bg-white rounded-lg">
        <Table className="rounded-lg">
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedProjects.length === filteredProjects.length}
                  onCheckedChange={toggleSelectAll}
                  aria-label="Select all"
                />
              </TableHead>
              {visibleColumns.status && <TableHead>Status</TableHead>}
              {visibleColumns.email && <TableHead>Email</TableHead>}
              {visibleColumns.amount && <TableHead>Amount</TableHead>}
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={filteredProjects}
              strategy={verticalListSortingStrategy}
            >
              <TableBody>
                {filteredProjects.map((project) => (
                  <SortableRow
                    key={project.id}
                    project={project}
                    visibleColumns={visibleColumns}
                    isSelected={selectedProjects.includes(project.id)}
                    onCheckboxChange={() => toggleProjectSelection(project.id)}
                  />
                ))}
              </TableBody>
            </SortableContext>
          </DndContext>
        </Table>
      </div>
    </div>
  )
}

