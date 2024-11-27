import { Check, ChevronsUpDown, Code, CodeXml, Computer, EllipsisVertical, File, FolderPen, FolderX, Forward, Github, LaptopMinimal, Play, Plus, Smartphone } from "lucide-react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react";
import { Button as Btn } from "../ui/button";
import { cn } from "@/lib/utils";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import Button from "./Button";

import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import SegmentedControl from "../ui/SegmentedControl";
import DialogeRenameProject from "./DialogeRenameProject";
import RenameDialog from "./DialogeRenameProject";
import DeleteDialog from "./DialogeDeleteProject";
import DialogeNewPage from "./DialogeNewPage";
import DialogeExtractCode from "./DialogeExtractCode";
import { Preview } from "@/functions/editor/Preview";
import DialogeShare from "./DialogeShare";
export default function Toolbar({ title , editor }){
    const Pages = [
        {label:"homepage"   , value:"homepage"   },
        {label:"aboutpage"  , value:"aboutpage"  },
        {label:"contactpage", value:"contactpage"},
        {label:"pricepage"  , value:"pricepage"  },
    ]
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")

    const [selectedDevice, setSelectedDevice] = useState("computer")

    const options = [
        { value: "computer", label: "Computer", icon: LaptopMinimal },
        { value: "phone", label: "Phone", icon: Smartphone },
    ]
    const [isRenameDialogOpen , setIsRenameDialogOpen] = useState(false)
    const [isDeleteDialogOpen , setIsDeleteDialogOpen] = useState(false)
    const [isNewPageDialogOpen,setIsNewPageDialogOpen] = useState(false)
    const [isExtractCodeDialogOpen,setIsExtractCodeDialogOpen] = useState(false)
    const [isShareDialogOpen,setIsShareDialogOpen] = useState(false)

    const selectDevice = (value) => {
        setSelectedDevice(value);
        const deviceManager = editor.DeviceManager;
        const device = deviceManager.get(value);
        deviceManager.select(device);
    };
    

    return <>
        {/* Components  */}
        <DialogeShare isShareDialogOpen={isShareDialogOpen} setIsShareDialogOpen={setIsShareDialogOpen}/>
        <DialogeExtractCode isExtractCodeDialogOpen={isExtractCodeDialogOpen} setIsExtractCodeDialogOpen={setIsExtractCodeDialogOpen} editor={editor} />
        <RenameDialog isRenameDialogOpen={isRenameDialogOpen} setIsRenameDialogOpen={setIsRenameDialogOpen} />
        <DeleteDialog isDeleteDialogOpen={isDeleteDialogOpen} setIsDeleteDialogOpen={setIsDeleteDialogOpen} />
        <DialogeNewPage isNewPageDialogOpen={isNewPageDialogOpen} setIsNewPageDialogOpen={setIsNewPageDialogOpen}/>
        <div className="w-full overflow-hidden bg-white py-[9px]  flex flex-row items-center border-b-[1px] border-black/15 border-solid">
            <div className="ml-3 flex items-center gap-5">
                <img src="/assets/images/logo.png" width="30" className="cursor-pointer"/>
                <div className=" flex items-center gap-1">
                    <span className="font-[Poppins] text-[13px] font-medium">{title}</span>
                    <div className="p-[5px] hover:bg-black/5 rounded-full">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <EllipsisVertical size="17" className="text-black/50 cursor-pointer"/>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-fit border border-black/10 border-solid">
                                <DropdownMenuItem onClick={()=> setIsRenameDialogOpen(true)} className="cursor-pointer flex gap-2">
                                    <FolderPen /> Renommer le projet
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={()=> setIsDeleteDialogOpen(true)} className="cursor-pointer flex gap-2">
                                    <FolderX /> Supprimer le projet
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="relative -ml-5">
                        <hr className="w-20 rotate-[60deg] absolute top-[-35px] opacity-20"/> 
                        <hr className="w-20 -rotate-[60deg] absolute bottom-[-35px] opacity-20"/>
                    </div>
                    <Popover open={open} onOpenChange={setOpen} >
                        <PopoverTrigger asChild className="ml-20 ">
                            <Btn
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="w-fit py-[-50px] justify-between font-normal items-center"
                            >
                                <File className="opacity-50" />
                                <p className="mt-[-3px] opacity-80" >{value
                                    ? Pages.find((page) => page.value === value)?.label
                                    : "Selectionnez un page..."}</p>
                                <ChevronsUpDown className="opacity-50" />
                            </Btn>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0 border border-black/10 border-solid ">
                            <Command>
                            <CommandInput placeholder="Recherche sur page..." />
                            <CommandList>
                                <CommandEmpty>
                                    Page n'existe pas
                                </CommandEmpty>
                                <CommandGroup>
                                {Pages.map((page) => (
                                    <CommandItem
                                    key={page.value}
                                    value={page.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                    >
                                    {page.label}
                                    <Check
                                        className={cn(
                                        "ml-auto",
                                        value === page.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    </CommandItem>
                                ))}
                                <CommandItem className="flex cursor-pointer">
                                    <div onClick={()=>setIsNewPageDialogOpen(true)} className="flex items-center gap-2">
                                        <Plus /> nouveau page
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
                <div className="p-[7px] rounded-sm hover:bg-green-100" onClick={()=>Preview(editor)}>
                    <Play fill="#b7dfba" size="20" className="text-green-700 cursor-pointer"/>
                </div>
                <Button title="Extraire" className="bg-black/10 hover:bg-black/15  text-black" icon={<CodeXml size={"16"}/>} onClick={()=>setIsExtractCodeDialogOpen(true)} />
                <Button title="Partager" className="bg-black/10 hover:bg-black/15 text-black" icon={<Forward size={"16"}/>} onClick={()=>setIsShareDialogOpen(true)}/>
                <Button title="Publier" className="bg-secondary hover:bg-primary text-white" icon={<Github size={"16"}/>}/>
            </div>
        </div>
    </>
}