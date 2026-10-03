import { Selectable } from "kysely"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Criteria } from "@/lib/db/db-types"

interface CripsCreateProps {
  selectedCriteria?: Selectable<Criteria>
}

const CripsCreate = ({ selectedCriteria }: CripsCreateProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {selectedCriteria
            ? `Skala Nilai: ${selectedCriteria.code} - ${selectedCriteria.name}`
            : "Pilih Kriteria Terlebih Dahulu"}
        </CardTitle>
      </CardHeader>
      <CardContent>{/* todo: manage crips */}</CardContent>
    </Card>
  )
}

export default CripsCreate
