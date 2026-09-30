import { sql, type Kysely } from "kysely"

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("alternatives")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("project_id", "integer", (col) =>
      col.references("projects.id").onDelete("cascade").notNull()
    )
    .addColumn("name", "varchar", (col) => col.notNull())
    .addColumn("code", "varchar", (col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn("updated_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addUniqueConstraint("alternatives_project_id_code_unique", [
      "project_id",
      "code",
    ])
    .execute()
}

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("alternatives").execute()
}
