import { sql, type Kysely } from "kysely"

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createType("criteria_eval_type")
    .asEnum(["range", "exact"])
    .execute()

  await db.schema
    .alterTable("criteria")
    .addColumn("eval_type", sql`criteria_eval_type`)
    .execute()
}

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.alterTable("criteria").dropColumn("eval_type").execute()
  await db.schema.dropType("criteria_eval_type").execute()
}
