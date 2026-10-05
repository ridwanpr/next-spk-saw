import { db } from "../db/db"

export const getProjectCriteria = async (projectId: number) => {
  return await db
    .selectFrom("criteria")
    .selectAll()
    .where("project_id", "=", projectId)
    .orderBy("created_at", "desc")
    .execute()
}

export const getCriteriaById = async (
  criteriaId: number,
  projectId: number
) => {
  return await db
    .selectFrom("criteria")
    .selectAll()
    .where("id", "=", criteriaId)
    .where("project_id", "=", projectId)
    .executeTakeFirstOrThrow()
}
