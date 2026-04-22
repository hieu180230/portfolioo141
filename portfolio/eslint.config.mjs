import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import { defineConfig } from "eslint/config";
import js from "@eslint/js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

const eslintConfig = defineConfig([
  {
    ignores: [".next/**"], // acts as global ignores, due to the absence of other properties
  },
  ...compat.extends(
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:react-hooks/recommended",
  ),
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
      "eqeqeq": "warn",
      "no-console": "warn",
      "prefer-const": "error",
      "object-shorthand": "error",
      "import/no-unresolved": "off",

      "react/jsx-boolean-value": "error",
      "react/jsx-curly-brace-presence": "error",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/no-unescaped-entities": "off",
      "react/jsx-no-target-blank": "error",
      "react/no-unknown-property": "off",

      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",

      "jsx-a11y/click-events-have-key-events": "error",
      "jsx-a11y/no-static-element-interactions": "error",
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/anchor-is-valid": "error",
    },
  },
]);

export default eslintConfig;
