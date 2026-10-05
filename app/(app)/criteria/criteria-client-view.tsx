"use client"

import type { Selectable } from "kysely"
import type { Criteria } from "@/lib/db/db-types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import CriteriaEditDialog from "./criteria-edit-dialog"
import CriteriaDeleteDialog from "./criteria-delete-dialog"
import { deleteCriteria } from "@/lib/actions/criteria-actions"

interface CriteriaClientViewProps {
  criterias: Selectable<Criteria>[]
}

const CriteriaClientView = ({ criterias }: CriteriaClientViewProps) => {
  const [editOpen, setEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [criteriaEdited, setCriteriaEdited] =
    useState<Selectable<Criteria> | null>(null)
  const [criteriaToDelete, setCriteriaToDelete] = useState<number | null>(null)

  const handleEdit = (criteria: Selectable<Criteria>) => {
    setCriteriaEdited(criteria)
    setEditOpen(true)
  }

  const handleDelete = async (criteriaId: number) => {
    setError(null)
    const res = await deleteCriteria(criteriaId)
    if (!res.success) {
      setError("Gagal menghapus kriteria")
    }
    setIsDeleteOpen(false)
  }

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
                  <p className="mr-2 font-semibold">{criteria.weight}%</p>
                  <div className="flex items-center gap-1">
                    <Button
                      onClick={() => handleEdit(criteria)}
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    >
                      <Pencil className="size-4" />
                    </Button>
                    <Button
                      onClick={() => {
                        setIsDeleteOpen(true)
                        setCriteriaToDelete(criteria.id)
                      }}
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {criteriaEdited && (
        <CriteriaEditDialog
          key={criteriaEdited.id}
          editOpen={editOpen}
          setEditOpen={setEditOpen}
          criteriaEdited={criteriaEdited}
        />
      )}

      {criteriaToDelete && (
        <CriteriaDeleteDialog
          isDeleteOpen={isDeleteOpen}
          setIsDeleteOpen={setIsDeleteOpen}
          handleDelete={handleDelete}
          error={error}
          criteriaToDelete={criteriaToDelete}
        />
      )}
    </>
  )
}

export default CriteriaClientView
