import { requireAuth } from "@/lib/data/session"
import { requireActiveProject } from "@/lib/data/project"
import { getProjectCriteria } from "@/lib/data/criteria"
import { getCripsCriteria } from "@/lib/data/crips"
import { CripsCriteriaSelector } from "./crips-criteria-selector"
import { CripsScaleManager } from "./crips-scale-manager"

interface PageProps {
  searchParams: Promise<{ criteriaId?: string }>
}

const Crips = async ({ searchParams }: PageProps) => {
  const { criteriaId } = await searchParams
  const session = await requireAuth()
  const activeProject = await requireActiveProject(session.userId)
  const criterias = await getProjectCriteria(activeProject.id)

  if (!criterias || criterias.length === 0) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">
              Skala Nilai
            </h1>
            <p className="text-sm text-muted-foreground">
              Tambah, edit atau hapus skala nilai <em>(crips)</em>.
            </p>
          </div>
        </div>

        <div className="flex min-h-60 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <p className="text-sm text-muted-foreground">
            Belum ada kriteria yang ditambahkan. Silakan tambahkan kriteria
            terlebih dahulu.
          </p>
        </div>
      </div>
    )
  }

  // Default to first criteria if no selection is made in searchParams
  const selectedCriteria =
    criterias.find((c) => String(c.id) === criteriaId) ?? criterias[0]

  const criteriaCrips = await getCripsCriteria(selectedCriteria.id)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Skala Nilai</h1>
          <p className="text-sm text-muted-foreground">
            Tambah, edit atau hapus skala nilai <em>(crips)</em>.
          </p>
        </div>
      </div>

      <div className="min-h-vh grid grid-cols-12 gap-5">
        <div className="col-span-12 md:col-span-6">
          <CripsCriteriaSelector
            criterias={criterias}
            selectedCriteriaId={selectedCriteria?.id}
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <CripsScaleManager
            key={selectedCriteria.id}
            selectedCriteria={selectedCriteria}
            criteriaCrips={criteriaCrips}
          />
        </div>
      </div>
    </div>
  )
}

export default Crips
