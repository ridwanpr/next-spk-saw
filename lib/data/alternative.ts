import { db } from "../db/db"
import { sql } from "kysely"

export const getProjectAlternative = async (projectId: number) => {
  const data = await db
    .selectFrom("alternatives as a")
    .where("a.project_id", "=", projectId)
    .leftJoin("criteria as c", "c.project_id", "a.project_id")
    .leftJoin("alternative_value as av", (join) =>
      join
        .onRef("av.criteria_id", "=", "a.id")
        .onRef("av.criteria_id", "=", "c.id")
    )
    .groupBy(["a.id", "a.name", "a.code"])
    .select([
      "a.id",
      "a.name",
      "a.code",
      sql<number>`count(distinct c.id)`.as("total_criteria"),
      sql<number>`count(distinct av.criteria_id)`.as("filled_criteria"),
      sql<boolean>`count(distinct c.id) > 0 and count(distinct c.id) = count(distinct av.criteria_id)`.as(
        "is_complete"
      ),
    ])
    .execute()

  console.log(data)
  return data
}

export type ProjectAlternativeCriteria = Awaited<
  ReturnType<typeof getProjectAlternative>
>[number]
