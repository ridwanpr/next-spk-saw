import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function CripsLoading() {
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
          <Card>
            <CardHeader>
              <CardTitle>Daftar Kriteria</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border-t border-accent p-4"
                >
                  <div className="flex items-center gap-4">
                    <Skeleton className="size-9 rounded-lg" />
                    <div className="space-y-1.5">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="mr-2 h-4 w-10" />
                    <Skeleton className="h-8 w-18 rounded-md" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="col-span-12 md:col-span-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border border-t border-border">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-6 py-3.5"
                  >
                    <div className="flex items-center gap-3">
                      <Skeleton className="size-7 rounded-md" />
                      <Skeleton className="h-4 w-28" />
                    </div>
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-5 w-16 rounded-md" />
                      <Skeleton className="size-8 rounded-md" />
                      <Skeleton className="size-8 rounded-md" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 border-t border-border px-6 pt-4 pb-6">
                <Skeleton className="h-5 w-36" />
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-9 w-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-9 w-full" />
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <Skeleton className="h-9 w-20" />
                  <Skeleton className="h-9 w-28" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
