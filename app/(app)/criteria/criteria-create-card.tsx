"use client"

import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { createCriteria } from "@/lib/actions/criteria-actions"
import {
  editCriteriaSchema,
  type CriteriaCreate,
} from "@/lib/validations/criteria"
import { CriteriaFormFields } from "./criteria-form-fields"

export function CriteriaCreateCard() {
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const form = useForm<CriteriaCreate>({
    resolver: zodResolver(editCriteriaSchema),
    defaultValues: {
      name: "",
      code: "",
      attribute_type: "benefit",
      weight: "",
    },
  })

  const onSubmit = (data: CriteriaCreate) => {
    setError(null)
    startTransition(async () => {
      const res = await createCriteria(data)
      if (!res.success) {
        setError(res.error || "Gagal membuat kriteria baru")
        return
      }
      form.reset({
        name: "",
        code: "",
        attribute_type: "benefit",
        weight: "",
      })
    })
  }

  const handleReset = () => {
    setError(null)
    form.reset({
      name: "",
      code: "",
      attribute_type: "benefit",
      weight: "",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tambah Kriteria</CardTitle>
      </CardHeader>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          {error && (
            <p className="text-sm font-medium text-destructive">{error}</p>
          )}
          <CriteriaFormFields
            control={form.control}
            idPrefix="create-criteria"
          />
        </CardContent>
        <CardFooter className="mt-4 flex items-center justify-end gap-2">
          <Button
            type="button"
            variant="secondary"
            disabled={isPending}
            onClick={handleReset}
          >
            Reset
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Menyimpan..." : "Simpan"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

export default CriteriaCreateCard
