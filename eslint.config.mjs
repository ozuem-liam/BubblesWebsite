import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Global rules
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-interface": "off", // ✅ added
      "@typescript-eslint/no-empty-object-type": "off", // ✅ THIS is the rule throwing the error
      "react/no-unescaped-entities": "off",
      "react/no-children-prop": "off",
    },
  },
];

export default eslintConfig;
