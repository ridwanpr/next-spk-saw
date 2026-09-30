"use client"

import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, type LoginInput } from "@/lib/validations/auth"
import { loginUser } from "@/lib/actions/auth-actions"
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

const Login = () => {
  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = (data: LoginInput) => {
    startTransition(async () => {
      const response = await loginUser(data)

      if (response && !response.success && response.error) {
        setError((response.field as keyof LoginInput | "root") ?? "root", {
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
          <CardTitle>Login</CardTitle>
          <CardDescription>Login to your account</CardDescription>
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
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your email"
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
                  placeholder="********"
                  {...register("password")}
                  aria-invalid={!!errors.password}
                />
                {errors.password && (
                  <p className="text-sm font-medium text-destructive">
                    {errors.password.message}
                  </p>
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
              {isPending ? "Logging in..." : "Login"}
            </Button>
            <FieldDescription className="text-center">
              Don&apos;t have an account? <Link href="/register">Sign Up</Link>
            </FieldDescription>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default Login
