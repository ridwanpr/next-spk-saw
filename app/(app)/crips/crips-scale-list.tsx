"use client"

import type { Selectable } from "kysely"
import type { Crips, Criteria } from "@/lib/db/db-types"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"

interface CripsScaleListProps {
  selectedCriteria: Selectable<Criteria>
  criteriaCrips: Selectable<Crips>[]
  selectedCripsId: number | null
  onEdit: (crips: Selectable<Crips>) => void
  onDelete: (cripsId: number) => void
  isPending: boolean
  criteriaEvalType: "exact" | "range"
}

export function CripsScaleList({
  criteriaCrips,
  selectedCripsId,
  onEdit,
  onDelete,
  isPending,
  criteriaEvalType,
}: CripsScaleListProps) {
  if (criteriaCrips.length === 0) {
    return (
      <div className="flex items-center justify-between gap-4 border-t border-border px-6 py-6 text-sm text-muted-foreground">
        Belum ada skala nilai untuk kriteria ini. Tambahkan skala nilai
        menggunakan formulir di bawah.
      </div>
    )
  }

  return (
    <div className="divide-y divide-border border-t border-border">
      {criteriaCrips.map((crips, i) => {
        const isEditing = crips.id === selectedCripsId

        return (
          <div
            key={crips.id}
            className={`flex items-center justify-between gap-4 px-6 py-3.5 transition-colors ${
              isEditing ? "bg-accent/40" : "hover:bg-muted/40"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-muted text-xs font-semibold text-muted-foreground">
                {i + 1}
              </div>
              <p className="text-sm font-medium text-foreground">
                {crips.label}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {criteriaEvalType == "range" && (
                <span>
                  Range: {crips.min_value} - {crips.max_value}
                </span>
              )}
              <span className="inline-flex items-center rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
                Nilai: {crips.value}
              </span>
              <div className="flex items-center gap-1">
                <Button
                  onClick={() => onEdit(crips)}
                  variant="ghost"
                  size="icon"
                  type="button"
                  disabled={isPending}
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                >
                  <Pencil className="h-4 w-4" />
                  <span className="sr-only">Edit skala</span>
                </Button>
                <Button
                  onClick={() => onDelete(crips.id)}
                  variant="ghost"
                  size="icon"
                  type="button"
                  disabled={isPending}
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Hapus skala</span>
                </Button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default CripsScaleList
