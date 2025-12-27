import angular from "angular-eslint";
import ts from "typescript-eslint";
import importPlugin from "eslint-plugin-import";

export default ts.config(
  {
    ignores: [
      "projects/**/*",
      "src/vendor/**/*",
      "src/**/*mock.ts",
      "dist/",
      "node_modules/"
    ],
  },
  {
    files: ["**/*.ts"],
    extends: [
      ...angular.configs.tsRecommended,
      ...ts.configs.recommended,
    ],
    plugins: {
      import: importPlugin,
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "import/order": [
        "error",
        {
          "groups": ["builtin", "external", "internal", ["parent", "sibling"]],
          "pathGroups": [
            {
              "pattern": "@angular/**",
              "group": "external",
              "position": "before"
            },
            {
              "pattern": "@shared/**",
              "group": "internal",
              "position": "before"
            }
          ],
          "pathGroupsExcludedImportTypes": ["angular"],
          "newlines-between": "always",
          "alphabetize": {
            "order": "asc",
            "caseInsensitive": true
          }
        }
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          "prefix": "agt",
          "style": "kebab-case",
          "type": "element"
        }
      ],
      "@angular-eslint/directive-selector": [
        "error",
        {
          "prefix": "agt",
          "style": "camelCase",
          "type": "attribute"
        }
      ],
      "@typescript-eslint/no-unused-vars": "warn",
      "quotes": ["error", "single", { "allowTemplateLiterals": true }],
      // ... Copy the rest of your rules from .eslintrc.json here ...
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {
      "@angular-eslint/template/eqeqeq": "off"
    },
  }
);
