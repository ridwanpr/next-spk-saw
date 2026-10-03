import { Suspense } from "react"
import CripsCreate from "./crips-create"
import CripsList from "./crips-list"
import CripsListSkeleton from "./crips-list-skeleton"

const Crips = () => {
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

      <div className="min-h-vh grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-5">
          <Suspense fallback={<CripsListSkeleton />}>
            <CripsList />
          </Suspense>
        </div>
        <div className="col-span-12 md:col-span-7">
          <CripsCreate />
        </div>
      </div>
    </div>
  )
}

export default Crips
