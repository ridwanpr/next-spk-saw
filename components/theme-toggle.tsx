"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark")
    } else {
      setTheme("light")
    }
  }

  return (
    <Button
      variant="outline"
      className="hover:cursor-pointer"
      onClick={toggleTheme}
    >
      {theme === "light" ? <Moon /> : <Sun />}
    </Button>
  )
}
