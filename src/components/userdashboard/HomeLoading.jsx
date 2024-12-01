import { Skeleton } from "../ui/skeleton";

export default function HomeLoading(){
    return <>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="rounded-lg bg-card border border-black/20 shadow-sm">
          <div className="p-6 space-y-4">
            <Skeleton className="h-7 w-3/4" />
            
            <Skeleton className="h-4 w-full" />
            
            <Skeleton className="h-[200px] w-full rounded-md" />
            
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </div>
      ))}
    </>
}