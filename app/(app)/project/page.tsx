import { requireAuth } from "@/lib/data/session"
import { getProjects, getActiveProject } from "@/lib/data/project"
import { CreateProjectDialog } from "./create-project-dialog"
import { ProjectList } from "./project-list"

interface ProjectProps {
  searchParams: Promise<{ error?: string }>
}

const Project = async ({ searchParams }: ProjectProps) => {
  const { error } = await searchParams
  const session = await requireAuth()
  const [projects, activeProject] = await Promise.all([
    getProjects(session.userId),
    getActiveProject(session.userId),
  ])

  return (
    <div className="flex flex-col gap-6">
      {error && (
        <div className="rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">
            Daftar Proyek
          </h1>
          <p className="text-sm text-muted-foreground">
            Pilih atau buat proyek baru untuk mulai mengevaluasi dan menentukan
            keputusan.
          </p>
        </div>
        <CreateProjectDialog />
      </div>

      <ProjectList projects={projects} activeProject={activeProject} />
    </div>
  )
}

export default Project
