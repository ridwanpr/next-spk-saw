"use client"

import { useState, useTransition } from "react"
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
import { Input } from "@/components/ui/input"
import { Field, FieldLabel } from "@/components/ui/field"
import { createProject } from "@/lib/actions/project-actions"

export const CreateProjectDialog = () => {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault()
    setError(null)

    startTransition(async () => {
      const res = await createProject({ name, description })
      if (!res.success) {
        setError(res.error || "Gagal membuat proyek")
        return
      }

      setName("")
      setDescription("")
      setOpen(false)
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="size-4" />
          Proyek Baru
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>Buat Proyek Baru</DialogTitle>
            <DialogDescription>
              Tambahkan proyek baru untuk memulai kalkulasi SPK metode SAW.
            </DialogDescription>
          </DialogHeader>

          {error && (
            <p className="text-sm font-medium text-destructive">{error}</p>
          )}

          <Field>
            <FieldLabel htmlFor="create-name">Nama Proyek</FieldLabel>
            <Input
              id="create-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Seleksi Vendor Server"
              required
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="create-desc">Deskripsi</FieldLabel>
            <Input
              id="create-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Deskripsi singkat tujuan proyek"
              required
            />
          </Field>

          <DialogFooter className="mt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
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
