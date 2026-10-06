import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { db } from "@/lib/db/db"

export async function getProjects(userId: number) {
  return await db
    .selectFrom("projects")
    .selectAll()
    .where("user_id", "=", userId)
    .orderBy("created_at", "desc")
    .execute()
}

export async function getProjectById(projectId: number, userId: number) {
  return await db
    .selectFrom("projects")
    .selectAll()
    .where("id", "=", projectId)
    .where("user_id", "=", userId)
    .executeTakeFirst()
}

export async function getActiveProject(userId: number) {
  const cookieStore = await cookies()
  const activeId = cookieStore.get("active_project_id")?.value

  if (!activeId) return undefined

  return await getProjectById(Number(activeId), userId)
}

export async function requireActiveProject(userId: number) {
  const project = await getActiveProject(userId)

  if (!project) {
    const message = encodeURIComponent(
      "Belum ada proyek aktif. Silakan buat atau pilih proyek terlebih dahulu untuk melanjutkan."
    )
    redirect(`/project?error=${message}`)
  }

  return project
}

export const verifyProjectOwner = async (userId: number, projectId: number) => {
  const project = await getProjectById(projectId, userId)

  if (!project) {
    const message = encodeURIComponent(
      "You are not allowed to see this resources"
    )
    redirect(`/project?error=${message}`)
  }

  return project
}

export type Project = Awaited<ReturnType<typeof getProjects>>[number]
