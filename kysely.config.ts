import { config } from "dotenv"
import { defineConfig } from "kysely-ctl"
import { db } from "./lib/db"

config({ path: ".env" })

export default defineConfig({
  kysely: db,
  migrations: {
    migrationFolder: "./migrations",
  },
})
