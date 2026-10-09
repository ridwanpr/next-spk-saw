"use client"

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
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { createAlternative } from "@/lib/actions/alternative-action"
import {
  AlternativeCreate,
  createAlternativeSchema,
} from "@/lib/validations/alternative"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus } from "lucide-react"
import { useState, useTransition } from "react"
import { Controller, useForm } from "react-hook-form"

const AlternativeCreateDialog = () => {
  const [error, setError] = useState<string | null>(null)
  const [open, setOpen] = useState<boolean>(false)
  const [isPending, startTransition] = useTransition()

  const form = useForm<AlternativeCreate>({
    resolver: zodResolver(createAlternativeSchema),
    defaultValues: {
      code: "",
      name: "",
    },
  })

  const onSubmit = (input: AlternativeCreate) => {
    setError(null)
    startTransition(async () => {
      const res = await createAlternative(input)
      if (!res.success) {
        setError(res.error || "Gagal menyimpan data")
        return
      }
      form.reset({ code: "", name: "" })
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
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Alternatif Baru
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Tambah Alternatif Baru</DialogTitle>
          <DialogDescription>
            Masukkan identitas alternatif (kode dan nama).
          </DialogDescription>
        </DialogHeader>

        {error && (
          <p className="text-sm font-medium text-destructive">{error}</p>
        )}

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            name="code"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="code">Kode (Ai)</FieldLabel>
                <Input {...field} id="code" placeholder="E.g. A1" />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="name">Keterangan / Nama</FieldLabel>
                <Input
                  {...field}
                  id="name"
                  placeholder="Input nama alternatif disini"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <DialogFooter className="pt-2">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Menyimpan..." : "Simpan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AlternativeCreateDialog
