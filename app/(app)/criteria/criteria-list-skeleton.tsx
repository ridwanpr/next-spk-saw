import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const CriteriaListSkeleton = () => {
  return (
    <Card className="pb-1">
      <CardHeader>
        <CardTitle>Daftar Kriteria</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {Array.from({ length: 5 }).map((_, i) => (
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
              <Skeleton className="size-9 rounded-md" />
              <Skeleton className="size-9 rounded-md" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default CriteriaListSkeleton
