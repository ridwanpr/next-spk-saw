"use client"

import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema, type RegisterInput } from "@/lib/validations/auth"
import { registerUser } from "@/lib/actions/auth-actions"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link"

const Register = () => {
  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = (data: RegisterInput) => {
    startTransition(async () => {
      const response = await registerUser(data)

      if (response && !response.success && response.error) {
        setError(response.field ?? "root", {
          type: "server",
          message: response.error,
        })
      }
    })
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Register for new account</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <FieldGroup>
              {errors.root && (
                <p className="text-sm font-medium text-destructive">
                  {errors.root.message}
                </p>
              )}

              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  id="name"
                  placeholder="John Doe"
                  {...register("name")}
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <p className="text-sm font-medium text-destructive">
                    {errors.name.message}
                  </p>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="me@example.com"
                  {...register("email")}
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p className="text-sm font-medium text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="******"
                  {...register("password")}
                  aria-invalid={!!errors.password}
                />
                {errors.password ? (
                  <p className="text-sm font-medium text-destructive">
                    {errors.password.message}
                  </p>
                ) : (
                  <FieldDescription>
                    Must be at least 8 characters long.
                  </FieldDescription>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="confirmPassword">
                  Confirm Password
                </FieldLabel>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="******"
                  {...register("confirmPassword")}
                  aria-invalid={!!errors.confirmPassword}
                />
                {errors.confirmPassword ? (
                  <p className="text-sm font-medium text-destructive">
                    {errors.confirmPassword.message}
                  </p>
                ) : (
                  <FieldDescription>
                    Please confirm your password.
                  </FieldDescription>
                )}
              </Field>
            </FieldGroup>
          </CardContent>
          <CardFooter className="mt-4 flex-col gap-2">
            <Button
              type="submit"
              className="w-full"
              variant="default"
              disabled={isPending}
            >
              {isPending ? "Creating account..." : "Register"}
            </Button>
            <FieldDescription className="text-center">
              Already have an account? <Link href="/login">Sign In</Link>
            </FieldDescription>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default Register
