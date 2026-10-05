import { db } from "../db/db"
import { requireActiveProject, verifyProjectOwner } from "./project"
import { requireAuth } from "./session"

export const getCripsCriteria = async (criteriaId: number) => {
  const session = await requireAuth()
  const activeProject = await requireActiveProject(session.userId)

  const criteria = await db
    .selectFrom("criteria")
    .selectAll()
    .where("id", "=", criteriaId)
    .where("project_id", "=", activeProject.id)
    .executeTakeFirstOrThrow()

  await verifyProjectOwner(session.userId, criteria?.project_id)

  return await db
    .selectFrom("crips")
    .selectAll()
    .where("criteria_id", "=", criteriaId)
    .execute()
}
