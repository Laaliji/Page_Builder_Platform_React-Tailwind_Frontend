import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
export function CanvasSkeleton() {
  return (
    <Skeleton className="h-full w-[95%] bg-white" />
  )
}

export function RightPanelSkeleton() {
  return (
    <div className="w-[25%] h-full bg-background pt-2 px-2 min-w-[300px] border-l border-black/15">
      <Tabs defaultValue="composants" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="composants">Composants</TabsTrigger>
          <TabsTrigger value="styles">Styles</TabsTrigger>
          <TabsTrigger value="page">Page</TabsTrigger>
        </TabsList>

        <TabsContent value="composants" className="mt-4 h-[calc(100vh-120px)]">
          <ScrollArea className="h-full w-full rounded-md p-4">
            <div className="space-y-4">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-4 w-[160px]" />
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="styles" className="mt-4 h-[calc(100vh-120px)]">
          <ScrollArea className="h-full w-full rounded-md p-4">
            <div className="space-y-6">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="space-y-2">
                  <Skeleton className="h-4 w-[140px]" />
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="page" className="mt-4 h-[calc(100vh-120px)]">
          <ScrollArea className="h-full w-full rounded-md p-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-[120px]" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}
