import { Plus } from "lucide-react";

export default function AddPage(){
    return  <div className="hover:bg-secondary w-48 rounded-3xl cursor-pointer flex items-center justify-center gap-2 bg-primary text-white py-[7px]">
                <div className="p-[1px] bg-white rounded-full">
                    <Plus className="size-5 font-extrabold mt-[1px] text-primary"/>
                </div>
            </div>
    
}