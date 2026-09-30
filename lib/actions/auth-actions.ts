"use server"

import { db } from "@/lib/db/db"
import {
  registerSchema,
  loginSchema,
  type RegisterInput,
  type LoginInput,
} from "@/lib/validations/auth"
import bcrypt from "bcrypt"
import crypto from "node:crypto"
import { cookies, headers } from "next/headers"
import { redirect } from "next/navigation"

export type ActionResponse<T extends string = string> = {
  success: boolean
  error?: string
  field?: T | "root"
}

export async function registerUser(
  values: RegisterInput
): Promise<ActionResponse<keyof RegisterInput>> {
  const validation = registerSchema.safeParse(values)
  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message || "Invalid input",
    }
  }

  const { name, email, password } = validation.data
  const normalizedEmail = email.toLowerCase().trim()

  const existingUser = await db
    .selectFrom("users")
    .select("id")
    .where("email", "=", normalizedEmail)
    .executeTakeFirst()

  if (existingUser) {
    return {
      success: false,
      field: "email",
      error: "Email is already in use",
    }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await db
    .insertInto("users")
    .values({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
    })
    .execute()

  redirect("/login")
}

export async function loginUser(
  values: LoginInput
): Promise<ActionResponse<keyof LoginInput>> {
  const validation = loginSchema.safeParse(values)
  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message || "Invalid input",
    }
  }

  const { email, password } = validation.data
  const normalizedEmail = email.toLowerCase().trim()

  const user = await db
    .selectFrom("users")
    .selectAll()
    .where("email", "=", normalizedEmail)
    .executeTakeFirst()

  if (!user) {
    return {
      success: false,
      field: "root",
      error: "Invalid email or password",
    }
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    return {
      success: false,
      field: "root",
      error: "Invalid email or password",
    }
  }

  const token = crypto.randomUUID()
  const expiredAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

  const headerList = await headers()
  const userAgent = headerList.get("user-agent")
  const ipAddress =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null

  await db
    .insertInto("sessions")
    .values({
      user_id: user.id,
      token,
      expired_at: expiredAt,
      user_agent: userAgent,
      ip_address: ipAddress,
    })
    .execute()

  const cookieStore = await cookies()
  cookieStore.set("session_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiredAt,
    path: "/",
  })

  redirect("/project")
}
