import { Palette } from "lucide-react";

export default function PanelStyles(){
    return <>
        <div className="w-64 bg-white border-l rounded-2xl pt-2 px-2">
            <div className="flex  text-sm font-medium items-center bg-black gap-2 py-2 px-4 rounded-3xl text-white">
                <Palette className="size-5 mt-[1px]"/> Styles et Composants
            </div>
            <div className="p-4 max-h-[440px] relative overflow-y-scroll mt-2 mb-3" >
                <div className="flex mb-4">
                <div id="blocks" className="gjs-blocks-c"></div>
                </div>
                <div id="styles"></div>
            </div>
        </div>
    </>
}