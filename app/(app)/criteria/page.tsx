import { requireAuth } from "@/lib/data/session"
import { requireActiveProject } from "@/lib/data/project"
import { getProjectCriteria } from "@/lib/data/criteria"
import { CriteriaList } from "./criteria-list"
import { CriteriaCreateCard } from "./criteria-create-card"

const Criteria = async () => {
  const session = await requireAuth()
  const activeProject = await requireActiveProject(session.userId)
  const criterias = await getProjectCriteria(activeProject.id)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Kriteria</h1>
          <p className="text-sm text-muted-foreground">
            Tambah, edit atau hapus kriteria.
          </p>
        </div>
      </div>

      <div className="min-h-vh grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-6">
          <CriteriaList criterias={criterias} />
        </div>
        <div className="col-span-12 md:col-span-6">
          <CriteriaCreateCard />
        </div>
      </div>
    </div>
  )
}

export default Criteria
