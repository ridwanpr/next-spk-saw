"use server"

import { revalidatePath } from "next/cache"
import { db } from "../db/db"
import {
  AlternativeCreate,
  createAlternativeSchema,
} from "../validations/alternative"
import { projectAction } from "./action-client"

export const createAlternative = projectAction(
  async ({ activeProject }, input: AlternativeCreate) => {
    const validation = createAlternativeSchema.safeParse(input)
    if (!validation.success) {
      return {
        success: false,
        error: validation.error.issues[0]?.message || "Input tidak valid",
      }
    }

    const { code, name } = input

    await db
      .insertInto("alternatives")
      .values({ code, name, project_id: activeProject.id })
      .execute()

    revalidatePath("/alternative")
    return { success: true }
  }
)
