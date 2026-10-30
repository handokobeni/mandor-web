import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              // One design system: UI and icons come through @/components/ui.
              group: [
                "@base-ui/*",
                "lucide-react",
                "@mui/*",
                "antd",
                "antd/*",
                "@ant-design/icons",
                "@chakra-ui/*",
                "@radix-ui/*",
              ],
              message: "Import UI through @/components/ui, not the vendor package.",
            },
            {
              // Features are islands: import a feature via its public index.
              group: ["@/features/*/*"],
              message: "Import a feature via its public index (@/features/x), not internals.",
            },
          ],
        },
      ],
    },
  },
  // The design system is the one place allowed to import the vendor UI lib.
  { files: ["src/components/ui/**"], rules: { "no-restricted-imports": "off" } },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "coverage/**",
    "playwright-report/**",
    "test-results/**",
    "next-env.d.ts",
  ]),
]);
