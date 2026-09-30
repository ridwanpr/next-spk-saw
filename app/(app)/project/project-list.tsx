import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { requireAuth } from "@/lib/data/session"
import { getProjects, getActiveProject } from "@/lib/data/project"
import { setActiveProject } from "@/lib/actions/project-actions"
import { ProjectCardActions } from "./project-card-actions"

export async function ProjectList() {
  const session = await requireAuth()
  const [projects, activeProject] = await Promise.all([
    getProjects(session.userId),
    getActiveProject(session.userId),
  ])

  if (projects.length === 0) {
    return (
      <div className="flex min-h-60 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
        <p className="text-sm text-muted-foreground">
          Belum ada proyek yang dibuat.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => {
        const isActive = project.id === activeProject?.id

        return (
          <Card
            key={project.id}
            className={`flex flex-col justify-between transition-all hover:border-primary/50 ${
              isActive
                ? "border-primary bg-primary/10 shadow-sm ring-1 ring-primary dark:bg-primary/30 dark:ring-primary/60"
                : ""
            }`}
          >
            <CardHeader className="space-y-1">
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <CardTitle className="line-clamp-1 text-base">
                    {project.name}
                  </CardTitle>
                  <span className="font-mono text-xs text-muted-foreground">
                    /{project.slug}
                  </span>
                </div>

                <ProjectCardActions project={project} />
              </div>
            </CardHeader>

            <CardContent>
              <CardDescription className="line-clamp-2 text-sm">
                {project.description}
              </CardDescription>
            </CardContent>

            <CardFooter className="flex items-center justify-between border-t pt-4">
              {isActive ? (
                <Badge variant="secondary" className="text-xs">
                  Sedang Aktif
                </Badge>
              ) : (
                <div />
              )}

              <form
                action={async () => {
                  "use server"
                  await setActiveProject(project.id, "/dashboard")
                }}
              >
                <Button
                  size="sm"
                  type="submit"
                  variant={isActive ? "outline" : "default"}
                >
                  Buka Proyek
                  <ExternalLink className="ml-1.5 size-3.5" />
                </Button>
              </form>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}
