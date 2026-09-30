import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { db } from "@/lib/db/db"

export async function requireAuth() {
  const cookieStore = await cookies()
  const token = cookieStore.get("session_token")?.value

  if (!token) {
    redirect("/login")
  }

  const session = await db
    .selectFrom("sessions")
    .innerJoin("users", "users.id", "sessions.user_id")
    .select([
      "users.id as userId",
      "users.name as userName",
      "users.email as userEmail",
    ])
    .where("sessions.token", "=", token)
    .where("sessions.expired_at", ">", new Date())
    .executeTakeFirst()

  if (!session) {
    redirect("/login")
  }

  return session
}
