import * as z from "zod"

export const cripsSchema = z.object({
  label: z.string().trim().min(1, { error: "Nama proyek wajib diisi" }),
  value: z.enum(["1", "2", "3", "4", "5"], {
    error: "Skala nilai 1-5 wajib diisi",
  }),
})

export type CripsInput = z.infer<typeof cripsSchema>
