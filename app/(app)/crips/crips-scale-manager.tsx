"use client"

import { useState, useTransition } from "react"
import type { Selectable } from "kysely"
import type { Crips, Criteria } from "@/lib/db/db-types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { deleteCrips } from "@/lib/actions/crips-actions"
import { CripsScaleList } from "./crips-scale-list"
import { CripsScaleForm } from "./crips-scale-form"

interface CripsScaleManagerProps {
  selectedCriteria: Selectable<Criteria>
  criteriaCrips: Selectable<Crips>[]
}

export function CripsScaleManager({
  selectedCriteria,
  criteriaCrips,
}: CripsScaleManagerProps) {
  const [editingCrips, setEditingCrips] = useState<Selectable<Crips> | null>(
    null
  )
  const [deleteError, setDeleteError] = useState<string | null>(null)
  const [isDeleting, startDeleteTransition] = useTransition()

  const handleEdit = (crips: Selectable<Crips>) => {
    setDeleteError(null)
    setEditingCrips(crips)
  }

  const handleCancelEdit = () => {
    setEditingCrips(null)
  }

  const handleDelete = (cripsId: number) => {
    setDeleteError(null)
    startDeleteTransition(async () => {
      const res = await deleteCrips(cripsId)
      if (!res.success) {
        setDeleteError(res.error || "Gagal menghapus skala nilai")
        return
      }
      if (editingCrips?.id === cripsId) {
        setEditingCrips(null)
      }
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {`Skala Nilai: ${selectedCriteria.code} - ${selectedCriteria.name}`}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {deleteError && (
          <div className="border-t border-destructive/20 bg-destructive/10 px-6 py-2.5 text-sm text-destructive">
            {deleteError}
          </div>
        )}

        <CripsScaleList
          selectedCriteria={selectedCriteria}
          criteriaCrips={criteriaCrips}
          selectedCripsId={editingCrips?.id ?? null}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isPending={isDeleting}
        />

        <CripsScaleForm
          key={editingCrips?.id ?? "create"}
          selectedCriteriaId={selectedCriteria.id}
          editingCrips={editingCrips}
          onCancelEdit={handleCancelEdit}
          onSuccess={() => setEditingCrips(null)}
        />
      </CardContent>
    </Card>
  )
}

export default CripsScaleManager
