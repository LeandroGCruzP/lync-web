import { defineConfig } from "eslint/config";
import tsParser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import perfectionist from "eslint-plugin-perfectionist";
import prettierPlugin from "eslint-plugin-prettier";
import prettier from "eslint-config-prettier/flat";

export default defineConfig([
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    ignores: ["node_modules/**", ".next/**"],

    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        React: "readonly",
      },
    },

    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
      perfectionist,
      prettier: prettierPlugin,
    },

    rules: {
      // React rules
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react/no-unknown-property": "error",

      // Perfectionist rules
      "perfectionist/sort-imports": [
        "error",
        {
          "type": "alphabetical",
          "groups": [
            ["builtin", "external"],
            ["internal"],
            ["parent", "sibling", "index"]
          ],
          "newlinesBetween": "never"
        }
      ],
      "perfectionist/sort-objects": ["error"],
      "perfectionist/sort-interfaces": ["error"],
      "perfectionist/sort-enums": ["error"],
      "perfectionist/sort-object-types": ["error"],

      // Prettier rules
      "prettier/prettier": [
        "error",
        {
          "printWidth": 80,
          "tabWidth": 2,
          "singleQuote": true,
          "trailingComma": "all",
          "arrowParens": "always",
          "semi": false,
          "endOfLine": "auto"
        }
      ],

      // JSX A11Y rules
      "jsx-a11y/alt-text": [
        "warn",
        {
          "elements": ["img"],
          "img": ["Image"]
        }
      ],
      "jsx-a11y/aria-props": "warn",
      "jsx-a11y/aria-proptypes": "warn",
      "jsx-a11y/aria-unsupported-elements": "warn",
      "jsx-a11y/role-has-required-aria-props": "warn",
      "jsx-a11y/role-supports-aria-props": "warn"
    },
  },
  prettier,
]);
