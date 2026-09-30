"use server"

import { db } from "@/lib/db/db"
import { registerSchema, type RegisterInput } from "@/lib/validations/auth"
import bcrypt from "bcrypt"
import { redirect } from "next/navigation"

export type ActionResponse = {
  success: boolean
  error?: string
  field?: keyof RegisterInput | "root"
}

export async function registerUser(
  values: RegisterInput
): Promise<ActionResponse> {
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
