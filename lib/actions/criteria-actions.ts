"use server"

import { revalidatePath } from "next/cache"
import { db } from "../db/db"
import {
  CriteriaCreate,
  CriteriaEdit,
  editCriteriaSchema,
} from "../validations/criteria"
import { projectAction } from "./action-client"

export const createCriteria = projectAction(
  async ({ activeProject }, input: CriteriaCreate) => {
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
        error: "Gagal membuat kriteria baru",
      }
    }

    revalidatePath("/criteria")
    revalidatePath("/dashboard")
    return { success: true }
  }
)

export const updateCriteria = projectAction(
  async ({ activeProject }, criteriaId: number, input: CriteriaEdit) => {
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
)

export const deleteCriteria = projectAction(
  async ({ activeProject }, criteriaId: number) => {
    await db
      .deleteFrom("criteria")
      .where("id", "=", criteriaId)
      .where("project_id", "=", activeProject.id)
      .execute()

    revalidatePath("/dashboard")
    revalidatePath("/criteria")
    return { success: true }
  }
)
