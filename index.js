import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import pluginImport from "eslint-plugin-import";
import pluginJsxA11y from "eslint-plugin-jsx-a11y";
import pluginPromise from "eslint-plugin-promise";
import * as reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint, { configs } from "typescript-eslint";


export default tseslint.config(
	{ ignores: ["dist", "public"] },
	pluginJsxA11y.flatConfigs.recommended,
	pluginPromise.configs["flat/recommended"],
	{ // Applies the default typescript and react eslint styles
		extends: [
			js.configs.recommended,
			...configs.recommended
		],
		files: ["**/*.{ts,tsx}"],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser
		},
		plugins: {
			"react-hooks": reactHooks,
			"react-refresh": reactRefresh
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			"react-refresh/only-export-components": [
				"warn",
				{ allowConstantExport: true }
			],
			"promise/always-return": ["error", { ignoreLastCallback: true }],
			"promise/catch-or-return": ["error", { allowFinally: true }]
		}
	},
	{ // Adds our own stylistic rules.
		plugins: {
			"@stylistic": stylistic
		},
		rules: {
			"@stylistic/arrow-parens": "error",
			"@stylistic/arrow-spacing": ["error"],
			"@stylistic/brace-style": [2, "stroustrup"],
			"@stylistic/comma-dangle": ["error", "never"],
			"@stylistic/comma-spacing": ["error"],
			"@stylistic/implicit-arrow-linebreak": ["error", "beside"],
			"@stylistic/indent": ["error", "tab"],
			"@stylistic/jsx-indent": ["error", "tab"],
			"@stylistic/linebreak-style": ["error", "unix"],
			"@stylistic/max-len": ["error", { code: 150 }],
			"@stylistic/multiline-ternary": ["error", "always-multiline"],
			"@stylistic/new-parens": "error",
			"@stylistic/no-extra-semi": "error",
			"@stylistic/no-mixed-operators": "error",
			"@stylistic/no-mixed-spaces-and-tabs": "error",
			"@stylistic/no-multi-spaces": "error",
			"@stylistic/no-tabs": "off",
			"@stylistic/no-whitespace-before-property": "error",
			"@stylistic/object-curly-newline": ["error", { minProperties: 4, consistent: true }],
			"@stylistic/object-curly-spacing": ["error", "always"],
			"@stylistic/operator-linebreak": ["error", "before"],
			"@stylistic/quotes": ["error", "double"],
			"@stylistic/semi": ["error", "always"],
			"@stylistic/type-annotation-spacing": "error",
			"@stylistic/type-generic-spacing": "error",
			"@stylistic/type-named-tuple-spacing": "error"
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
