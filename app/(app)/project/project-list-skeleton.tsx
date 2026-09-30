import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export function ProjectListSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i} className="flex flex-col justify-between">
          <CardHeader className="space-y-2">
            <div className="h-5 w-2/3 animate-pulse rounded bg-muted" />
            <div className="h-3 w-1/3 animate-pulse rounded bg-muted" />
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="h-4 w-full animate-pulse rounded bg-muted" />
            <div className="h-4 w-4/5 animate-pulse rounded bg-muted" />
          </CardContent>
          <CardFooter className="border-t pt-4">
            <div className="h-8 w-28 animate-pulse rounded bg-muted" />
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
