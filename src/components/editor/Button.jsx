export default function Button({ title,icon,className }){
    return <>
        <button className={`text-sm font-medium  flex items-center gap-2 rounded-md pt-[6px] pb-2 px-5 ${className}`}>
            {icon} <span className="-mt-[1px]">{title}</span> 
        </button> 
    </>
}