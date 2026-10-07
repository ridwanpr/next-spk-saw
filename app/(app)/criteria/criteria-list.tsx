"use client"

import { useState } from "react"
import type { Selectable } from "kysely"
import type { Criteria } from "@/lib/db/db-types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CriteriaEditDialog } from "./criteria-edit-dialog"
import { CriteriaDeleteDialog } from "./criteria-delete-dialog"

interface CriteriaListProps {
  criterias: Selectable<Criteria>[]
}

export function CriteriaList({ criterias }: CriteriaListProps) {
  const [criteriaToEdit, setCriteriaToEdit] =
    useState<Selectable<Criteria> | null>(null)
  const [criteriaToDelete, setCriteriaToDelete] =
    useState<Selectable<Criteria> | null>(null)

  return (
    <>
      <Card className="pb-1">
        <CardHeader>
          <CardTitle>Daftar Kriteria</CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          {!criterias || criterias.length === 0 ? (
            <div className="p-6 text-center text-sm text-muted-foreground">
              Belum ada kriteria yang ditambahkan.
            </div>
          ) : (
            criterias.map((criteria) => (
              <div
                key={criteria.id}
                className="flex items-center justify-between border-t border-accent p-4 transition-colors hover:bg-muted/40"
              >
                <div className="flex items-center gap-4">
                  <div className="flex size-9 flex-col items-center justify-center rounded-lg bg-accent">
                    <span className="text-sm font-semibold">
                      {criteria.code}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold">{criteria.name}</p>
                    <span className="text-xs text-muted-foreground capitalize">
                      Atribut: {criteria.attribute_type}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="mr-2 text-xs font-medium uppercase">
                    {criteria.eval_type}
                  </span>
                  <p className="mr-2 font-semibold tabular-nums">
                    {criteria.weight}%
                  </p>
                  <div className="flex items-center gap-1">
                    <Button
                      onClick={() => setCriteriaToEdit(criteria)}
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    >
                      <Pencil className="size-4" />
                      <span className="sr-only">Edit kriteria</span>
                    </Button>
                    <Button
                      onClick={() => setCriteriaToDelete(criteria)}
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="size-4" />
                      <span className="sr-only">Hapus kriteria</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <CriteriaEditDialog
        criteria={criteriaToEdit}
        open={Boolean(criteriaToEdit)}
        onOpenChange={(open) => !open && setCriteriaToEdit(null)}
      />

      <CriteriaDeleteDialog
        criteria={criteriaToDelete}
        open={Boolean(criteriaToDelete)}
        onOpenChange={(open) => !open && setCriteriaToDelete(null)}
      />
    </>
  )
}

export default CriteriaList
