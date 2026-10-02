import { defineConfig, globalIgnores } from "eslint/config"
import nextVitals from "eslint-config-next/core-web-vitals"
import nextTs from "eslint-config-next/typescript"

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
  {
    files: ["hooks/use-mobile.ts"],
    rules: {
      "react-hooks/set-state-in-effect": "off",
    },
  },
  {
    files: ["migrations/**"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
])

export default eslintConfig
