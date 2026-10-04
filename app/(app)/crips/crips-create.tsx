"use client"

import { Selectable } from "kysely"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Criteria } from "@/lib/db/db-types"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Controller, useForm } from "react-hook-form"
import z from "zod"
import { cripsSchema } from "@/lib/validations/crips"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface CripsCreateProps {
  selectedCriteria?: Selectable<Criteria>
}

const CripsCreate = ({ selectedCriteria }: CripsCreateProps) => {
  const form = useForm<z.infer<typeof cripsSchema>>({
    resolver: zodResolver(cripsSchema),
    values: {
      label: "",
      value: "1",
    },
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {selectedCriteria
            ? `Skala Nilai: ${selectedCriteria.code} - ${selectedCriteria.name}`
            : "Pilih Kriteria Terlebih Dahulu"}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex items-center justify-between gap-4 border-t border-border px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center justify-center rounded bg-accent p-2">
              <span className="w-8 text-center">1</span>
            </div>
            <div>Nilai 1</div>
            <div>
              <p>{"<="} 2km</p>
            </div>
          </div>
          <div>
            <Button variant="ghost" size="sm">
              <Pencil />
            </Button>
            <Button variant="ghost" size="sm">
              <Trash2 />
            </Button>
          </div>
        </div>

        <div className="border-t px-6 pt-4">
          <p className="mb-4 font-heading text-base font-medium">
            Tambah / Ubah Skala
          </p>
          <form>
            <FieldGroup className="flex flex-row">
              <Controller
                name="label"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="label">Label Skala</FieldLabel>
                    <Input
                      {...field}
                      type="text"
                      id="label"
                      aria-invalid={fieldState.invalid}
                      placeholder="Label skala nilai"
                      autoComplete="off"
                    />
                  </Field>
                )}
              />

              <Controller
                name="value"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel id="value">Nilai Skala</FieldLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="value"
                        aria-invalid={fieldState.invalid}
                      >
                        <SelectValue>Skala Nilai 1-5</SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {Array.from({ length: 5 }, (_, i) => i + 1).map(
                            (val) => (
                              <SelectItem key={val} value={val.toString()}>
                                {val}
                              </SelectItem>
                            )
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              />
            </FieldGroup>
            <div className="mt-4 flex justify-end gap-1">
              <Button variant="secondary">Reset</Button>
              <Button>Submit</Button>
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  )
}

export default CripsCreate
