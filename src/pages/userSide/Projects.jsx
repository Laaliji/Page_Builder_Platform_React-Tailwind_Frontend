import { useEffect, useState } from "react"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FolderPlus } from 'lucide-react'
import { SortableRow } from "@/components/userdashboard/SortableRow"
import { getProjects } from "@/functions/projects/CRUD"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import DeleteDialog from "@/components/userdashboard/DeleteDialog"
import { useSelector } from "react-redux"
import { SortableRowLading } from "@/components/userdashboard/SortableRowLoading"
import EditProjectDialoge from "@/components/userdashboard/EditProjectDialoge"
import ViewProjectDialoge from "@/components/userdashboard/ViewProjectDialoge"
import { useNavigate, replace, useLocation } from "react-router-dom"
import translations from "@/locale/translations"
import { useToast } from "@/hooks/use-toast.jsx"

export default function Projects() {
  const { refrecher, selectedLang } = useSelector((state) => state.values);
  const location = useLocation();
  const navigation = useNavigate();
  const { toast } = useToast();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterValue, setFilterValue] = useState("");

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewProjectDialogeOpen, setIsViewProjectDialogeOpen] = useState(false);
  const [isEditProjectDialogeOpen, setIsEditProjectDialogeOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 5;

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(filterValue.toLowerCase())
  );

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const fetchProjects = async () => {
    try {
      // Get the authenticated user ID from localStorage
      const userId = localStorage.getItem('userId');
      
      if (!userId) {
        console.error("User ID not found in localStorage");
        toast({
          variant: "destructive",
          title: "Authentication Required",
          description: "Please log in to view your projects."
        });
        navigation("/login");
        return;
      }
      
      console.log("Fetching projects for user ID:", userId);
      setLoading(true);
      const fetchedProjects = await getProjects({idUser: userId});
      
      if (fetchedProjects && Array.isArray(fetchedProjects)) {
        console.log(`Loaded ${fetchedProjects.length} projects`);
        setProjects(fetchedProjects);
      } else {
        console.error("Invalid projects data:", fetchedProjects);
        setProjects([]);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load projects. Please try again."
      });
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch projects when the component mounts or when refrecher changes
    fetchProjects();
  }, [refrecher]);

  // Additional effect to catch navigation from project creation
  useEffect(() => {
    // Check if we're navigating from the stepper (project creation)
    const isFromStepper = location.state?.from === 'stepper';
    
    if (isFromStepper) {
      toast({
        title: "Success",
        description: "Your project was created successfully."
      });
      // Force a refresh of projects
      fetchProjects();
    }
  }, [location]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <ViewProjectDialoge
        setIsEditProjectDialogeOpen={setIsEditProjectDialogeOpen}
        isViewProjectDialogeOpen={isViewProjectDialogeOpen}
        setIsViewProjectDialogeOpen={setIsViewProjectDialogeOpen}
      />
      <EditProjectDialoge
        isEditProjectDialogeOpen={isEditProjectDialogeOpen}
        setIsEditProjectDialogeOpen={setIsEditProjectDialogeOpen}
      />
      <DeleteDialog
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
      />
      <div className="w-full space-y-[11px]">
        <div>
          <h3 className="text-lg font-medium">{translations[selectedLang].projects}</h3>
        </div>
        <div className="flex items-center justify-between">
          <Input
            placeholder={translations[selectedLang].search}
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            className="max-w-sm border border-black/20"
          />
          <Button onClick={() => navigation("/stepper", { replace })} className="text-white flex items-center">
            <FolderPlus />
            <span className="-mt-[2px]">{translations[selectedLang].add_project}</span>
          </Button>
        </div>

        <div className="border border-black/20 bg-white rounded-lg">
          <Table className="rounded-lg">
            <TableHeader>
              <TableRow>
                <TableHead>{translations[selectedLang].project_name}</TableHead>
                <TableHead>{translations[selectedLang].domain_name}</TableHead>
                <TableHead>{translations[selectedLang].creation_date}</TableHead>
                <TableHead className="w-12">{translations[selectedLang].actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <SortableRowLading />
              ) : currentProjects.length > 0 ? (
                currentProjects
                  .filter((project) => project.title.includes(filterValue))
                  .map((project) => (
                    <SortableRow
                      key={project.idP || project.id}
                      project={project}
                      setIsDeleteDialogOpen={setIsDeleteDialogOpen}
                      setIsEditProjectDialogeOpen={setIsEditProjectDialogeOpen}
                      setIsViewProjectDialogeOpen={setIsViewProjectDialogeOpen}
                    />
                  ))
              ) : (
                <TableRow>
                  <td colSpan="4" className="py-8 text-center text-gray-500">
                    {filterValue ? "No projects match your search" : "You don't have any projects yet. Create one!"}
                  </td>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {!loading && filteredProjects.length > 0 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
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
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </>
  );
}

