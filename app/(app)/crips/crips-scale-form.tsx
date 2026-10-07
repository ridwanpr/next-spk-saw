"use client"

import { useState, useTransition } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { Selectable } from "kysely"
import type { Crips } from "@/lib/db/db-types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { createOrUpdateCrips } from "@/lib/actions/crips-actions"
import { cripsSchema, type CripsInput } from "@/lib/validations/crips"

interface CripsScaleFormProps {
  selectedCriteriaId: number
  criteriaEvalType: "exact" | "range"
  editingCrips: Selectable<Crips> | null
  onCancelEdit: () => void
  onSuccess: () => void
}

export function CripsScaleForm({
  selectedCriteriaId,
  criteriaEvalType,
  editingCrips,
  onCancelEdit,
  onSuccess,
}: CripsScaleFormProps) {
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const form = useForm<CripsInput>({
    resolver: zodResolver(cripsSchema),
    defaultValues: {
      label: editingCrips?.label ?? "",
      value: (editingCrips?.value.toString() as CripsInput["value"]) ?? "1",
      min_value: editingCrips?.min_value ?? "",
      max_value: editingCrips?.max_value ?? "",
    },
  })

  const onSubmit = (data: CripsInput) => {
    setError(null)
    startTransition(async () => {
      const res = await createOrUpdateCrips(
        data,
        selectedCriteriaId,
        editingCrips?.id ?? null
      )
      if (!res.success) {
        setError(res.error || "Gagal menyimpan skala nilai")
        return
      }
      form.reset({ label: "", value: "1" })
      onSuccess()
    })
  }

  const handleReset = () => {
    setError(null)
    if (editingCrips) {
      onCancelEdit()
    } else {
      form.reset({ label: "", value: "1", min_value: "", max_value: "" })
    }
  }

  return (
    <div className="border-t border-border px-6 pt-4 pb-6">
      <div className="mb-4 flex items-center justify-between">
        <p className="font-heading text-base font-medium">
          {editingCrips ? "Ubah Skala Nilai" : "Tambah Skala Nilai"}
        </p>
        {editingCrips && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onCancelEdit}
            disabled={isPending}
          >
            Batal Ubah
          </Button>
        )}
      </div>

      {error && (
        <p className="mb-4 text-sm font-medium text-destructive">{error}</p>
      )}

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup className="flex flex-col lg:flex-row">
          <Controller
            name="label"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="crips-label">Label Skala</FieldLabel>
                <Input
                  {...field}
                  type="text"
                  id="crips-label"
                  aria-invalid={fieldState.invalid}
                  placeholder="Contoh: <= 2km atau Sangat Baik"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="value"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="crips-value">Nilai Skala</FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    id="crips-value"
                    aria-invalid={fieldState.invalid}
                  >
                    <SelectValue placeholder="Skala Nilai 1-5" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {Array.from({ length: 5 }, (_, i) => i + 1).map((val) => (
                        <SelectItem key={val} value={val.toString()}>
                          {val}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        {criteriaEvalType == "range" && (
          <FieldGroup className="mt-4 flex flex-col lg:flex-row">
            <Controller
              name="min_value"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="min_value">Nilai Minimum</FieldLabel>
                  <Input
                    {...field}
                    type="text"
                    id="min_value"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="max_value"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="max_value">Nilai Maksimum</FieldLabel>
                  <Input
                    {...field}
                    type="text"
                    id="max_value"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        )}

        <div className="mt-4 flex justify-end gap-2">
          <Button
            type="button"
            variant="secondary"
            onClick={handleReset}
            disabled={isPending}
          >
            {editingCrips ? "Batal" : "Reset"}
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending
              ? "Menyimpan..."
              : editingCrips
                ? "Simpan Perubahan"
                : "Tambah Skala"}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CripsScaleForm
