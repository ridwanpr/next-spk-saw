"use client"

import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { createProject } from "@/lib/actions/project-actions"
import { projectSchema, type ProjectInput } from "@/lib/validations/project"
import { ProjectFormFields } from "./project-form-fields"

export function CreateProjectDialog() {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const form = useForm<ProjectInput>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  })

  const handleSubmit = (data: ProjectInput) => {
    setError(null)
    startTransition(async () => {
      const res = await createProject(data)
      if (!res.success) {
        setError(res.error || "Gagal membuat proyek baru")
        return
      }
      form.reset()
      setOpen(false)
    })
  }

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen)
    if (!isOpen) {
      setError(null)
      form.reset()
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="size-4" />
          Proyek Baru
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <DialogHeader>
            <DialogTitle>Buat Proyek Baru</DialogTitle>
            <DialogDescription>
              Tambahkan proyek baru untuk memulai evaluasi dan kalkulasi SPK
              metode SAW.
            </DialogDescription>
          </DialogHeader>

          {error && (
            <p className="mt-2 text-sm font-medium text-destructive">{error}</p>
          )}

          <div className="mt-4">
            <ProjectFormFields
              control={form.control}
              idPrefix="create-project"
            />
          </div>

          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isPending}
            >
              Batal
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Menyimpan..." : "Buat Proyek"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateProjectDialog
