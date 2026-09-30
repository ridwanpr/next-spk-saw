import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pencil, Plus, Trash2 } from "lucide-react"

const Criteria = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Kriteria</h1>
          <p className="text-sm text-muted-foreground">
            Tambah, edit atau hapus kriteria.
          </p>
        </div>
        <div>
          <Button>
            <Plus />
            Kriteria Baru
          </Button>
        </div>
      </div>

      <div className="min-h-vh grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-7">
          <Card className="pb-1">
            <CardHeader>
              <CardTitle>Daftar Kriteria</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex justify-between border-t border-accent p-4">
                <div className="flex items-center gap-4">
                  <div className="flex size-9 flex-col items-center justify-center rounded-lg bg-accent">
                    <span>C1</span>
                  </div>

                  <div>
                    <p className="font-semibold">Jarak ke Lokasi</p>
                    <span className="text-xs text-muted-foreground">
                      Atribut: Benefit
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <p className="mr-2 font-semibold">30%</p>

                  <Button variant="secondary">
                    <Pencil />
                  </Button>

                  <Button variant="destructive">
                    <Trash2 />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-12 md:col-span-5">
          <Card>
            <CardHeader>
              <CardTitle>Tambah Kriteria</CardTitle>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Criteria
