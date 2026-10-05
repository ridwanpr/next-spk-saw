"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { deleteProject } from "@/lib/actions/project-actions"

interface ProjectDeleteDialogProps {
  project: {
    id: number
    name: string
  } | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProjectDeleteDialog({
  project,
  open,
  onOpenChange,
}: ProjectDeleteDialogProps) {
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  if (!project) return null

  const handleDelete = () => {
    setError(null)
    startTransition(async () => {
      const res = await deleteProject(project.id)
      if (!res.success) {
        setError("Gagal menghapus proyek")
        return
      }
      onOpenChange(false)
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Hapus Proyek?</DialogTitle>
          <DialogDescription className="pt-2 text-foreground">
            Apakah Anda yakin ingin menghapus proyek{" "}
            <span className="font-semibold text-foreground">
              &ldquo;{project.name}&rdquo;
            </span>
            ? Tindakan ini bersifat permanen dan akan menghapus semua kriteria
            serta alternatif di dalamnya.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <p className="text-sm font-medium text-destructive">{error}</p>
        )}

        <DialogFooter className="mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Batal
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? "Menghapus..." : "Ya, Hapus Proyek"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ProjectDeleteDialog
