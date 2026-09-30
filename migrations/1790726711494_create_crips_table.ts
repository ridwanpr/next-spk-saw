import { sql, type Kysely } from "kysely"

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("crips")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("criteria_id", "integer", (col) =>
      col.references("criteria.id").onDelete("cascade").notNull()
    )
    .addColumn("label", "varchar", (col) => col.notNull())
    .addColumn("value", "integer", (col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn("updated_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute()
}

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("crips").execute()
}
