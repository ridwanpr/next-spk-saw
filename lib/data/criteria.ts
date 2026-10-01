import { db } from "../db/db"
import { requireActiveProject } from "./project"
import { requireAuth } from "./session"

export const getProjectCriteria = async () => {
  const session = await requireAuth()
  const activeProject = await requireActiveProject(session.userId)

  return await db
    .selectFrom("criteria")
    .selectAll()
    .where("project_id", "=", Number(activeProject.id))
    .orderBy("created_at", "desc")
    .execute()
}
