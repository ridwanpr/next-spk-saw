import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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
import { Criteria } from "@/lib/db/db-types"
import { editCriteriaSchema } from "@/lib/validations/criteria"
import { zodResolver } from "@hookform/resolvers/zod"
import { Selectable } from "kysely"
import { Dispatch, SetStateAction } from "react"
import { Controller, useForm } from "react-hook-form"
import z from "zod"

interface CriteriaDialogProps {
  editOpen: boolean
  setEditOpen: Dispatch<SetStateAction<boolean>>
  criteriaEdited: Selectable<Criteria>
}

const CriteriaDialog = ({
  editOpen,
  setEditOpen,
  criteriaEdited,
}: CriteriaDialogProps) => {
  const editForm = useForm<z.infer<typeof editCriteriaSchema>>({
    resolver: zodResolver(editCriteriaSchema),
    defaultValues: {
      name: criteriaEdited.name,
      code: criteriaEdited.code,
      attribute_type: criteriaEdited.attribute_type,
      weight: criteriaEdited.weight,
    },
  })

  const onSubmitEdit = (data: z.infer<typeof editCriteriaSchema>) => {
    console.log(data)
  }

  return (
    <>
      {/* Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Kriteria</DialogTitle>
          </DialogHeader>
          <form onSubmit={editForm.handleSubmit(onSubmitEdit)}>
            <FieldGroup>
              {/* Nama */}
              <Controller
                name="name"
                control={editForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="edit-name-criteria">Nama</FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      id="edit-name-criteria"
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
                control={editForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="edit-code-criteria">
                      Kode Kriteria
                    </FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      type="text"
                      id="edit-code-criteria"
                      placeholder="Kode kriteria (ex: C1)"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Atribut */}
              <Controller
                name="attribute_type"
                control={editForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="edit-attribute-criteria">
                      Atribut
                    </FieldLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="edit-attribute-criteria"
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
                control={editForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="edit-weight-criteria">
                      Bobot
                    </FieldLabel>
                    <Input
                      {...field}
                      id="edit-weight-criteria"
                      type="number"
                      min="1"
                      max="100"
                      placeholder="0-100"
                      aria-invalid={fieldState.invalid}
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <DialogFooter className="mt-6">
              <Button type="submit">Simpan</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
    </>
  )
}

export default CriteriaDialog
