import React, { useState } from "react";
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
  Play,
  Plus,
  Smartphone,
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
import { Button } from "@/components/ui/button";
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

const Toolbar = ({
  title,
  editor,
  pages,
  setPages,
  currentPage,
  setCurrentPage,
  handleNewPage,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState("computer");
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isNewPageDialogOpen, setIsNewPageDialogOpen] = useState(false);
  const [isExtractCodeDialogOpen, setIsExtractCodeDialogOpen] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);

  const options = [
    { value: "computer", label: "Computer", icon: LaptopMinimal },
    { value: "phone", label: "Phone", icon: Smartphone },
  ];

  const selectDevice = (value) => {
    setSelectedDevice(value);
    const deviceManager = editor.DeviceManager;
    const device = deviceManager.get(value);
    deviceManager.select(device);
  };

  return (
    <>
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
      />
      <DeleteDialog
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
      />
      <DialogeNewPage
        isNewPageDialogOpen={isNewPageDialogOpen}
        setIsNewPageDialogOpen={setIsNewPageDialogOpen}
        onNewPage={handleNewPage}
        existingPages={pages}
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
            {" "}
            {/* Increased gap */}
            <span className="font-[Poppins] text-[13px] font-medium">
              {title}
            </span>
            <div className="p-[5px] hover:bg-black/5 rounded-full ml-2">
              {" "}
              {/* Added ml-4 */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <EllipsisVertical
                    size="17"
                    className="text-black/50 cursor-pointer"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-fit border border-black/10 border-solid ml-2">
                  {" "}
                  {/* Increased margin */}
                  <DropdownMenuItem
                    onClick={() => setIsRenameDialogOpen(true)}
                    className="cursor-pointer flex gap-3 ml-2" // Added margin and increased gap
                  >
                    <FolderPen /> Renommer le projet
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setIsDeleteDialogOpen(true)}
                    className="cursor-pointer flex gap-3 ml-2" // Added margin and increased gap
                  >
                    <FolderX /> Supprimer le projet
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="relative ml-2"> {/* Increased margin */}</div>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-fit py-[-50px] justify-between font-normal items-center ml-1"
                >
                  <File className="opacity-50 mr-2" />{" "}
                  {/* Added right margin to icon */}
                  {currentPage
                    ? pages.find((page) => page.id === currentPage)?.title
                    : "Select a page..."}
                  <ChevronsUpDown className="opacity-50 ml-2" />{" "}
                  {/* Added left margin to chevron */}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[250px] p-0 border border-black/10 border-solid ml-1">
                <Command>
                  <CommandInput
                    placeholder="Chercher les pages..."
                    className="ml-2"
                  />{" "}
                  {/* Added margin to input */}
                  <CommandList>
                    <CommandEmpty className="ml-2">No pages found</CommandEmpty>{" "}
                    {/* Added margin */}
                    <CommandGroup>
                      {pages.map((page) => (
                        <CommandItem
                          key={page.id}
                          value={page.id}
                          className="ml-1" // Added slight margin
                          onSelect={() => {
                            setCurrentPage(page.id);
                            setOpen(false);
                          }}
                        >
                          {page.title}
                          <Check
                            className={cn(
                              "ml-auto mr-2", // Added right margin
                              currentPage === page.id
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                      <CommandItem
                        className="flex cursor-pointer ml-2" // Added margin
                        onSelect={() => {
                          setIsNewPageDialogOpen(true);
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <Plus /> Nouvelle page
                        </div>
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
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
            variant="outline"
            size="sm"
            className="bg-black/10 hover:bg-black/15 text-black"
            onClick={() => setIsExtractCodeDialogOpen(true)}
          >
            <CodeXml size={16} className="mr-2" />
            Extraire
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-black/10 hover:bg-black/15 text-black"
            onClick={() => setIsShareDialogOpen(true)}
          >
            <Forward size={16} className="mr-2" />
            Partager
          </Button>
          <Button
            variant="default"
            size="sm"
            className="bg-secondary hover:bg-primary text-white"
          >
            <Github size={16} className="mr-2" />
            Publier
          </Button>
        </div>
      </div>
    </>
  );
};

export default Toolbar;
