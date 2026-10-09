import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ProjectAlternativeCriteria } from "@/lib/data/alternative"
import { Pencil, Trash2 } from "lucide-react"

interface AlternativeListProps {
  alternatives: ProjectAlternativeCriteria[]
}

const AlternativeList = ({ alternatives }: AlternativeListProps) => {
  console.log(alternatives)
  return (
    <Card>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Kode</TableHead>
              <TableHead className="w-125">Nama</TableHead>
              <TableHead className="text-center">Status Input</TableHead>
              <TableHead className="text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {alternatives.length > 0 &&
              alternatives.map((alternative, index) => (
                <TableRow key={alternative.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{alternative.code}</TableCell>
                  <TableCell>{alternative.name}</TableCell>
                  <TableCell className="text-center">
                    {alternative.is_complete ? (
                      <Badge variant="default">Sudah Lengkap</Badge>
                    ) : (
                      <Badge variant="destructive">Belum Lengkap</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        variant="ghost"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <Pencil />
                      </Button>
                      <Button
                        variant="ghost"
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default AlternativeList
