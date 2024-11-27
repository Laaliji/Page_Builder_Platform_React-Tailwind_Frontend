import { AlignLeft, CircleHelp, Ellipsis, PanelsTopLeft, Settings } from "lucide-react";
import Page from "./Page";
import AddPage from "./AddPage";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export default function LeftPanel(){
    return <>
        <div className="w-[5%] bg-white  pt-2 px-2 border-r-[1px] border-black/15 border-solid flex flex-col justify-center mb-3 items-center gap-y-2">
            <div className="mt-1 flex flex-col gap-2">
                <div className="p-2 hover:bg-black/5 rounded-full">
                    <Popover className="">
                        <PopoverTrigger asChild>
                            <AlignLeft size="20" className="opacity-90 cursor-pointer"/>
                        </PopoverTrigger>
                        <PopoverContent className="w-fit px-10 border-none">
                            test
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="p-2 hover:bg-black/5 rounded-full">
                    <Settings size="20" className="opacity-70 cursor-pointer"/>
                </div>
                <div className="p-2 hover:bg-black/5 rounded-full">
                    <Ellipsis size="20" className="opacity-70 cursor-pointer"/>
                </div>
            </div>
            <div className="mt-auto flex-col flex items-center gap-2">
                <CircleHelp className="opacity-75 cursor-pointer mb-3"/>
                <Avatar className="">
                    <AvatarImage  src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
        </div>
    </>
}