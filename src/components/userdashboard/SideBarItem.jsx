export default function SidebarItem({ icon,title,className }){
    return <div className={`flex  border border-black/10  items-center gap-2 px-2 py-2  rounded-md shadow-sm cursor-pointer ${className}`}>
        {icon} <span>{title}</span>
    </div>
}