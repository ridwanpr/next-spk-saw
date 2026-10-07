"use server"

import { revalidatePath } from "next/cache"
import { getCriteriaById } from "../data/criteria"
import { db } from "../db/db"
import { CripsInput, cripsSchema } from "../validations/crips"
import { projectAction } from "./action-client"

export const createOrUpdateCrips = projectAction(
  async (
    { activeProject },
    input: CripsInput,
    criteriaId: number,
    cripsId: number | null = null
  ) => {
    const validation = cripsSchema.safeParse(input)
    if (!validation.success) {
      return {
        success: false,
        error: validation.error.issues[0]?.message || "Input tidak valid",
      }
    }

    // Ensures criteria exists and belongs to the current user's active project
    await getCriteriaById(criteriaId, activeProject.id)

    const { label, value, min_value, max_value } = input

    if (cripsId) {
      await db
        .updateTable("crips")
        .set({
          label,
          value: Number(value),
          min_value: Number(min_value) ?? null,
          max_value: Number(max_value) ?? null,
        })
        .where("id", "=", cripsId)
        .where("criteria_id", "=", criteriaId)
        .execute()
    } else {
      const newCrips = await db
        .insertInto("crips")
        .values({
          criteria_id: criteriaId,
          label,
          value: Number(value),
          min_value: Number(min_value) ?? null,
          max_value: Number(max_value) ?? null,
        })
        .returningAll()
        .executeTakeFirst()

      if (!newCrips) {
        return {
          success: false,
          error: "Gagal membuat skala nilai baru",
        }
      }
    }

    revalidatePath("/dashboard")
    revalidatePath("/crips")
    return { success: true }
  }
)

export const deleteCrips = projectAction(
  async ({ activeProject }, cripsId: number) => {
    const crips = await db
      .selectFrom("crips")
      .innerJoin("criteria", "criteria.id", "crips.criteria_id")
      .select(["crips.id as id", "criteria.project_id as projectId"])
      .where("crips.id", "=", cripsId)
      .where("criteria.project_id", "=", activeProject.id)
      .executeTakeFirst()

    if (!crips) {
      return {
        success: false,
        error: "Skala nilai tidak ditemukan",
      }
    }

    await db.deleteFrom("crips").where("id", "=", cripsId).execute()

    revalidatePath("/dashboard")
    revalidatePath("/crips")
    return { success: true }
  }
)
