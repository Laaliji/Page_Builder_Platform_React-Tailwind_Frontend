import React, { useEffect, useState } from "react";
import {
  Check,
  ChevronsUpDown,
  CodeXml,
  EllipsisVertical,
  File,
  FolderPen,
  FolderX,
  Forward,
  Github,
  LaptopMinimal,
  Loader2,
  Play,
  Plus,
  Save,
  Smartphone,
  HelpCircle,
  Settings,
} from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button as Btn } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SegmentedControl from "@/components/ui/SegmentedControl";
import RenameDialog from "./DialogeRenameProject";
import DeleteDialog from "./DialogeDeleteProject";
import DialogeNewPage from "./DialogeNewPage";
import DialogeExtractCode from "./DialogeExtractCode";
import DialogeShare from "./DialogeShare";
import { Preview } from "@/functions/editor/Preview";
import Button from "./Button";
import { hasPages } from "@/functions/editor/CRUD";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsDiaglogAddPageOpen,
  setRefetchSwitchPage,
  setSelectedPageId,
} from "@/store/valueSlicer";
import translations from "@/locale/translations";
import GuidedTour from "./GuidedTour";
import PricingDialog from "./PricingDialog";
import { useToast } from "@/hooks/use-toast";
import ManageUpgrades from "./ManageUpgrades";

