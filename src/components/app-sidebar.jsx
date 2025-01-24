import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Home,
  LogOut,
  Map,
  PanelsTopLeft,
  PieChart,
  Settings2,
  SquareTerminal,
  User,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import SidebarItem from "./userdashboard/SideBarItem"
import { Link, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import translations from "@/locale/translations"


const data = {
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
}



export function AppSidebar({ pathname,...props }) {
  
  const { selectedLang } = useSelector(
    (state) => state.values
  );

  const links = [
    { label : translations[selectedLang].Acceuil , value : 'home' , icon : <Home size='17'/> },
    { label : translations[selectedLang].Projets , value : 'projects' , icon : <PanelsTopLeft size='17'/> },
    { label : translations[selectedLang].Profile , value : 'account' , icon : <User size='17'/> },
  ]

  return (
    (<Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <div className="p-4 flex flex-col gap-3">
          {
            links.map((link,idx) => <>
              <Link to={`/dash/user/${link.value}`}>
                <SidebarItem className={pathname.includes(link.value) ? 'bg-[#4794c6] text-white hover:bg-[#61a4d1]' : 'bg-white/75 text-black/70 hover:bg-white'} icon={link.icon} title={link.label} key={idx}/> 
              </Link>
            </>)
          }
          <SidebarItem icon={<LogOut size='18'/>} title={translations[selectedLang].Déconnexion} />
        </div>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>)
  );
}
