"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  ClipboardPen,
  Folder,
  Home,
  LogOut,
  Ruler,
  Scale,
  Trophy,
  User,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar"
import ProjectSwitcher from "./project-switcher"
import { logoutUser } from "@/lib/actions/auth-actions"

type AppSidebarProps = React.ComponentProps<typeof Sidebar> &
  React.ComponentProps<typeof ProjectSwitcher>

const masterNavigation = [
  {
    title: "Proyek",
    url: "/project",
    icon: Folder,
  },
]

const dataPreparationMenu = [
  {
    title: "Beranda",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Kriteria",
    url: "/criteria",
    icon: Scale,
  },
  {
    title: "Skala Nilai",
    url: "/crips",
    icon: Ruler,
  },
  {
    title: "Kelola Alternatif",
    url: "/alternative",
    icon: ClipboardPen,
  },
]

const calculationMenu = [
  {
    title: "Hasil & Perangkingan",
    url: "/perangkingan",
    icon: Trophy,
  },
]

const AppSidebar = ({ projects, activeProject, ...props }: AppSidebarProps) => {
  const pathname = usePathname()

  const checkIsActive = (url: string) => {
    return (
      pathname === url || (url !== "/project" && pathname.startsWith(`${url}/`))
    )
  }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="border-b border-sidebar-border pb-3">
        <ProjectSwitcher projects={projects} activeProject={activeProject} />
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

        {activeProject && (
          <>
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
          </>
        )}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="default"
              asChild
              isActive={checkIsActive("/profile")}
            >
              <Link href="/profile">
                <User className="size-4" />
                <span>Profil</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <form action={logoutUser} className="w-full">
              <SidebarMenuButton
                size="default"
                type="submit"
                className="w-full cursor-pointer text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                <LogOut className="size-4" />
                <span>Keluar</span>
              </SidebarMenuButton>
            </form>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar
