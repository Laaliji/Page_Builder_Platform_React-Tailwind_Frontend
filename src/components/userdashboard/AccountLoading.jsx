import { Card, CardContent, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function AccountLoading() {
  return (
    <>
      <div className="grid gap-6 overflow-y-scroll max-h-screen hiddenScroll">
        <div className="grid gap-6">
          <Card className="border border-black/20 shadow-sm">
            <CardHeader>
              <Skeleton className="h-5 w-[150px] mb-2" />
              <Skeleton className="h-4 w-[200px]" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Skeleton className="h-24 w-24 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-3 w-[150px]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-black/20 shadow-sm">
            <CardHeader>
              <Skeleton className="h-5 w-[200px] mb-2" />
              <Skeleton className="h-4 w-[250px]" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Skeleton className="h-4 w-[100px] mb-2" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div>
                  <Skeleton className="h-4 w-[100px] mb-2" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
              <div>
                <Skeleton className="h-4 w-[100px] mb-2" />
                <div className="flex gap-4">
                  <Skeleton className="h-10 flex-grow" />
                  <Skeleton className="h-10 w-[150px]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-black/20 shadow-sm">
            <CardHeader>
              <Skeleton className="h-5 w-[150px] mb-2" />
              <Skeleton className="h-4 w-[200px]" />
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-9 w-[120px] ml-auto" />
            </CardContent>
          </Card>

          <Card className="border border-black/20 shadow-sm">
            <CardHeader>
              <Skeleton className="h-5 w-[150px] mb-2" />
              <Skeleton className="h-4 w-[200px]" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Skeleton className="h-4 w-[150px] mb-2" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div>
                <Skeleton className="h-4 w-[150px] mb-2" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div>
                <Skeleton className="h-4 w-[200px] mb-2" />
                <Skeleton className="h-10 w-full" />
              </div>
              <Skeleton className="h-10 w-[200px]" />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
