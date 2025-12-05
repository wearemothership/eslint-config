import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import pluginImport from "eslint-plugin-import";
import pluginJsxA11y from "eslint-plugin-jsx-a11y";
import pluginPromise from "eslint-plugin-promise";
import * as reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig(
	{ ignores: ["**/dist/", "**/public/"] },
	pluginJsxA11y.flatConfigs.recommended,
	pluginPromise.configs["flat/recommended"],
	{ // Applies the default typescript eslint styles and promise rules
		extends: [
			js.configs.recommended,
			tseslint.configs.recommended
		],
		files: ["**/*.{ts,tsx}"],
		languageOptions: {
			ecmaVersion: 2024,
			globals: globals.browser
		},
		rules: {
			"arrow-body-style": ["error", "as-needed"],
			"no-shadow": ["error", { ignoreOnInitialization: true }],
			"no-constructor-return": "error",
			"no-duplicate-imports": "error",
			"no-unassigned-vars": "warn",
			"no-use-before-define": ["error", { functions: false }], // Functions are hoisted
			"func-style": ["error", "declaration", { allowArrowFunctions: true }],
			"max-params": ["warn", { max: 4 }],
			"no-console": ["warn", { "allow": ["warn", "error", "debug"] }],
			"no-else-return": "warn",
			"no-eval": "error",
			"no-nested-ternary": "warn",
			"no-param-reassign": ["warn", { ignorePropertyModificationsFor: ["draft"] }],
			"no-unused-expressions": "warn",
			"promise/always-return": ["error", { ignoreLastCallback: true }],
			"promise/catch-or-return": ["error", { allowFinally: true }],
			"require-await": "warn",
			"@typescript-eslint/consistent-type-assertions": "warn"
		}
	},
	{ // Applies React-specific rules only to TSX files
		files: ["**/*.tsx"],
		languageOptions: {
			ecmaVersion: 2024,
			globals: globals.browser
		},
		plugins: {
			"@stylistic": stylistic,
			"react-hooks": reactHooks,
			"react-refresh": reactRefresh
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			"react-hooks/exhaustive-deps": "error",
			"react-refresh/only-export-components": [
				"warn",
				{ allowConstantExport: true }
			]
		}
	},
	{ // Adds our own stylistic rules.
		extends: [
			stylistic.configs.recommended
		],
		plugins: {
			"@stylistic": stylistic
		},
		rules: {
			"@stylistic/arrow-parens": ["error", "always"],
			"@stylistic/brace-style": [2, "stroustrup"],
			"@stylistic/comma-dangle": ["error", "never"],
			"@stylistic/implicit-arrow-linebreak": ["error", "beside"],
			"@stylistic/indent": ["error", "tab"],
			"@stylistic/indent-binary-ops": ["error", "tab"],
			"@stylistic/jsx-indent-props": ["error", "tab"],
			"@stylistic/linebreak-style": ["error", "unix"],
			"@stylistic/jsx-self-closing-comp": "error",
			"@stylistic/jsx-tag-spacing": ["error", {
				"afterOpening": "never",
				"beforeClosing": "never"
			}],
			"@stylistic/max-len": ["error", { code: 150 }],
			"@stylistic/member-delimiter-style": ["error", {
				"multiline": {
					"delimiter": "semi",
					"requireLast": true
				},
				"singleline": {
					"delimiter": "semi",
					"requireLast": false
				},
				"multilineDetection": "brackets"
			}],
			"@stylistic/multiline-ternary": ["error", "always-multiline"],
			"@stylistic/no-extra-semi": "error",
			"@stylistic/no-tabs": "off",
			"@stylistic/object-curly-newline": ["error", { minProperties: 4, consistent: true }],
			"@stylistic/object-curly-spacing": ["error", "always"],
			"@stylistic/operator-linebreak": ["error", "before"],
			"@stylistic/quotes": ["error", "double"],
			"@stylistic/quote-props": ["error", "as-needed"],
			"@stylistic/semi": ["error", "always"]
		}
	},
	pluginImport.flatConfigs.recommended,
	{ // Checks importing of different files
		rules: {
			"import/no-unresolved": "error"
		},
		settings: {
			"import/parsers": {
				"@typescript-eslint/parser": [".ts", ".tsx"]
			},
			"import/resolver": {
				typescript: {
					alwaysTryTypes: true,
					project: "./"
				}
			}
		}
	}
);
