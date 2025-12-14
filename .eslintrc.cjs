/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended", // must be last
  ],
  rules: {
    "prettier/prettier": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
  },
};
