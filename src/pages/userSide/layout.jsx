import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { links2 } from "@/lib/navigationConfig";
import { Search } from "lucide-react";
import { Outlet, useLocation } from "react-router-dom";

export default function UserDashBoardLayout() {
  const location = useLocation(); 
  return <>
    <SidebarProvider>
        <AppSidebar pathname={location.pathname}/>
        <SidebarInset>
            <header
            className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex flex-row items-center gap-2 px-4 w-full">
                <SidebarTrigger className="-ml-1" />
                <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href="#">
                            Table de Bord
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{links2.find((link)=> (location.pathname).includes(link.value)).label}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
                </Breadcrumb>
                <div className="relative ml-auto">
                    <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                    <Input type="search" id="search" placeholder="Recherche..." className="pl-8 py-1 w-56" />
                </div>
            </div>
            </header>
            <div className="flex flex-1 flex-col gap-5 p-4 pt-0">
                <div className="min-h-[100vh] px-5 pt-3 flex-1 rounded-xl bg-muted/90 md:min-h-min" >
                    <Outlet />
                </div>
            </div>
        </SidebarInset>
        </SidebarProvider>
    </>
}
