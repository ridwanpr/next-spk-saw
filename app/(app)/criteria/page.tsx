import { Suspense } from "react"
import CriteriaList from "./criteria-list"
import CriteriaListSkeleton from "./criteria-list-skeleton"
import CriteriaCreate from "./criteria-create"

const Criteria = async () => {
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
          <Suspense fallback={<CriteriaListSkeleton />}>
            <CriteriaList />
          </Suspense>
        </div>
        <div className="col-span-12 md:col-span-6">
          <CriteriaCreate />
        </div>
      </div>
    </div>
  )
}

export default Criteria
