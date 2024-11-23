import { Download,Settings,Eye,CodeXml,Save, Github, LayoutDashboard, Trash } from "lucide-react";
import { Avatar,AvatarFallback,AvatarImage } from '@/components/ui/avatar'
import Button from "./Button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu";
export default function Toolbar(){
    return <>
        <div className="w-[95%] bg-white rounded-full py-1 flex flex-row items-center justify-center">
            <div className="ml-1 flex items-center gap-3">
                <Avatar >
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>  
                <div className="flex flex-row items-center justify-center gap-1">
                    <Save className="text-black/60 size-4"/>
                    <span className="text-black/50 text-sm">Derniére modification <span className="text-[13px] text-black/70">2003-12-12</span></span>
                </div>
            </div>
            
            <div className="controllers w-[57%] flex justify-center items-center gap-2">
                <Button className='text-white duration-200 transition-all bg-primary hover:bg-secondary' title="Aperçu" hoverColer="bg-black" BGcolor="bg-primary" FGcolor="text-white" icon={<Eye className="size-5 mt-[1px]"/>} />
                <Button className='text-white duration-200 transition-all bg-primary hover:bg-secondary' title="Télèchatger" hoverColer="bg-black" BGcolor="bg-primary" FGcolor="text-white" icon={<Download className="size-5 mt-[1px]"/>} />
                <Button className=' hover:bg-gray-800 text-white duration-200 transition-all bg-black' title="Extraire" hoverColer="bg-black" BGcolor="bg-primary" FGcolor="text-white" icon={<CodeXml className="size-5 mt-[1px]"/>} />
                <Button className=' hover:bg-gray-800 text-white duration-200 transition-all bg-black' title="Publier" hoverColer="bg-black" BGcolor="bg-primary" FGcolor="text-white" icon={<Github className="size-5 mt-[1px]"/>} />
                <Button className=' hover:bg-red-500 text-white duration-200 transition-all bg-red-600' title="Effacer" hoverColer="bg-black" BGcolor="bg-primary" FGcolor="text-white" icon={<Trash className="size-5 mt-[1px]"/>} />
            </div>
            

            <div className="ml-auto mr-2 cursor-pointer ">
                <DropdownMenu className="border-none">
                    <DropdownMenuTrigger className="border-none" asChild>
                        <div className="hover:bg-black/10 p-2 rounded-full border-none">
                            <Settings className="text-black/50 "/>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="border-none mr-5 mt-[-7px] shadow-md shadow-black/40">
                        <DropdownMenuItem className="w-42 cursor-pointer"><LayoutDashboard /> Retour au tableau de bord</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    </>
}