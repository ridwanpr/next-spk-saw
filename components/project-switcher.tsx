"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Check, ChevronsUpDown, FolderKanban, Plus } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar"
import { setActiveProject } from "@/lib/actions/project-actions"
import type { getProjects, getActiveProject } from "@/lib/data/project"

export interface ProjectSwitcherProps {
  projects: Awaited<ReturnType<typeof getProjects>>
  activeProject: Awaited<ReturnType<typeof getActiveProject>>
}

const ProjectSwitcher = ({ projects, activeProject }: ProjectSwitcherProps) => {
  const { isMobile } = useSidebar()
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleSelect = (projectId: number) => {
    startTransition(async () => {
      await setActiveProject(projectId)
      router.refresh()
    })
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              disabled={isPending}
              className="hover:bg-sidebar-accent/50 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary font-semibold text-primary-foreground">
                <FolderKanban className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeProject ? activeProject.name : "Pilih Proyek"}
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  SPK Metode SAW
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4 text-muted-foreground" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            sideOffset={4}
            side={isMobile ? "bottom" : "right"}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Daftar Proyek
            </DropdownMenuLabel>

            {projects.length === 0 ? (
              <div className="p-2 text-xs text-muted-foreground">
                Tidak ada proyek ditemukan
              </div>
            ) : (
              projects.map((project) => {
                const isSelected = activeProject?.id === project.id

                return (
                  <DropdownMenuItem
                    key={project.id}
                    onClick={() => handleSelect(project.id)}
                    className="flex cursor-pointer items-center justify-between gap-2 p-2"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <div className="flex size-6 items-center justify-center rounded-sm border bg-muted">
                        <FolderKanban className="size-3.5" />
                      </div>
                      <span
                        className={
                          isSelected
                            ? "font-semibold"
                            : "font-medium text-muted-foreground"
                        }
                      >
                        {project.name}
                      </span>
                    </div>
                    {isSelected && <Check className="size-4 text-primary" />}
                  </DropdownMenuItem>
                )
              })
            )}

            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="cursor-pointer gap-2 p-2">
              <Link href="/project">
                <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                  <Plus className="size-4" />
                </div>
                <div className="font-medium text-muted-foreground">
                  Kelola Semua Proyek
                </div>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

export default ProjectSwitcher
