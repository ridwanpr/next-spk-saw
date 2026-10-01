"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
import { editCriteriaSchema } from "@/lib/validations/criteria"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import z from "zod"

const CriteriaCreate = () => {
  const form = useForm<z.infer<typeof editCriteriaSchema>>({
    resolver: zodResolver(editCriteriaSchema),
    defaultValues: {
      name: "",
      code: "",
      attribute_type: "benefit",
      weight: "",
    },
  })

  const onSubmit = (data: z.infer<typeof editCriteriaSchema>) => {
    console.log(data)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tambah Kriteria</CardTitle>
      </CardHeader>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent>
          <FieldGroup>
            {/* Nama */}
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="create-name-criteria">Nama</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    type="text"
                    id="create-name-criteria"
                    placeholder="Nama kriteria"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Kode Kriteria */}
            <Controller
              name="code"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="create-code-criteria">
                    Kode Kriteria
                  </FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    type="text"
                    id="create-code-criteria"
                    placeholder="Kode kriteria (ex: C1)"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Atribut (Select) */}
            <Controller
              name="attribute_type"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="create-attribute-criteria">
                    Atribut
                  </FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      id="create-attribute-criteria"
                      aria-invalid={fieldState.invalid}
                    >
                      <SelectValue placeholder="Benefit/Cost" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="benefit">Benefit</SelectItem>
                        <SelectItem value="cost">Cost</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Bobot */}
            <Controller
              name="weight"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="create-weight-criteria">
                    Bobot
                  </FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    type="number"
                    id="create-weight-criteria"
                    min="1"
                    max="100"
                    placeholder="0-100"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </CardContent>
        <CardFooter className="mt-6 flex items-center justify-end gap-1">
          <Button
            type="button"
            variant="secondary"
            onClick={() => form.reset()}
          >
            Reset
          </Button>
          <Button type="submit" variant="default">
            Simpan
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

export default CriteriaCreate
