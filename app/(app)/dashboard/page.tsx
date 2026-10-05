import { requireAuth } from "@/lib/data/session"
import { requireActiveProject } from "@/lib/data/project"

const Dashboard = async () => {
  const session = await requireAuth()
  const activeProject = await requireActiveProject(session.userId)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Proyek Aktif:{" "}
            <span className="font-medium text-foreground">
              {activeProject.name}
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
