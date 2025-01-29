import "./globals.css";
import { AppSidebar } from "@/components/admin/dash/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Search from "@/components/admin/dash/Search";
import UserNav from "@/components/admin/dash/user-nav";
// import { CalendarDateRangePicker } from "@/components/admin/date-range-picker";
import { Outlet } from "react-router-dom";
import config from "../../template/config/index.json";

export function Layout({ children }) {
  const { navigation, company, callToAction } = config;
  const { name: companyName, logo } = company;
  return (
    <SidebarProvider>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b">
          <div className="flex items-center gap-2 px-4 w-full">
            <Breadcrumb>
              <a href="#">
                <span className="sr-only">{companyName}</span>
                <img alt="logo" className="h-9 w-auto sm:h-9" src={logo} />
              </a>
            </Breadcrumb>
            <div className="ml-auto flex items-center space-x-4">
              <UserNav />
            </div>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 pt-2">
          {children || <Outlet />}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default Layout;
