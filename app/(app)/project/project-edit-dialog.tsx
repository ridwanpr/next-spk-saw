"use client"

import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { updateProject } from "@/lib/actions/project-actions"
import { projectSchema, type ProjectInput } from "@/lib/validations/project"
import { ProjectFormFields } from "./project-form-fields"

interface ProjectEditDialogProps {
  project: {
    id: number
    name: string
    description: string
  } | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProjectEditDialog({
  project,
  open,
  onOpenChange,
}: ProjectEditDialogProps) {
  if (!project) return null

  return (
    <ProjectEditDialogContent
      key={project.id}
      project={project}
      open={open}
      onOpenChange={onOpenChange}
    />
  )
}

function ProjectEditDialogContent({
  project,
  open,
  onOpenChange,
}: {
  project: {
    id: number
    name: string
    description: string
  }
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const form = useForm<ProjectInput>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: project.name,
      description: project.description,
    },
  })

  const handleSubmit = (data: ProjectInput) => {
    setError(null)
    startTransition(async () => {
      const res = await updateProject(project.id, data)
      if (!res.success) {
        setError(res.error || "Gagal memperbarui proyek")
        return
      }
      onOpenChange(false)
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <DialogHeader>
            <DialogTitle>Ubah Proyek</DialogTitle>
            <DialogDescription>
              Perbarui nama dan deskripsi untuk proyek ini.
            </DialogDescription>
          </DialogHeader>

          {error && (
            <p className="mt-2 text-sm font-medium text-destructive">{error}</p>
          )}

          <div className="mt-4">
            <ProjectFormFields
              control={form.control}
              idPrefix={`edit-project-${project.id}`}
            />
          </div>

          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Batal
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ProjectEditDialog
