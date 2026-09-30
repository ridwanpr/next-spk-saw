import * as z from "zod"

export const projectSchema = z.object({
  name: z.string().trim().min(1, { error: "Nama proyek wajib diisi" }),
  description: z.string().trim().min(1, { error: "Deskripsi wajib diisi" }),
})

export type ProjectInput = z.infer<typeof projectSchema>
