import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog"
import { Dispatch, SetStateAction } from "react"

interface CriteriaDeleteDialogProps {
  isDeleteOpen: boolean
  setIsDeleteOpen: Dispatch<SetStateAction<boolean>>
  error: string | null
  handleDelete: (criteriaId: number) => void
  criteriaToDelete: number
}

const CriteriaDeleteDialog = ({
  isDeleteOpen,
  setIsDeleteOpen,
  error,
  handleDelete,
  criteriaToDelete,
}: CriteriaDeleteDialogProps) => {
  return (
    <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
      <DialogContent>
        <DialogHeader>Hapus Kriteria?</DialogHeader>
        {error && (
          <p className="text-sm font-medium text-destructive">{error}</p>
        )}
        <DialogDescription className="text-foreground">
          Anda yakin ingin menghapus kriteria ini? Tindakan ini bersifat
          permanen
        </DialogDescription>
        <DialogFooter>
          <Button variant="secondary" onClick={() => setIsDeleteOpen(false)}>
            Batal
          </Button>
          <Button
            variant="destructive"
            onClick={() => handleDelete(criteriaToDelete)}
          >
            Hapus
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CriteriaDeleteDialog
