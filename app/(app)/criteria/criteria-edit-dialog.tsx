"use client"

import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { Selectable } from "kysely"
import type { Criteria } from "@/lib/db/db-types"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { updateCriteria } from "@/lib/actions/criteria-actions"
import {
  editCriteriaSchema,
  type CriteriaEdit,
} from "@/lib/validations/criteria"
import { CriteriaFormFields } from "./criteria-form-fields"

interface CriteriaEditDialogProps {
  criteria: Selectable<Criteria> | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CriteriaEditDialog({
  criteria,
  open,
  onOpenChange,
}: CriteriaEditDialogProps) {
  if (!criteria) return null

  return (
    <CriteriaEditDialogContent
      key={criteria.id}
      criteria={criteria}
      open={open}
      onOpenChange={onOpenChange}
    />
  )
}

function CriteriaEditDialogContent({
  criteria,
  open,
  onOpenChange,
}: {
  criteria: Selectable<Criteria>
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const form = useForm<CriteriaEdit>({
    resolver: zodResolver(editCriteriaSchema),
    defaultValues: {
      name: criteria.name,
      code: criteria.code,
      attribute_type: criteria.attribute_type,
      weight: String(criteria.weight),
    },
  })

  const onSubmit = (data: CriteriaEdit) => {
    setError(null)
    startTransition(async () => {
      const res = await updateCriteria(criteria.id, data)
      if (!res.success) {
        setError(res.error || "Gagal memperbarui kriteria")
        return
      }
      onOpenChange(false)
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Kriteria</DialogTitle>
        </DialogHeader>

        {error && (
          <p className="text-sm font-medium text-destructive">{error}</p>
        )}

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <CriteriaFormFields control={form.control} idPrefix="edit-criteria" />

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

export default CriteriaEditDialog
