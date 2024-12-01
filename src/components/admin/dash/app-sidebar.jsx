import * as React from "react";
import {
  BookOpen,
  MessageSquare,
  Layout,
  Users,
  Settings2,
  Frame,
  PieChart,
  Map,
  GalleryVerticalEnd,
  Command,
  AudioWaveform,
  BarChartHorizontal,
  UserCheck,
  TrendingUp,
  DollarSign,
} from "lucide-react";

import { NavMain } from "@/components/admin/dash/nav-main";
import { NavProjects } from "@/components/admin/dash/nav-projects";
import { NavUser } from "@/components/admin/dash/nav-user";
import { TeamSwitcher } from "@/components/admin/dash/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
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
  navMain: [
    {
      title: "Gestion Commentaires",
      url: "#",
      icon: MessageSquare,
      items: [
        { title: "Tous les Commentaires", url: "/RecentComments#" },
        { title: "Commentaires Modérés", url: "#" },
      ],
    },
    {
      title: "Gestion Templates",
      url: "#",
      icon: Layout,
      items: [
        { title: "Tous les Templates", url: "#" },
        { title: "Nouveau Template", url: "#" },
      ],
    },
    {
      title: "Clients",
      url: "#",
      icon: Users,
      items: [{ title: "Liste des Clients", url: "#" }],
    },
  ],
  projects: [
    { name: "Visiteurs", url: "#", icon: UserCheck },
    { name: "Conversions", url: "#", icon: TrendingUp },
    { name: "Revenus", url: "#", icon: DollarSign },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
