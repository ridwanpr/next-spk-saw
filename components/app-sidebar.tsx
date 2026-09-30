"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Award,
  Building2,
  FileSpreadsheet,
  FolderKanban,
  LayoutDashboard,
  ListTree,
  SlidersHorizontal,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar"
import ProjectSwitcher from "./project-switcher"

const masterNavigation = [
  {
    title: "Beranda",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Proyek",
    url: "/project",
    icon: FolderKanban,
  },
]

const dataPreparationMenu = [
  {
    title: "Kriteria",
    url: "/kriteria",
    icon: SlidersHorizontal,
  },
  {
    title: "Crips / Nilai Skala",
    url: "/crips",
    icon: ListTree,
  },
  {
    title: "Data Alternatif",
    url: "/alternatif",
    icon: Building2,
  },
  {
    title: "Input Nilai Alternatif",
    url: "/nilai-alternatif",
    icon: FileSpreadsheet,
  },
]

const calculationMenu = [
  {
    title: "Hasil & Perangkingan",
    url: "/perangkingan",
    icon: Award,
  },
]

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const pathname = usePathname()

  const checkIsActive = (url: string) => {
    return (
      pathname === url ||
      (url !== "/dashboard" && pathname.startsWith(`${url}/`))
    )
  }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="border-b border-sidebar-border pb-3">
        <ProjectSwitcher />
      </SidebarHeader>

      <SidebarContent className="gap-2 px-2 pt-2">
        <SidebarGroup className="p-0 pt-2">
          <SidebarMenu>
            {masterNavigation.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  size="default"
                  asChild
                  isActive={checkIsActive(item.url)}
                >
                  <Link href={item.url}>
                    <item.icon className="size-4" />
                    <span className="font-medium">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup className="p-0 pt-2">
          <SidebarGroupLabel className="text-xs tracking-wider text-muted-foreground uppercase">
            Data Preparation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {dataPreparationMenu.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    size="default"
                    asChild
                    isActive={checkIsActive(item.url)}
                  >
                    <Link href={item.url}>
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="p-0 pt-2">
          <SidebarGroupLabel className="text-xs tracking-wider text-muted-foreground uppercase">
            Kalkulasi SAW
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {calculationMenu.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    size="default"
                    asChild
                    isActive={checkIsActive(item.url)}
                  >
                    <Link href={item.url}>
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default AppSidebar
