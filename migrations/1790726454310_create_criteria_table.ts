import { sql, type Kysely } from "kysely"

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function up(db: Kysely<any>): Promise<void> {
  // create native PostgreSQL enum for attribute_type
  await db.schema
    .createType("criteria_attribute_type")
    .asEnum(["cost", "benefit"])
    .execute()

  await db.schema
    .createTable("criteria")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("project_id", "integer", (col) =>
      col.references("projects.id").onDelete("cascade").notNull()
    )
    .addColumn("name", "varchar", (col) => col.notNull())
    .addColumn("code", "varchar", (col) => col.notNull())
    .addColumn("attribute_type", sql`criteria_attribute_type`, (col) =>
      col.notNull()
    )
    .addColumn("weight", "numeric(5, 2)", (col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn("updated_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addUniqueConstraint("criteria_project_id_code_unique", [
      "project_id",
      "code",
    ])
    .execute()
}

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("criteria").execute()
  await db.schema.dropType("criteria_attribute_type").execute()
}
