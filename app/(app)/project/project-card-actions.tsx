"use client"

import { useState } from "react"
import { MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ProjectEditDialog } from "./project-edit-dialog"
import { ProjectDeleteDialog } from "./project-delete-dialog"

interface ProjectCardActionsProps {
  project: {
    id: number
    name: string
    description: string
  }
}

export function ProjectCardActions({ project }: ProjectCardActionsProps) {
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8">
            <MoreVertical className="size-4" />
            <span className="sr-only">Menu proyek</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setOpenEdit(true)}>
            Ubah Detail
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setOpenDelete(true)}
            className="text-destructive focus:text-destructive"
          >
            Hapus Proyek
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ProjectEditDialog
        project={project}
        open={openEdit}
        onOpenChange={setOpenEdit}
      />

      <ProjectDeleteDialog
        project={project}
        open={openDelete}
        onOpenChange={setOpenDelete}
      />
    </>
  )
}

export default ProjectCardActions
