"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Criteria } from "@/lib/db/db-types"
import { Selectable } from "kysely"
import { ExternalLink } from "lucide-react"

interface CripsClientViewProps {
  criterias: Selectable<Criteria>[]
}

const CripsClientView = ({ criterias }: CripsClientViewProps) => {
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
          criterias.map((criteria) => (
            <div
              key={criteria.id}
              className="flex justify-between border-t border-accent p-4"
            >
              <div className="flex items-center gap-4">
                <div className="flex size-9 flex-col items-center justify-center rounded-lg bg-accent">
                  <span className="text-sm font-semibold">{criteria.code}</span>
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
                <Button>
                  <ExternalLink />
                  Pilih
                </Button>
              </div>
            </div>
          ))
        )}{" "}
      </CardContent>
    </Card>
  )
}

export default CripsClientView
