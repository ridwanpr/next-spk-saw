import * as z from "zod"

export const createAlternativeSchema = z.object({
  code: z.string().trim().min(1, { error: "Kode wajib diisi" }),
  name: z.string().trim().min(1, { error: "Nama wajib diisi" }),
})

export type AlternativeCreate = z.infer<typeof createAlternativeSchema>
