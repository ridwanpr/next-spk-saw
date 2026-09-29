import ThemeToggle from "@/components/theme-toggle"

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md p-4">{children}</div>
    </div>
  )
}

export default AuthLayout
