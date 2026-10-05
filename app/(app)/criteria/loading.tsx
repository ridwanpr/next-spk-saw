import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function CriteriaLoading() {
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
          <Card className="pb-1">
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
                    <Skeleton className="size-8 rounded-md" />
                    <Skeleton className="size-8 rounded-md" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="col-span-12 md:col-span-6">
          <Card>
            <CardHeader>
              <CardTitle>Tambah Kriteria</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-9 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-9 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-9 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-9 w-full" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
