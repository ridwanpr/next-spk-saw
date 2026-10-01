import { Suspense } from "react"
import { CreateProjectDialog } from "./create-project-dialog"
import { ProjectList } from "./project-list"
import { ProjectListSkeleton } from "./project-list-skeleton"

interface ProjectProps {
  searchParams: Promise<{ error?: string }>
}

const Project = async ({ searchParams }: ProjectProps) => {
  const { error } = await searchParams

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

      <Suspense fallback={<ProjectListSkeleton />}>
        <ProjectList />
      </Suspense>
    </div>
  )
}

export default Project
