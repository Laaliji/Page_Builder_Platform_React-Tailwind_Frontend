import { Skeleton } from "@/components/ui/skeleton"

export default function ToolbarLoading() {
  return (
    <div className="w-full overflow-hidden bg-white py-[9px] flex flex-row items-center border-b-[1px] border-black/15 border-solid">
      <div className="ml-3 flex items-center gap-5">
        <Skeleton className="h-[30px] w-[30px] rounded-md" />
        
        <div className="flex items-center gap-4">
          <Skeleton className="h-5 w-[120px]" />
          
          <Skeleton className="h-8 w-8 rounded-full" />
          
          <div className="relative -ml-10">
            <hr className="w-20 rotate-[60deg] absolute top-[-35px] opacity-20" />
            <hr className="w-20 -rotate-[60deg] absolute bottom-[-35px] opacity-20" />
          </div>
          
          <Skeleton className="h-9 w-[200px] ml-16" />
        </div>
      </div>

      <div className="ml-auto mr-3 flex items-center gap-2">
        <Skeleton className="h-9 w-[120px]" />

        <Skeleton className="h-9 w-9" />
        <Skeleton className="h-9 w-[100px]" />
        <Skeleton className="h-9 w-[100px]" />
        <Skeleton className="h-9 w-[100px]" />
      </div>
    </div>
  )
}

