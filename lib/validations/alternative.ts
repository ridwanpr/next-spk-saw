import * as z from "zod"

export const alternativeSchema = z.object({
  name: z.string().trim().min(1, { error: "Nama wajib diisi" }),
  code: z.string().trim().min(1, { error: "Kode wajib diisi" }),
})

export type AlternativeCreate = z.infer<typeof alternativeSchema>
