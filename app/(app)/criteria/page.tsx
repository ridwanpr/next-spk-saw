import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldGroup, FieldTitle } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Suspense } from "react"
import CriteriaList from "./criteria-list"
import CriteriaListSkeleton from "./criteria-list-skeleton"

const Criteria = async () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Kriteria</h1>
          <p className="text-sm text-muted-foreground">
            Tambah, edit atau hapus kriteria.
          </p>
        </div>
      </div>

      <div className="min-h-vh grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-7">
          <Suspense fallback={<CriteriaListSkeleton />}>
            <CriteriaList />
          </Suspense>
        </div>
        <div className="col-span-12 md:col-span-5">
          <Card>
            <CardHeader>
              <CardTitle>Tambah Kriteria</CardTitle>
            </CardHeader>
            <form>
              <CardContent>
                <FieldGroup>
                  <Field>
                    <FieldTitle>Nama</FieldTitle>
                    <Input type="text" placeholder="Nama kriteria" />
                  </Field>
                  <Field>
                    <FieldTitle>Kode Kriteria</FieldTitle>
                    <Input type="text" placeholder="Kode kriteria (ex: C1)" />
                  </Field>
                  <Field>
                    <FieldTitle>Atribut</FieldTitle>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Benefit/Cost" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="benefit">Benefit</SelectItem>
                          <SelectItem value="cost">Cost</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field>
                    <FieldTitle>Bobot</FieldTitle>
                    <Input
                      type="number"
                      min="1"
                      max="100"
                      placeholder="0-100"
                    />
                  </Field>
                </FieldGroup>
              </CardContent>
              <CardFooter className="mt-6 flex items-center justify-end gap-1">
                <Button variant="secondary">Reset</Button>
                <Button variant="default">Simpan</Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Criteria
