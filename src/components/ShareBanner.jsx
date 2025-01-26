import { frontend_url } from "@/constant/global";
import translations from "@/locale/translations";
import { setSelectedLang } from "@/store/valueSlicer";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

export default function ShareBanner() {
    const dispatch = useDispatch()

    const { selectedLang } = useSelector(
        (state) => state.values
    );

    const HandleChangeLang = (langue) => {
        localStorage.setItem("lang", langue);
        dispatch(setSelectedLang(langue));
    }

    return (
        <>
            <div 
                id="sticky-banner" 
                tabIndex="-1" 
                className="fixed top-0 start-0 z-50 flex justify-between w-full p-4 border-b border-gray-200 bg-blue-50 dark:bg-blue-800 dark:border-blue-600"
            >
                <div className="flex items-center mx-auto">
                    <p className="flex items-center text-sm font-normal text-blue-900 dark:text-white">
                        <span className="inline-flex p-1 me-3 bg-white rounded-full w-6 h-6 items-center justify-center shrink-0">
                            <svg
                                className="w-4 h-4 text-blue-500"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M10 0C4.477 0 0 4.477 0 10c0 5.522 4.477 10 10 10 5.522 0 10-4.478 10-10C20 4.477 15.522 0 10 0zm1 15H9v-2h2v2zm0-4H9V5h2v6z" />
                            </svg>
                            <span className="sr-only">Info</span>
                        </span>
                        <span>
                            {translations[selectedLang].share_content_1} &ensp; 
                            <Link
                                to={frontend_url}
                                className="inline font-medium underline hover:no-underline"
                            >
                                Website Builder
                            </Link> 
                            &ensp; {translations[selectedLang].share_content_2}
                        </span>
                    </p>
                </div>
                <div className="flex items-center">
                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <a 
                        href="#"
                        className="text-white font-medium rounded-md bg-primary hover:bg-secondary flex items-center gap-2 py-1 px-3 cursor-pointer"
                    >
                        <img src={selectedLang == "en" ? "/en.png" : "/fr.png"} width={18} className="inline-block" /> 
                        <span>{selectedLang == "en" ? "EN" : "FR"}</span>
                    </a>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-fit border border-black/10 border-solid ml-2">
                    <DropdownMenuItem
                        onClick={() => HandleChangeLang("en")}
                        className={`cursor-pointer font-medium flex gap-3 ${selectedLang == "en" && "bg-black/15"}`}
                    >
                        <img src="/en.png" width={18} /> En
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => HandleChangeLang("fr")}
                        className={`cursor-pointer font-medium flex gap-3 ${selectedLang == "fr" && "bg-black/15"} `}
                    >
                        <img src="/fr.png" width={18} /> Fr
                    </DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </>
    );
}
