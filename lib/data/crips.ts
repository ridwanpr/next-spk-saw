import { db } from "../db/db"

export const getCripsCriteria = async (criteriaId: number) => {
  return await db
    .selectFrom("crips")
    .selectAll()
    .where("criteria_id", "=", criteriaId)
    .execute()
}
