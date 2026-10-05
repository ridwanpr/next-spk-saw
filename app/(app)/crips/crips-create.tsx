"use client"

import { Selectable } from "kysely"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Crips, Criteria } from "@/lib/db/db-types"
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
  criteriaCrips: Selectable<Crips>[]
}

const CripsCreate = ({ selectedCriteria, criteriaCrips }: CripsCreateProps) => {
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
        {criteriaCrips.length == 0 && (
          <div className="flex items-center justify-between gap-4 border-t border-border px-6 py-4">
            Tidak ada data, tambahkan terlebih dahulu pada input dibawah
          </div>
        )}

        {criteriaCrips.length > 0 &&
          criteriaCrips.map((crips, i) => (
            <div
              key={crips.id}
              className="flex items-center justify-between gap-4 border-t border-border px-6 py-3.5 transition-colors hover:bg-muted/40"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-muted text-xs font-medium text-muted-foreground">
                  {i + 1}
                </div>
                <p className="text-sm font-medium text-foreground">
                  {crips.label}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="inline-flex items-center rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
                  Nilai: {crips.value}
                </span>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}

        <div className="border-t px-6 pt-4">
          <p className="mb-4 font-heading text-base font-medium">
            Tambah / Ubah Skala
          </p>
          <form>
            <FieldGroup className="flex flex-col lg:flex-row">
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