const Toolbar = ({
  title,
  editor,
  pages,
  setPages,
  currentPage,
  setCurrentPage,
  handleNewPage,
  idProject,
  saveCurrentPageContent,
}) => {
  const { saveLoading, noPages, isDiaglogAddPageOpen, selectedPageId, refetchSwitchPage } =
    useSelector((state) => state.values);

  const dispatch = useDispatch();
  const lang = useSelector((state) => state.values.selectedLang); // Get selected language from Redux

  const [open, setOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState("computer");
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isNewPageDialogOpen, setIsNewPageDialogOpen] = useState(false);
  const [isExtractCodeDialogOpen, setIsExtractCodeDialogOpen] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [projectHasPages, setProjectHasPages] = useState(false);
  const [showGuidedTour, setShowGuidedTour] = useState(false);
  const [showPricingDialog, setShowPricingDialog] = useState(false);
  const [accountUpgraded, setAccountUpgraded] = useState(false);
  const [showManageUpgrades, setShowManageUpgrades] = useState(false);
  const { toast } = useToast();

  const [updateTitleProject, setUpdateTitleProject] = useState(null);

  const options = [
    { value: "computer", label: translations[lang].computer, icon: LaptopMinimal },
    { value: "phone", label: translations[lang].phone, icon: Smartphone },
  ];

  const selectDevice = (value) => {
    setSelectedDevice(value);
    const deviceManager = editor.DeviceManager;
    const device = deviceManager.get(value);
    deviceManager.select(device);
  };

  useEffect(() => {
    const HasPages = async () => {
      const response = (await hasPages({ idProject: idProject })).EXISTE;
      setProjectHasPages(response);
    };
    if (idProject) HasPages();
  }, [idProject]);

  // Check for project-specific upgrade status when component loads
  useEffect(() => {
    if (idProject) {
      const upgradedProjects = JSON.parse(localStorage.getItem('upgradedProjects') || '{}');
      if (upgradedProjects[idProject] && upgradedProjects[idProject].active) {
        setAccountUpgraded(true);
      } else {
        setAccountUpgraded(false);
      }
    }
  }, [idProject]);

  const pageTitle = pages.find((page) => page.id === selectedPageId)?.title || translations[lang].select_page;

  const handlePricingClose = () => {
    // Check if this specific project was upgraded
    const upgradedProjects = JSON.parse(localStorage.getItem('upgradedProjects') || '{}');
    if (upgradedProjects[idProject] && upgradedProjects[idProject].active) {
      setAccountUpgraded(true);
    }
    setShowPricingDialog(false);
  };

  const handlePublishClick = () => {
    if (accountUpgraded) {
      // If account is upgraded, we'd handle actual GitHub publishing here
      toast({
        title: "Publishing to GitHub",
        description: "Your website is being published to GitHub...",
        status: "success",
        duration: 3000,
      });
      // Simulation of publishing
      setTimeout(() => {
        toast({
          title: "Published Successfully",
          description: "Your website has been published to GitHub.",
          status: "success",
          duration: 5000,
        });
      }, 3000);
    } else {
      setShowPricingDialog(true);
    }
  };

  return (
    <>
      {showGuidedTour && <GuidedTour onComplete={() => setShowGuidedTour(false)} />}
      <PricingDialog 
        isOpen={showPricingDialog} 
        onClose={handlePricingClose} 
        projectId={idProject}
      />
      <ManageUpgrades 
        isOpen={showManageUpgrades} 
        onClose={() => setShowManageUpgrades(false)} 
      />
      <DialogeShare
        isShareDialogOpen={isShareDialogOpen}
        setIsShareDialogOpen={setIsShareDialogOpen}
      />
      <DialogeExtractCode
        isExtractCodeDialogOpen={isExtractCodeDialogOpen}
        setIsExtractCodeDialogOpen={setIsExtractCodeDialogOpen}
        editor={editor}
      />
      <RenameDialog
        isRenameDialogOpen={isRenameDialogOpen}
        setIsRenameDialogOpen={setIsRenameDialogOpen}
        setUpdateTitleProject={setUpdateTitleProject}
      />
      <DeleteDialog
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
      />
      <DialogeNewPage
        pages={pages}
        isNewPageDialogOpen={isDiaglogAddPageOpen}
        onNewPage={handleNewPage}
        existingPages={pages}
        idProject={idProject}
      />

      <div className="w-full overflow-hidden bg-white py-[9px] flex flex-row items-center border-b-[1px] border-black/15 border-solid">
        <div className="ml-3 flex items-center gap-5">
          <img
            src="/assets/images/logo.png"
            width="30"
            alt="Logo"
            className="cursor-pointer"
          />
          <div className="flex items-center gap-4">
            <span className="font-[Poppins] text-[13px] font-medium">
              {updateTitleProject ? updateTitleProject : title}
            </span>
            <div className="p-[5px] hover:bg-black/5 rounded-full ml-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <EllipsisVertical
                    size="17"
                    className="text-black/50 cursor-pointer"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-fit border border-black/10 border-solid ml-2">
                  <DropdownMenuItem
                    onClick={() => setIsRenameDialogOpen(true)}
                    className="cursor-pointer flex gap-3"
                  >
                    <FolderPen /> {translations[lang].rename_project}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setIsDeleteDialogOpen(true)}
                    className="cursor-pointer flex gap-3"
                  >
                    <FolderX /> {translations[lang].delete_project}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="relative -ml-10">
              <hr className="w-20 rotate-[60deg] absolute top-[-35px] opacity-20" />
              <hr className="w-20 -rotate-[60deg] absolute bottom-[-35px] opacity-20" />
            </div>
            {projectHasPages && !noPages && (
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Btn
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-fit py-[-50px] justify-between font-normal items-center ml-16"
                  >
                    <File className="opacity-50 mr-2" />
                    {pageTitle}
                    <ChevronsUpDown className="opacity-50 ml-2" />
                  </Btn>
                </PopoverTrigger>
                <PopoverContent className="w-[250px] p-0 border border-black/10 border-solid">
                  <Command>
                    <CommandInput placeholder={translations[lang].search_pages} />
                    <CommandList>
                      <CommandEmpty>{translations[lang].no_pages_found}</CommandEmpty>
                      <CommandGroup>
                        {pages.map((page) => (
                          <CommandItem
                            key={page.id}
                            value={page.id}
                            onSelect={() => {
                              dispatch(setSelectedPageId(page.id));
                              dispatch(setRefetchSwitchPage(!refetchSwitchPage));
                              setOpen(false);
                            }}
                          >
                            {page.title}
                            <Check
                              className={cn(
                                "ml-auto mr-2",
                                selectedPageId
                                  ? selectedPageId == page.id
                                    ? "opacity-100"
                                    : "opacity-0"
                                  : currentPage == page.id
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                        <CommandItem
                          className="flex cursor-pointer"
                          onSelect={() => {
                            setIsNewPageDialogOpen(true);
                          }}
                        >
                          <div
                            onClick={() => dispatch(setIsDiaglogAddPageOpen(true))}
                            className="flex items-center gap-2"
                          >
                            <Plus /> {translations[lang].new_page}
                          </div>
                        </CommandItem>
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
        <div className="ml-auto mr-3 flex items-center gap-2">
          <div className="flex flex-col items-center justify-center bg-background">
            <SegmentedControl
              options={options}
              value={selectedDevice}
              onChange={selectDevice}
            />
          </div>
          <div
            className="p-[7px] rounded-sm hover:bg-green-100"
            onClick={() => Preview(editor)}
          >
            <Play
              fill="#b7dfba"
              size="20"
              className="text-green-700 cursor-pointer"
            />
          </div>
          <Button
            title={translations[lang].extract}
            className="bg-black/10 hover:bg-black/15 text-black"
            icon={<CodeXml size={"16"} />}
            onClick={() => setIsExtractCodeDialogOpen(true)}
          />
          <Button
            title={translations[lang].share}
            className="bg-black/10 hover:bg-black/15 text-black"
            icon={<Forward size={"16"} />}
            onClick={() => setIsShareDialogOpen(true)}
          />
          <Button
            title={translations[lang].publish}
            className={`${accountUpgraded ? "bg-green-600 hover:bg-green-700" : "bg-secondary hover:bg-primary"} text-white`}
            icon={<Github size={"16"} />}
            onClick={handlePublishClick}
          />
          <div
            onClick={() => saveCurrentPageContent()}
            className="mr-1 p-[7px] bg-secondary hover:bg-primary rounded-md cursor-pointer"
          >
            {saveLoading ? (
              <>
                <Loader2 size="20" color="white" className="animate-spin" />
              </>
            ) : (
              <>
                <Save size="20" color="white" />
              </>
            )}
          </div>
          <div className="ml-auto mr-5 flex items-center gap-2">
            <Btn
              variant="ghost"
              onClick={() => setShowGuidedTour(true)}
              className="flex items-center gap-2"
            >
              <HelpCircle size={18} />
              <span className="text-sm">{translations[lang]?.tour || "Tour"}</span>
            </Btn>
            
            {/* Admin button - this would typically be shown only for admin users */}
           
          </div>
        </div>
      </div>
    </>
  );
};

export default Toolbar;