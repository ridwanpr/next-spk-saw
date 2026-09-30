import { sql, type Kysely } from "kysely"

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("alternative_value")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("criteria_id", "integer", (col) =>
      col.references("criteria.id").onDelete("cascade").notNull()
    )
    .addColumn("alternative_id", "integer", (col) =>
      col.references("alternatives.id").onDelete("cascade").notNull()
    )
    .addColumn("crips_id", "integer", (col) =>
      col.references("crips.id").onDelete("cascade").notNull()
    )
    .addColumn("numerical_value", "numeric(5, 2)", (col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn("updated_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addUniqueConstraint("alternative_value_alt_crit_unique", [
      "alternative_id",
      "criteria_id",
    ])
    .execute()
}

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("alternative_value").execute()
}
