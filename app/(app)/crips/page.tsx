import { getProjectCriteria } from "@/lib/data/criteria"
import CripsCreate from "./crips-create"
import CripsCriteriaList from "./crips-criteria-list"
import { getCripsCriteria } from "@/lib/data/crips"

interface PageProps {
  searchParams: Promise<{ criteriaId?: string }>
}

const Crips = async ({ searchParams }: PageProps) => {
  const { criteriaId } = await searchParams
  const criterias = await getProjectCriteria()

  if (!criterias || criterias.length === 0) {
    return (
      <div className="p-6 text-center text-sm text-muted-foreground">
        Belum ada kriteria yang ditambahkan.
      </div>
    )
  }

  // default to first criteria
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
          <CripsCriteriaList
            criterias={criterias}
            selectedCriteriaId={selectedCriteria?.id}
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <CripsCreate
            selectedCriteria={selectedCriteria}
            criteriaCrips={criteriaCrips}
          />
        </div>
      </div>
    </div>
  )
}

export default Crips
