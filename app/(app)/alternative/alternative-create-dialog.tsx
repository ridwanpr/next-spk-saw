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
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { ProjectCriteria } from "@/lib/data/criteria"
import { Plus } from "lucide-react"

interface AlternativeCreateDialogProps {
  criterias: ProjectCriteria[]
}

const AlternativeCreateDialog = ({
  criterias,
}: AlternativeCreateDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Alternatif Baru
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Tambah Alternatif Baru</DialogTitle>
          <DialogDescription>
            Masukkan identitas alternatif dan nilai untuk setiap kriteria.
          </DialogDescription>
        </DialogHeader>

        <form className="mt-2 space-y-6">
          {/* Identitas Alternatif Header */}
          <div className="grid grid-cols-12 gap-4 rounded-xl border border-border/40 bg-muted/20 p-4">
            <div className="col-span-3">
              <Field>
                <FieldLabel htmlFor="code">Kode (Ai)</FieldLabel>
                <Input id="code" placeholder="E.g. A1" />
              </Field>
            </div>
            <div className="col-span-9">
              <Field>
                <FieldLabel htmlFor="name">Keterangan / Nama</FieldLabel>
                <Input id="name" placeholder="Input nama alternatif disini" />
              </Field>
            </div>
          </div>

          {/* Grid Nilai Kriteria */}
          <div className="space-y-3">
            <p className="text-sm font-semibold">Nilai Kriteria</p>

            <div className="max-h-[50vh] overflow-y-auto pr-2">
              <FieldGroup className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                {criterias.map((c) => (
                  <Field key={c.id}>
                    <FieldLabel
                      htmlFor={`criteria-${c.id}`}
                      className="truncate"
                    >
                      <span className="mr-1 font-mono text-muted-foreground">
                        {c.code}:
                      </span>
                      {c.name}
                    </FieldLabel>
                    <Input
                      id={`criteria-${c.id}`}
                      type="number"
                      step="any"
                      placeholder={`Nilai ${c.name}`}
                    />
                  </Field>
                ))}
              </FieldGroup>
            </div>
          </div>

          <DialogFooter className="gap-2 border-t border-border/50 pt-2 sm:gap-0">
            <Button type="submit">Simpan</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AlternativeCreateDialog
