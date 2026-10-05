"use server"

import { revalidatePath } from "next/cache"
import { requireActiveProject } from "../data/project"
import { requireAuth } from "../data/session"
import { db } from "../db/db"
import { CripsInput, cripsSchema } from "../validations/crips"

export const createOrUpdateCrips = async (
  input: CripsInput,
  criteriaId: number
) => {
  const session = await requireAuth()
  const activeProject = await requireActiveProject(session.userId)

  const validation = cripsSchema.safeParse(input)
  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message || "Input tidak valid",
    }
  }

  await db
    .selectFrom("criteria")
    .selectAll()
    .where("id", "=", criteriaId)
    .where("project_id", "=", activeProject.id)
    .executeTakeFirstOrThrow()

  const { label, value } = input

  const newCrips = await db
    .insertInto("crips")
    .values({
      criteria_id: criteriaId,
      label,
      value: Number(value),
    })
    .returningAll()
    .executeTakeFirst()

  if (!newCrips) {
    return {
      success: false,
      error: "Gagal membuat skala nilai baru",
    }
  }

  revalidatePath("/dashboard")
  revalidatePath("/crips")
  return { success: true }
}
