import { ThemeToggle } from "./theme-toggle"
import { Separator } from "./ui/separator"
import { SidebarTrigger } from "./ui/sidebar"

const AppHeader = () => {
  return (
    <header className="border-b">
      <div className="flex w-full items-center gap-1 px-4 py-1 lg:gap-2 lg:px-6 lg:py-2">
        <SidebarTrigger />
        <Separator orientation="vertical" className="mx-2" />
        <h1 className="text-base font-medium">Dashboard</h1>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

export default AppHeader
