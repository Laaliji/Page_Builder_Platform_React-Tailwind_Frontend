import { AlignLeft, CircleHelp, Ellipsis, FolderPen, FolderX, LayoutDashboard, LogOut, PanelsTopLeft, Redo2, Settings, SquareX, Undo2 } from "lucide-react";
import Page from "./Page";
import AddPage from "./AddPage";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";

export default function LeftPanel({ editor }){
    return <>
        <div className="w-[5%] bg-white  pt-2 px-2 border-r-[1px] border-black/15 border-solid flex flex-col justify-center mb-3 items-center gap-y-2">
            <div className="mt-1 flex flex-col gap-2">
                <div className="p-2 hover:bg-black/5 rounded-full">
                    <Popover className="flex flex-col items-center">
                        <PopoverTrigger asChild>
                            <AlignLeft size="20" className="opacity-90 cursor-pointer"/>
                        </PopoverTrigger>
                        <PopoverContent className="w-fit h-40 pr-32 border-none -mt-7 ml-12 py-2 pl-3 shadow-md">
                            <div className="">
                                <div className="flex items-center gap-2">
                                    <AlignLeft size="16" className="opacity-90 cursor-pointer"/>
                                    <p className="font-normal  font-[Poppins]">Structure de Page</p>  
                                </div>
                              
                                <div id="layerR"> </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="p-2 hover:bg-black/5 rounded-full">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild >
                            <Settings size="20" className="opacity-70 cursor-pointer"/>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-fit border border-black/10 border-solid" side="right">
                            <DropdownMenuItem className="cursor-pointer flex gap-2">
                                <LayoutDashboard /> Retour au tableau de bord
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer flex gap-2">
                                <FolderX /> Supprimer le projet
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer flex gap-2">
                                <LogOut /> Deconnexion
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    
                </div>
                <div className="p-2 hover:bg-black/5 rounded-full">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild >
                            <Ellipsis size="20" className="opacity-70 cursor-pointer"/>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-fit border border-black/10 border-solid" side="right">
                            <DropdownMenuItem  >
                                <div className="cursor-pointer flex gap-2" onClick={()=>editor.Commands.run('core:canvas-clear')}>
                                   <SquareX/> Effacer le contenu de la page 
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem  >
                                <div className="cursor-pointer flex gap-2" onClick={()=>editor.Commands.run('core:redo')}>
                                    <Redo2/> Refaire
                                </div>                               
                            </DropdownMenuItem>
                            <DropdownMenuItem  >
                                <div className="cursor-pointer flex gap-2" onClick={()=>editor.Commands.run('core:undo')}>
                                    <Undo2/> Défaire
                                </div>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className="mt-auto flex-col flex items-center gap-2">
                <CircleHelp className="opacity-75 cursor-pointer mb-3"/>
                <Avatar className="cursor-pointer">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild >
                            <div>
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-fit border border-black/10 border-solid" side="right">
                            <DropdownMenuItem className="cursor-pointer flex gap-2">
                                <LogOut /> Deconnexion
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </Avatar>
            </div>
        </div>
    </>
}