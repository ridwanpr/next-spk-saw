import { ExternalLink, MoreVertical, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { requireAuth } from "@/lib/data/session"
import { getProjects, getActiveProject } from "@/lib/data/project"
import { setActiveProject } from "@/lib/actions/project-actions"

const Project = async () => {
  const session = await requireAuth()
  const projects = await getProjects(session.userId)
  const activeProject = await getActiveProject(session.userId)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">
            Daftar Proyek
          </h1>
          <p className="text-sm text-muted-foreground">
            Pilih atau buat proyek baru untuk kalkulasi Simple Additive
            Weighting.
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="size-4" />
          Proyek Baru
        </Button>
      </div>

      {projects.length === 0 ? (
        <div className="flex min-h-60 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <p className="text-sm text-muted-foreground">
            Belum ada proyek yang dibuat.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => {
            const isActive = project.id === activeProject?.id

            return (
              <Card
                key={project.id}
                className={`flex flex-col justify-between transition-all hover:border-primary/50 ${
                  isActive ? "border-primary bg-primary/5" : ""
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

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                          <MoreVertical className="size-4" />
                          <span className="sr-only">Menu proyek</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Ubah Detail</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive focus:text-destructive">
                          Hapus Proyek
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
      )}
    </div>
  )
}

export default Project
