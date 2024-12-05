import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FolderPlus } from "lucide-react";
import { SortableRow } from "@/components/admin/dash/SortableRow";
// import { getProjects } from "@/functions/projects/CRUD";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
// import DeleteDialog from "@/components/userdashboard/DeleteDialog";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterValue, setFilterValue] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 5;

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(filterValue.toLowerCase())
  );

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  useEffect(() => {
    const GetProjects = async () => {
      setProjects(await getProjects({ idUser: 1 }));
      setLoading(false);
    };
    GetProjects();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      {/* <DeleteDialog
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
      /> */}
      <div className="w-full space-y-[11px]">
        <div>
          <h3 className="text-lg font-medium">Projets</h3>
        </div>
        <div className="flex items-center justify-between">
          <Input
            placeholder="rechercher ..."
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            className="max-w-sm border border-black/20"
          />
          <Button className="text-white flex items-center">
            <FolderPlus />
            <span className="-mt-[2px]">Ajouter Nouveau</span>
          </Button>
        </div>

        <div className="border border-black/20 bg-white rounded-lg">
          <Table className="rounded-lg">
            <TableHeader>
              <TableRow>
                <TableHead>Nom de Client</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead>Date de Création</TableHead>
                <TableHead>Téléphone</TableHead>
                <TableHead>Dernier Login</TableHead>
                <TableHead className="w-12">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentProjects
                .filter((project) => project.title.includes(filterValue))
                .map((project) => (
                  <SortableRow
                    key={project.id}
                    project={project}
                    setIsDeleteDialogOpen={setIsDeleteDialogOpen}
                  />
                ))}
            </TableBody>
          </Table>
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  onClick={() => handlePageChange(index + 1)}
                  isActive={currentPage === index + 1}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  handlePageChange(Math.min(totalPages, currentPage + 1))
                }
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
}
