import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Pencil, Trash2 } from "lucide-react"
import { getProjectCriteria } from "@/lib/data/criteria"
import { Button } from "@/components/ui/button"

const CriteriaList = async () => {
  const criterias = await getProjectCriteria()

  return (
    <Card className="pb-1">
      <CardHeader>
        <CardTitle>Daftar Kriteria</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {criterias &&
          criterias.length > 0 &&
          criterias.map((criteria) => (
            <div
              key={criteria.id}
              className="flex justify-between border-t border-accent p-4"
            >
              <div className="flex items-center gap-4">
                <div className="flex size-9 flex-col items-center justify-center rounded-lg bg-accent">
                  <span>{criteria.code}</span>
                </div>
                <div>
                  <p className="font-semibold">{criteria.name}</p>
                  <span className="text-xs text-muted-foreground capitalize">
                    Atribut: {criteria.attribute_type}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <p className="mr-2 font-semibold">{criteria.weight}%</p>
                <Button variant="secondary">
                  <Pencil />
                </Button>

                <Button variant="destructive">
                  <Trash2 />
                </Button>
              </div>
            </div>
          ))}
      </CardContent>
    </Card>
  )
}

export default CriteriaList
