import * as z from "zod"

export const editCriteriaSchema = z.object({
  name: z.string().trim().min(1, { error: "Nama kriteria wajib diisi" }),
  code: z.string().trim().min(1, { error: "Kode kriteria wajib diisi" }),
  attribute_type: z.enum(["benefit", "cost"], {
    error: "Atribut kriteria wajib diisi",
  }),
  weight: z.string().trim().min(1, { error: "Bobot kriteria wajib diisi" }),
  eval_type: z.enum(["range", "exact"], {
    error: "Tipe evaluasi wajib diisi",
  }),
})

export type CriteriaEdit = z.infer<typeof editCriteriaSchema>
export type CriteriaCreate = z.infer<typeof editCriteriaSchema>
