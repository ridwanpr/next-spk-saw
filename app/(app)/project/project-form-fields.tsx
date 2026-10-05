import { type Control, Controller } from "react-hook-form"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { ProjectInput } from "@/lib/validations/project"

interface ProjectFormFieldsProps {
  control: Control<ProjectInput>
  idPrefix?: string
}

export function ProjectFormFields({
  control,
  idPrefix = "project",
}: ProjectFormFieldsProps) {
  return (
    <FieldGroup>
      {/* Nama Proyek */}
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={`${idPrefix}-name`}>Nama Proyek</FieldLabel>
            <Input
              {...field}
              id={`${idPrefix}-name`}
              aria-invalid={fieldState.invalid}
              placeholder="Contoh: Seleksi Vendor Server"
              autoComplete="off"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Deskripsi */}
      <Controller
        name="description"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={`${idPrefix}-desc`}>Deskripsi</FieldLabel>
            <Textarea
              {...field}
              id={`${idPrefix}-desc`}
              aria-invalid={fieldState.invalid}
              placeholder="Deskripsi singkat tujuan proyek"
              rows={3}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  )
}
