import { getProjectCriteria } from "@/lib/data/criteria"
import CripsCreate from "./crips-create"
import CripsCriteriaList from "./crips-criteria-list"

interface PageProps {
  searchParams: Promise<{ criteriaId?: string }>
}

const Crips = async ({ searchParams }: PageProps) => {
  const { criteriaId } = await searchParams
  const criterias = await getProjectCriteria()

  // default to first criteria
  const selectedCriteria =
    criterias.find((c) => String(c.id) === criteriaId) ?? criterias[0]

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
        <div className="col-span-12 md:col-span-5">
          <CripsCriteriaList
            criterias={criterias}
            selectedCriteriaId={selectedCriteria?.id}
          />
        </div>
        <div className="col-span-12 md:col-span-7">
          <CripsCreate selectedCriteria={selectedCriteria} />
        </div>
      </div>
    </div>
  )
}

export default Crips
