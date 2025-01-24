import {
  AlignLeft,
  CircleHelp,
  Ellipsis,
  FolderPen,
  FolderX,
  LayoutDashboard,
  LogOut,
  PanelsTopLeft,
  Redo2,
  Settings,
  SquareX,
  Undo2,
} from "lucide-react";
import Page from "./Page";
import AddPage from "./AddPage";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useNavigate, replace } from "react-router-dom";
import translations from "@/locale/translations"; // Import translations
import { useSelector } from "react-redux";

export default function LeftPanel({ editor }) {
  const navigation = useNavigate();
  const lang = useSelector((state) => state.values.selectedLang); // Get selected language from Redux

  return (
    <>
      <div className="w-[5%] bg-white pt-2 px-2 border-r-[1px] border-black/15 border-solid flex flex-col justify-center mb-3 items-center gap-y-2">
        <div className="mt-1 flex flex-col gap-2">
          <div className="p-2 hover:bg-black/5 rounded-full">
            <Popover className="flex flex-col items-center">
              <PopoverTrigger asChild>
                <AlignLeft size="20" className="opacity-90 cursor-pointer" />
              </PopoverTrigger>
              <PopoverContent className="w-fit h-40 pr-32 border-none -mt-7 ml-12 py-2 pl-3 shadow-md">
                <div className="">
                  <div className="flex items-center gap-2">
                    <AlignLeft size="16" className="opacity-90 cursor-pointer" />
                    <p className="font-normal font-[Poppins]">
                      {translations[lang].page_structure}
                    </p>
                  </div>
                  <div id="layerR"></div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div className="p-2 hover:bg-black/5 rounded-full">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Settings size="20" className="opacity-70 cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-fit border border-black/10 border-solid"
                side="right"
              >
                <DropdownMenuItem
                  onClick={() => navigation("/dash/user/home", { replace })}
                  className="cursor-pointer flex gap-2"
                >
                  <LayoutDashboard /> {translations[lang].back_to_dashboard}
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer flex gap-2">
                  <FolderX /> {translations[lang].delete_project}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer flex gap-2">
                  <LogOut /> {translations[lang].logout}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="p-2 hover:bg-black/5 rounded-full">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Ellipsis size="20" className="opacity-70 cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-fit border border-black/10 border-solid"
                side="right"
              >
                <DropdownMenuItem>
                  <div
                    className="cursor-pointer flex gap-2 items-center"
                    onClick={() => editor.Commands.run("core:canvas-clear")}
                  >
                    <SquareX /> {translations[lang].clear_page_content}
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <div
                    className="cursor-pointer flex gap-2 items-center"
                    onClick={() => editor.Commands.run("core:redo")}
                  >
                    <Redo2 /> {translations[lang].redo}
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div
                    className="cursor-pointer flex gap-2 items-center"
                    onClick={() => editor.Commands.run("core:undo")}
                  >
                    <Undo2 /> {translations[lang].undo}
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="mt-auto flex-col flex items-center gap-2">
          <CircleHelp className="opacity-75 cursor-pointer mb-3" />
          <Avatar className="cursor-pointer">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-fit border border-black/10 border-solid"
                side="right"
              >
                <DropdownMenuItem className="cursor-pointer flex gap-2">
                  <LogOut /> {translations[lang].logout}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Avatar>
        </div>
      </div>
    </>
  );
}