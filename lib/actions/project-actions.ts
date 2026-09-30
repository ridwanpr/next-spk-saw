"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function setActiveProject(projectId: number, redirectTo?: string) {
  const cookieStore = await cookies()
  cookieStore.set("active_project_id", String(projectId), {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  })

  if (redirectTo) {
    redirect(redirectTo)
  }
}
