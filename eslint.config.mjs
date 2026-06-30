import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import astro from "eslint-plugin-astro";
import eslintConfigPrettier from "eslint-config-prettier";
import globals from "globals";

export default [
	{
		ignores: ["node_modules", "dist", ".astro", ".github", ".changeset"],
	},
	js.configs.recommended,
	{
		files: ["**/*.{js,cjs,mjs}"],
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
	},
	{
		files: ["**/*.{ts,tsx}"],
		languageOptions: {
			parser: tsParser,
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
		plugins: {
			"@typescript-eslint": tsPlugin,
		},
		rules: {
			...tsPlugin.configs.recommended.rules,
			"@typescript-eslint/no-var-requires": "warn",
			"@typescript-eslint/no-require-imports": "warn",
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{ varsIgnorePattern: "Props", ignoreRestSiblings: true },
			],
		},
	},
	...astro.configs["flat/recommended"],
	eslintConfigPrettier,
];
