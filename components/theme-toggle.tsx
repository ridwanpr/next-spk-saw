"use client"

import { useTheme } from "next-themes"
import { Button } from "./ui/button"
import { Moon, Sun } from "lucide-react"

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()

  const handleToggleTheme = () => {
    theme === "light" ? setTheme("dark") : setTheme("light")
  }

  return (
    <Button variant="default" onClick={handleToggleTheme}>
      {theme === "light" ? <Moon /> : <Sun />}
    </Button>
  )
}

export default ThemeToggle
