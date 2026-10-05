import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProjectLoading() {
  return (
    <div className="flex flex-col gap-6">
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
        <Skeleton className="h-9 w-32 rounded-md" />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="flex flex-col justify-between">
            <CardHeader className="space-y-2">
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-3 w-1/3" />
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t pt-4">
              <Skeleton className="h-5 w-12 rounded" />
              <Skeleton className="h-8 w-20 rounded-md" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
