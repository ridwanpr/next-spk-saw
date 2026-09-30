import { requireAuth } from "@/lib/data/session"
import { getProjects, getActiveProject } from "@/lib/data/project"
import AppHeader from "@/components/app-header"
import AppSidebar from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await requireAuth()
  const projects = await getProjects(session.userId)
  const activeProject = await getActiveProject(session.userId)

  return (
    <SidebarProvider>
      <AppSidebar
        variant="inset"
        projects={projects}
        activeProject={activeProject}
      />
      <SidebarInset>
        <AppHeader />
        <main className="flex flex-col p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default AppLayout
