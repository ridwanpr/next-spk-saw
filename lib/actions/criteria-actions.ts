"use server"

import { redirect } from "next/navigation"
import { Insertable } from "kysely"
import { requireAuth } from "../data/session"
import { db } from "../db/db"
import { CriteriaCreate, editCriteriaSchema } from "../validations/criteria"
import { getActiveProject, requireActiveProject } from "../data/project"
import { revalidatePath } from "next/cache"

export const createCriteria = async (input: Insertable<CriteriaCreate>) => {
  const session = await requireAuth()
  const activeProject = await requireActiveProject(session.userId)

  const validation = editCriteriaSchema.safeParse(input)

  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message || "Input tidak valid",
    }
  }

  const { name, code, attribute_type, weight } = validation.data

  const newCriteria = await db
    .insertInto("criteria")
    .values({
      project_id: activeProject.id,
      name,
      code,
      attribute_type,
      weight,
    })
    .returningAll()
    .executeTakeFirst()

  if (!newCriteria) {
    return {
      success: false,
      message: "Gagal membuat kriteria baru",
    }
  }

  revalidatePath("/criteria")
  return { success: true }
}
