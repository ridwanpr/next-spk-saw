import AppHeader from "@/components/app-header"
import AppSidebar from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const AppLayout = ({ children }: { children: React.ReactNode }) => {
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
