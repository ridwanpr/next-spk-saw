import { getProjectCriteria } from "@/lib/data/criteria"
import { requireActiveProject } from "@/lib/data/project"
import { requireAuth } from "@/lib/data/session"
import AlternativeList from "./alternative-list"
import AlternativeCreateDialog from "./alternative-create-dialog"

const Alternative = async () => {
  const session = await requireAuth()
  const activeProject = await requireActiveProject(session.userId)
  const criterias = await getProjectCriteria(activeProject.id)

  if (
    !criterias ||
    criterias.length === 0 ||
    criterias.some((c) => c.crips.length === 0)
  ) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">
              Kelola Alternatif
            </h1>
            <p className="text-sm text-muted-foreground">
              Tambah, edit atau hapus data alternatif
            </p>
          </div>
        </div>

        <div className="flex min-h-60 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <p className="text-sm text-muted-foreground">
            Data kriteria atau skala nilai belum lengkap. Silahkan lengkapi
            terlebih dahulu.
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">
              Kelola Alternatif
            </h1>
            <p className="text-sm text-muted-foreground">
              Tambah, edit atau hapus data alternatif
            </p>
          </div>
          <div>
            <AlternativeCreateDialog criterias={criterias} />
          </div>
        </div>

        <div>
          <AlternativeList />
        </div>
      </div>
    </>
  )
}

export default Alternative
