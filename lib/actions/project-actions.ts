"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { db } from "@/lib/db/db"
import { projectSchema, type ProjectInput } from "@/lib/validations/project"
import { authAction } from "./action-client"

export async function setActiveProject(projectId: number, redirectTo?: string) {
  const cookieStore = await cookies()
  cookieStore.set("active_project_id", String(projectId), {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  })

  if (redirectTo) {
    redirect(redirectTo)
  }
}

export const updateProject = authAction(
  async ({ session }, projectId: number, values: ProjectInput) => {
    const validation = projectSchema.safeParse(values)
    if (!validation.success) {
      return {
        success: false,
        error: validation.error.issues[0]?.message || "Input tidak valid",
      }
    }

    const { name, description } = validation.data
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")

    await db
      .updateTable("projects")
      .set({
        name,
        description,
        slug,
        updated_at: new Date(),
      })
      .where("id", "=", projectId)
      .where("user_id", "=", session.userId)
      .execute()

    revalidatePath("/project")
    revalidatePath("/dashboard")
    return { success: true }
  }
)

export const deleteProject = authAction(
  async ({ session }, projectId: number) => {
    await db
      .deleteFrom("projects")
      .where("id", "=", projectId)
      .where("user_id", "=", session.userId)
      .execute()

    const cookieStore = await cookies()
    const activeProjectId = cookieStore.get("active_project_id")?.value

    if (activeProjectId === String(projectId)) {
      cookieStore.delete("active_project_id")
    }

    revalidatePath("/project")
    revalidatePath("/dashboard")
    return { success: true }
  }
)

export const createProject = authAction(
  async ({ session }, values: ProjectInput) => {
    const validation = projectSchema.safeParse(values)
    if (!validation.success) {
      return {
        success: false,
        error: validation.error.issues[0]?.message || "Input tidak valid",
      }
    }

    const { name, description } = validation.data
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")

    const newProject = await db
      .insertInto("projects")
      .values({
        name,
        description,
        slug,
        user_id: session.userId,
      })
      .returningAll()
      .executeTakeFirst()

    if (!newProject) {
      return {
        success: false,
        error: "Gagal membuat proyek baru",
      }
    }

    const cookieStore = await cookies()
    cookieStore.set("active_project_id", String(newProject.id), {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })

    revalidatePath("/project")
    revalidatePath("/dashboard")
    return { success: true }
  }
)
