import { requireAuth } from "@/lib/data/session"
import AppHeader from "@/components/app-header"
import AppSidebar from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  await requireAuth()

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <AppHeader />
        <main className="flex flex-col p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default AppLayout
