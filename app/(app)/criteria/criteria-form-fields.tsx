import { type Control, Controller } from "react-hook-form"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { CriteriaCreate } from "@/lib/validations/criteria"

interface CriteriaFormFieldsProps {
  control: Control<CriteriaCreate>
  idPrefix?: string
}

export function CriteriaFormFields({
  control,
  idPrefix = "criteria",
}: CriteriaFormFieldsProps) {
  return (
    <FieldGroup>
      {/* Nama Kriteria */}
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={`${idPrefix}-name`}>Nama Kriteria</FieldLabel>
            <Input
              {...field}
              id={`${idPrefix}-name`}
              aria-invalid={fieldState.invalid}
              placeholder="Nama kriteria (contoh: Kualitas Layanan)"
              autoComplete="off"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Kode Kriteria */}
      <Controller
        name="code"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={`${idPrefix}-code`}>Kode Kriteria</FieldLabel>
            <Input
              {...field}
              id={`${idPrefix}-code`}
              aria-invalid={fieldState.invalid}
              placeholder="Kode kriteria (contoh: C1)"
              autoComplete="off"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Atribut (Benefit / Cost) */}
      <Controller
        name="attribute_type"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={`${idPrefix}-attribute`}>Atribut</FieldLabel>
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger
                id={`${idPrefix}-attribute`}
                aria-invalid={fieldState.invalid}
              >
                <SelectValue placeholder="Pilih atribut (Benefit/Cost)" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="benefit">Benefit</SelectItem>
                  <SelectItem value="cost">Cost</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="eval_type"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="eval_type">Tipe Evaluasi</FieldLabel>
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih tipe evaluasi (Exact/Range)" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="exact">Exact</SelectItem>
                  <SelectItem value="range">Range</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
        )}
      />

      {/* Bobot */}
      <Controller
        name="weight"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={`${idPrefix}-weight`}>Bobot (%)</FieldLabel>
            <Input
              {...field}
              id={`${idPrefix}-weight`}
              type="number"
              min="1"
              max="100"
              aria-invalid={fieldState.invalid}
              placeholder="1 - 100"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  )
}
