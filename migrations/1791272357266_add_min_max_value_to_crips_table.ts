import type { Kysely } from "kysely"

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable("crips")
    .addColumn("min_value", "numeric", (col) => col.notNull().defaultTo(0))
    .addColumn("max_value", "numeric", (col) => col.notNull().defaultTo(0))
    .execute()
}

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function down(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable("crips")
    .dropColumn("min_value")
    .dropColumn("max_value")
    .execute()
}
