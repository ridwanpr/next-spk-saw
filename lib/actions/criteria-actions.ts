"use server"

import { requireAuth } from "../data/session"
import { db } from "../db/db"
import {
  CriteriaCreate,
  CriteriaEdit,
  editCriteriaSchema,
} from "../validations/criteria"
import { requireActiveProject } from "../data/project"
import { revalidatePath } from "next/cache"

export const createCriteria = async (input: CriteriaCreate) => {
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

export const updateCriteria = async (
  criteriaId: number,
  input: CriteriaEdit
) => {
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

  await db
    .updateTable("criteria")
    .set({ name, code, attribute_type, weight, updated_at: new Date() })
    .where("project_id", "=", activeProject.id)
    .where("id", "=", criteriaId)
    .execute()

  revalidatePath("/criteria")
  revalidatePath("/dashboard")
  return { success: true }
}

export const deleteCriteria = async (criteriaId: number) => {
  const session = await requireAuth()
  const activeProject = await requireActiveProject(session.userId)

  await db
    .deleteFrom("criteria")
    .where("id", "=", criteriaId)
    .where("criteria.project_id", "=", activeProject.id)
    .execute()

  revalidatePath("/dashboard")
  revalidatePath("/criteria")

  return { success: true }
}
