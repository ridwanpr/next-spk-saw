import Link from "next/link"
import { Check, ExternalLink } from "lucide-react"
import { Selectable } from "kysely"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Criteria } from "@/lib/db/db-types"

interface CripsCriteriaListProps {
  criterias: Selectable<Criteria>[]
  selectedCriteriaId?: number
}

const CripsCriteriaList = ({
  criterias,
  selectedCriteriaId,
}: CripsCriteriaListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Daftar Kriteria</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {!criterias || criterias.length === 0 ? (
          <div className="p-6 text-center text-sm text-muted-foreground">
            Belum ada kriteria yang ditambahkan.
          </div>
        ) : (
          criterias.map((criteria) => {
            const isSelected = criteria.id === selectedCriteriaId

            return (
              <div
                key={criteria.id}
                className={`flex justify-between border-t border-l-4 border-accent p-4 transition-colors ${
                  isSelected
                    ? "border-l-primary bg-accent/30"
                    : "border-l-transparent hover:bg-muted/10"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`flex size-9 flex-col items-center justify-center rounded-lg font-semibold ${
                      isSelected
                        ? "bg-primary text-primary-foreground"
                        : "bg-accent text-foreground"
                    }`}
                  >
                    <span className="text-sm">{criteria.code}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      {criteria.name}
                    </p>
                    <span className="text-xs text-muted-foreground capitalize">
                      Atribut: {criteria.attribute_type}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <p className="w-16 text-right text-sm font-semibold text-foreground tabular-nums">
                    {criteria.weight}%
                  </p>

                  <Button
                    asChild
                    size="sm"
                    variant={isSelected ? "secondary" : "outline"}
                    className={`h-8 w-21 justify-center gap-1.5 ${
                      isSelected ? "pointer-events-none" : ""
                    }`}
                  >
                    <Link href={`?criteriaId=${criteria.id}`}>
                      {isSelected ? (
                        <Check className="size-3.5 text-primary" />
                      ) : (
                        <ExternalLink className="size-3.5" />
                      )}
                      <span>{isSelected ? "Dipilih" : "Pilih"}</span>
                    </Link>
                  </Button>
                </div>
              </div>
            )
          })
        )}
      </CardContent>
    </Card>
  )
}

export default CripsCriteriaList
