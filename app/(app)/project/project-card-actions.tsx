"use client"

import { useState, useTransition } from "react"
import { MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel } from "@/components/ui/field"
import { updateProject, deleteProject } from "@/lib/actions/project-actions"

interface ProjectCardActionsProps {
  project: {
    id: number
    name: string
    description: string
  }
}

export const ProjectCardActions = ({ project }: ProjectCardActionsProps) => {
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [isPending, startTransition] = useTransition()

  const [name, setName] = useState(project.name)
  const [description, setDescription] = useState(project.description)
  const [error, setError] = useState<string | null>(null)

  const handleUpdate = (e: React.SubmitEvent) => {
    e.preventDefault()
    setError(null)

    startTransition(async () => {
      const res = await updateProject(project.id, { name, description })
      if (!res.success) {
        setError(res.error || "Gagal memperbarui proyek")
        return
      }
      setOpenEdit(false)
    })
  }

  const handleDelete = () => {
    setError(null)

    startTransition(async () => {
      const res = await deleteProject(project.id)
      if (!res.success) {
        setError("Gagal menghapus proyek")
        return
      }
      setOpenDelete(false)
    })
  }

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

      {/* Edit Dialog */}
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent>
          <form onSubmit={handleUpdate} className="flex flex-col gap-4">
            <DialogHeader>
              <DialogTitle>Ubah Proyek</DialogTitle>
              <DialogDescription>
                Perbarui nama dan deskripsi untuk proyek ini.
              </DialogDescription>
            </DialogHeader>

            {error && (
              <p className="text-sm font-medium text-destructive">{error}</p>
            )}

            <Field>
              <FieldLabel htmlFor={`name-${project.id}`}>
                Nama Proyek
              </FieldLabel>
              <Input
                id={`name-${project.id}`}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama proyek"
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor={`desc-${project.id}`}>Deskripsi</FieldLabel>
              <Input
                id={`desc-${project.id}`}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Deskripsi singkat proyek"
                required
              />
            </Field>

            <DialogFooter className="mt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpenEdit(false)}
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

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus Proyek?</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus proyek{" "}
              <span className="font-semibold text-foreground">
                &ldquo;{project.name}&rdquo;
              </span>
              ? Tindakan ini permanen dan akan menghapus semua kriteria serta
              alternatif di dalamnya.
            </DialogDescription>
          </DialogHeader>

          {error && (
            <p className="text-sm font-medium text-destructive">{error}</p>
          )}

          <DialogFooter className="mt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpenDelete(false)}
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
    </>
  )
}
