import { PanelsTopLeft } from "lucide-react";
import Page from "./Page";
import AddPage from "./AddPage";

export default function PanelFiles(){
    return <>
        <div className="w-64 bg-white border-r rounded-3xl pt-2 px-2">
          <div className="flex  text-sm font-medium items-center bg-black gap-2 py-2 px-4 rounded-3xl text-white">
            <PanelsTopLeft className="size-5 mt-[1px]"/> Project Name
          </div>
          <div className="flex">
            <div className="bg-black/60 w-[3px] h-[180px] ml-6 absolute"></div>
            <div className="flex flex-col gap-2 mt-3 z-30 ml-2">
                <Page title="home" />
                <Page title="contact" />
                <Page title="aboute" />
                <Page title="test" />
                <AddPage />
            </div>
          </div>
          
        </div>
    </>
}