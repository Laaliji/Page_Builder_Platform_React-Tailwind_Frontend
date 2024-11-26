import { File } from "lucide-react";

export default function Page({title}){
    return <>
        <div className="hover:bg-secondary w-48 rounded-3xl cursor-pointer flex items-center gap-2 bg-primary text-white py-[7px] pl-4">
            <File className="size-5 mt-[1px]" /> {title}
        </div>
    </>
}