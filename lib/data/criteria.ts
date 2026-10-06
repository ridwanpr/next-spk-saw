import { db } from "../db/db"
import { jsonArrayFrom } from "kysely/helpers/postgres"

export const getProjectCriteria = async (projectId: number) => {
  return await db
    .selectFrom("criteria")
    .selectAll("criteria")
    .select([
      (eb) =>
        jsonArrayFrom(
          eb
            .selectFrom("crips")
            .select(["crips.id", "crips.label", "crips.value"])
            .whereRef("criteria.id", "=", "crips.criteria_id")
        ).as("crips"),
    ])
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

export type ProjectCriteria = Awaited<
  ReturnType<typeof getProjectCriteria>
>[number]
