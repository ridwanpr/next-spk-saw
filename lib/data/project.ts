import { cookies } from "next/headers"
import { db } from "@/lib/db/db"

export async function getProjects(userId: number) {
  return await db
    .selectFrom("projects")
    .selectAll()
    .where("user_id", "=", userId)
    .orderBy("created_at", "desc")
    .execute()
}

export async function getActiveProject(userId: number) {
  const cookieStore = await cookies()
  const activeId = cookieStore.get("active_project_id")?.value

  if (activeId) {
    const project = await db
      .selectFrom("projects")
      .selectAll()
      .where("id", "=", Number(activeId))
      .where("user_id", "=", userId)
      .executeTakeFirst()

    if (project) return project
  }

  return await db
    .selectFrom("projects")
    .selectAll()
    .where("user_id", "=", userId)
    .orderBy("created_at", "desc")
    .executeTakeFirst()
}

export type Project = Awaited<ReturnType<typeof getProjects>>[number]
